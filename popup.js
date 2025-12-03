// Passive Vocabulary Builder - Popup Script

const toggle = document.getElementById('enableToggle');
const status = document.getElementById('status');

// Load current state
chrome.storage.local.get(['enabled'], (result) => {
  const enabled = result.enabled !== false; // Default to true
  toggle.checked = enabled;
  updateStatus(enabled);
});

// Handle toggle change
toggle.addEventListener('change', (event) => {
  const enabled = event.target.checked;

  // Save state
  chrome.storage.local.set({ enabled }, () => {
    updateStatus(enabled);

    // Reload current tab to apply changes
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.reload(tabs[0].id);
      }
    });
  });
});

// Update status message
function updateStatus(enabled) {
  if (enabled) {
    status.textContent = 'Extension is active';
    status.classList.add('active');
  } else {
    status.textContent = 'Extension is disabled';
    status.classList.remove('active');
  }
}
