# Passive Vocabulary Builder

A Chrome extension that helps you build your vocabulary passively while browsing the web.

## Overview

This extension automatically highlights valuable vocabulary words on any webpage you visit. Simply hover over a highlighted word to see its definition - no setup, no login, no extra effort required.

## Features

- **Curated Vocabulary**: Highlights GRE-level and academic vocabulary words that are genuinely useful to learn
- **Instant Definitions**: Hover over any highlighted word to see its definition in a clean tooltip
- **Toggle On/Off**: Easily enable or disable highlighting via the extension icon
- **Passive Learning**: No setup required - just browse normally and learn naturally
- **Non-Intrusive**: Subtle styling that doesn't break page layouts or interfere with your reading

## Installation

### Install from Source (Developer Mode)

1. Clone or download this repository to your local machine
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" using the toggle in the top right corner
4. Click "Load unpacked" button
5. Select the `vocabulator` directory containing the extension files
6. The extension icon should now appear in your Chrome toolbar

## Usage

1. **Automatic Operation**: Once installed, the extension works automatically on any webpage you visit
2. **View Definitions**: Hover your mouse over any highlighted word to see its definition
3. **Toggle On/Off**: Click the extension icon in your toolbar to enable or disable highlighting
4. **Customization**: The extension highlights up to 15 uncommon words per page

## How It Works

1. The extension scans text on each webpage you visit
2. It uses a curated list of ~4,000 GRE and academic vocabulary words to identify valuable learning opportunities
3. Words are matched against this curated list (not just statistical frequency)
4. Proper nouns and capitalized words (likely names/places) are automatically skipped
5. Up to 15 vocabulary words are highlighted with subtle styling per page
6. When you hover over a highlighted word, the extension fetches its definition from the Free Dictionary API

## Technical Details

- **Manifest Version**: V3 (Chrome's current standard)
- **Vocabulary Sources**:
  - Magoosh GRE 1000 words (high-quality test prep vocabulary)
  - Academic Word List (AWL) - 570 word families from Victoria University
  - Total: ~4,073 curated vocabulary words
- **Dictionary API**: [Free Dictionary API](https://dictionaryapi.dev/) - no authentication required
- **Matching Strategy**: Positive matching (word IS in curated list) rather than frequency-based filtering
- **Max Highlights**: Limited to 15 words per page for optimal user experience

## File Structure

```
vocabulator/
├── manifest.json          # Extension configuration
├── content.js             # Main script for scanning and highlighting
├── styles.css             # Styling for highlights and tooltips
├── popup.html             # Extension popup UI
├── popup.js               # Toggle functionality
├── words.json             # Curated GRE + Academic vocabulary list (~4,073 words)
├── icon16.png             # Extension icon (16x16)
├── icon48.png             # Extension icon (48x48)
├── icon128.png            # Extension icon (128x128)
└── README.md              # This file
```

## Privacy

This extension:
- Does NOT collect or store any personal data
- Does NOT track your browsing history
- Does NOT send data to external servers (except dictionary API requests for definitions)
- Stores only one setting locally: whether the extension is enabled or disabled

## Success Criteria (MVP)

- ✅ Extension loads and highlights words on various site types (articles, Wikipedia, news)
- ✅ Tooltip displays correct definition on hover
- ✅ Toggle on/off works via extension icon
- ✅ Doesn't break page layout or slow down browsing

## Out of Scope (MVP)

The following features are intentionally not included in this MVP:
- Saving/bookmarking words
- User accounts or sync across devices
- Analytics or tracking
- Customization of frequency threshold in UI
- "I know this word" dismissal
- Dark mode support
- Multiple language support

## Future Enhancements

Potential features for future versions:
- Save interesting words to a personal vocabulary list
- Adjustable frequency threshold
- Dark mode support
- Spaced repetition quiz feature
- Multiple language support
- Custom word lists

## Troubleshooting

**Words aren't being highlighted:**
- Make sure the extension is enabled (click the extension icon and check the toggle)
- Try refreshing the page
- Check that the page has enough text content

**Definitions aren't showing:**
- Ensure you have an active internet connection
- The Dictionary API may not have definitions for very technical or specialized terms
- Try hovering for a moment longer to allow the API request to complete

**Extension is slowing down my browser:**
- The extension is designed to be lightweight, but very long pages may take a moment to process
- Consider disabling it on very large pages if performance is an issue

## Contributing

This is an MVP (Minimum Viable Product). Contributions, suggestions, and feedback are welcome!

## License

MIT License - feel free to use and modify as needed.

## Credits

- GRE vocabulary from [Magoosh GRE Flashcards](https://github.com/supersaiyanmode/GRE-Words-Magoosh) - 1,000 curated words
- Academic Word List (AWL) from [Victoria University via machine_readable_wordlists](https://github.com/lpmi-13/machine_readable_wordlists) - 570 word families
- Dictionary definitions from [Free Dictionary API](https://dictionaryapi.dev/)
