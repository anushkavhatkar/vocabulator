// Passive Vocabulary Builder - Content Script

let commonWords = new Set();
let isEnabled = true;
let highlightedWords = [];
const MAX_HIGHLIGHTS = 15;
let tooltip = null;

// Load common words list (top 30k most common)
async function loadCommonWords() {
  try {
    const response = await fetch(chrome.runtime.getURL('words.json'));
    const data = await response.json();
    commonWords = new Set(data.commonWords.map(w => w.toLowerCase()));
    console.log('Loaded', commonWords.size, 'common words for filtering');
  } catch (error) {
    console.error('Failed to load word list:', error);
  }
}

// Check if extension is enabled
async function checkEnabled() {
  const result = await chrome.storage.local.get(['enabled']);
  isEnabled = result.enabled !== false; // Default to true
  return isEnabled;
}

// Helper to check if a word is rare (NOT in common words list)
function isRareWord(word) {
  const clean = word.toLowerCase().replace(/[^a-z]/g, '');

  // Skip short words (less than 4 letters)
  if (clean.length < 4) return false;

  // Word is rare if it's NOT in the top 30k common words
  return !commonWords.has(clean);
}

// Helper to check if word is likely a proper noun
function isProperNoun(word, context) {
  // If word is capitalized and not at start of sentence
  if (word[0] === word[0].toUpperCase() && word[0] !== word[0].toLowerCase()) {
    // Check if it's at the start of a sentence
    const prevChar = context.slice(0, context.indexOf(word)).trim().slice(-1);
    if (prevChar === '.' || prevChar === '!' || prevChar === '?' || prevChar === '') {
      return false; // It's at start of sentence, might not be proper noun
    }
    return true; // Capitalized mid-sentence, likely proper noun
  }
  return false;
}

// Get text nodes from the page
function getTextNodes(element) {
  const textNodes = [];
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function(node) {
        // Skip script, style, and already highlighted elements
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;

        const tagName = parent.tagName.toLowerCase();
        if (['script', 'style', 'noscript', 'iframe', 'textarea'].includes(tagName)) {
          return NodeFilter.FILTER_REJECT;
        }

        if (parent.classList.contains('vocab-highlight') ||
            parent.closest('.vocab-tooltip')) {
          return NodeFilter.FILTER_REJECT;
        }

        // Only process if text has actual content
        if (node.textContent.trim().length > 0) {
          return NodeFilter.FILTER_ACCEPT;
        }

        return NodeFilter.FILTER_REJECT;
      }
    }
  );

  let node;
  while (node = walker.nextNode()) {
    textNodes.push(node);
  }

  return textNodes;
}

// Highlight uncommon words in text nodes
function highlightWords() {
  if (!isEnabled || highlightedWords.length >= MAX_HIGHLIGHTS) return;

  const textNodes = getTextNodes(document.body);
  const wordPattern = /\b[a-zA-Z]{4,}\b/g;

  for (const textNode of textNodes) {
    if (highlightedWords.length >= MAX_HIGHLIGHTS) break;

    const text = textNode.textContent;
    const matches = text.matchAll(wordPattern);

    for (const match of matches) {
      if (highlightedWords.length >= MAX_HIGHLIGHTS) break;

      const word = match[0];
      const wordLower = word.toLowerCase();

      // Skip if already highlighted
      if (highlightedWords.includes(wordLower)) continue;

      // Skip proper nouns
      if (isProperNoun(word, text)) continue;

      // Check if word is rare (not in top 30k common words)
      if (isRareWord(word)) {
        // Create highlight
        const span = document.createElement('span');
        span.className = 'vocab-highlight';
        span.textContent = word;
        span.dataset.word = wordLower;

        // Add hover listeners
        span.addEventListener('mouseenter', handleWordHover);
        span.addEventListener('mouseleave', handleWordLeave);

        // Replace text with highlighted span
        const beforeText = text.substring(0, match.index);
        const afterText = text.substring(match.index + word.length);

        const parent = textNode.parentNode;
        const beforeNode = document.createTextNode(beforeText);
        const afterNode = document.createTextNode(afterText);

        parent.insertBefore(beforeNode, textNode);
        parent.insertBefore(span, textNode);
        parent.insertBefore(afterNode, textNode);
        parent.removeChild(textNode);

        highlightedWords.push(wordLower);

        // Update textNode reference for next iteration
        if (afterText.length > 0) {
          highlightWordsInNode(afterNode);
        }

        break; // Process next text node
      }
    }
  }

  console.log('Highlighted', highlightedWords.length, 'rare words');
}

// Highlight words in a specific text node
function highlightWordsInNode(textNode) {
  if (highlightedWords.length >= MAX_HIGHLIGHTS) return;

  const text = textNode.textContent;
  const wordPattern = /\b[a-zA-Z]{4,}\b/g;
  const match = wordPattern.exec(text);

  if (match) {
    const word = match[0];
    const wordLower = word.toLowerCase();

    if (!highlightedWords.includes(wordLower) &&
        !isProperNoun(word, text) &&
        isRareWord(word)) {

      const span = document.createElement('span');
      span.className = 'vocab-highlight';
      span.textContent = word;
      span.dataset.word = wordLower;

      span.addEventListener('mouseenter', handleWordHover);
      span.addEventListener('mouseleave', handleWordLeave);

      const beforeText = text.substring(0, match.index);
      const afterText = text.substring(match.index + word.length);

      const parent = textNode.parentNode;
      const beforeNode = document.createTextNode(beforeText);
      const afterNode = document.createTextNode(afterText);

      parent.insertBefore(beforeNode, textNode);
      parent.insertBefore(span, textNode);
      parent.insertBefore(afterNode, textNode);
      parent.removeChild(textNode);

      highlightedWords.push(wordLower);

      if (afterText.length > 0 && highlightedWords.length < MAX_HIGHLIGHTS) {
        highlightWordsInNode(afterNode);
      }
    }
  }
}

// Handle word hover - show definition
async function handleWordHover(event) {
  const word = event.target.dataset.word;
  showTooltip(event.target, 'Loading...');

  try {
    const definition = await fetchDefinition(word);
    if (definition) {
      showTooltip(event.target, definition);
    } else {
      hideTooltip();
    }
  } catch (error) {
    console.error('Error fetching definition:', error);
    hideTooltip();
  }
}

// Handle word leave - hide tooltip
function handleWordLeave(event) {
  hideTooltip();
}

// Fetch definition from Dictionary API
async function fetchDefinition(word) {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

    if (!response.ok) {
      return null; // Word not found in dictionary
    }

    const data = await response.json();

    if (data && data.length > 0 && data[0].meanings && data[0].meanings.length > 0) {
      const meaning = data[0].meanings[0];
      const partOfSpeech = meaning.partOfSpeech || '';
      const definition = meaning.definitions && meaning.definitions[0]
        ? meaning.definitions[0].definition
        : '';

      if (definition) {
        return `<strong>${word}</strong> <em>(${partOfSpeech})</em><br>${definition}`;
      }
    }

    return null;
  } catch (error) {
    console.error('Dictionary API error:', error);
    return null;
  }
}

// Show tooltip with definition
function showTooltip(element, content) {
  hideTooltip(); // Remove any existing tooltip

  tooltip = document.createElement('div');
  tooltip.className = 'vocab-tooltip';
  tooltip.innerHTML = content;
  document.body.appendChild(tooltip);

  // Position tooltip
  const rect = element.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();

  let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
  let top = rect.bottom + 8;

  // Keep tooltip on screen
  if (left < 10) left = 10;
  if (left + tooltipRect.width > window.innerWidth - 10) {
    left = window.innerWidth - tooltipRect.width - 10;
  }

  // Show above if not enough space below
  if (top + tooltipRect.height > window.innerHeight - 10) {
    top = rect.top - tooltipRect.height - 8;
  }

  tooltip.style.left = left + window.scrollX + 'px';
  tooltip.style.top = top + window.scrollY + 'px';
}

// Hide tooltip
function hideTooltip() {
  if (tooltip) {
    tooltip.remove();
    tooltip = null;
  }
}

// Remove all highlights
function removeHighlights() {
  const highlights = document.querySelectorAll('.vocab-highlight');
  highlights.forEach(span => {
    const parent = span.parentNode;
    const text = document.createTextNode(span.textContent);
    parent.replaceChild(text, span);
    parent.normalize();
  });
  highlightedWords = [];
  hideTooltip();
}

// Initialize extension
async function init() {
  await loadCommonWords();
  const enabled = await checkEnabled();

  if (enabled) {
    highlightWords();
  }
}

// Listen for enable/disable messages
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.enabled) {
    isEnabled = changes.enabled.newValue;

    if (isEnabled) {
      highlightWords();
    } else {
      removeHighlights();
    }
  }
});

// Start when page is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
