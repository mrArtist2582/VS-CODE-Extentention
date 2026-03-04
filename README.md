# Terminal Error Sound Alert

A Visual Studio Code extension that monitors terminal output and plays a custom sound alert when error keywords are detected.

## Features

- 🔊 **Automatic Sound Alerts**: Plays a custom MP3 sound when terminal output contains error keywords
- 🎯 **Smart Detection**: Monitors for keywords like "error", "failed", and "exception"
- 🌍 **Cross-Platform**: Works on Windows, macOS, and Linux
- ⚡ **Lightweight**: Minimal performance impact
- 🎵 **Customizable**: Use your own error-aavi.mp3 sound file
- 🧪 **Test Command**: Manually test the sound with a command

## Installation

### From VSIX (Local Installation)

1. Download the `.vsix` file
2. Open VS Code
3. Go to Extensions view (Ctrl+Shift+X / Cmd+Shift+X)
4. Click the "..." menu at the top of the Extensions view
5. Select "Install from VSIX..."
6. Choose the downloaded `.vsix` file

### From Marketplace

Search for "Terminal Error Sound Alert" in the VS Code Extensions marketplace and click Install.

## Usage

The extension activates automatically when VS Code starts. It will:

1. Monitor all terminal output in real-time
2. Detect error keywords (case-insensitive): `error`, `failed`, `exception`
3. Play the custom sound alert when keywords are detected

### Test the Sound

- Open Command Palette (Ctrl+Shift+P / Cmd+Shift+P)
- Type "Test Error Sound"
- Press Enter

## Requirements

- VS Code version 1.75.0 or higher
- Audio playback capability on your system

### Platform-Specific Requirements

- **Windows**: Uses built-in PowerShell (no additional requirements)
- **macOS**: Uses built-in `afplay` command (no additional requirements)
- **Linux**: Requires one of the following audio players:
  - `paplay` (PulseAudio - usually pre-installed)
  - `mpg123` (install via: `sudo apt-get install mpg123`)
  - `aplay` (ALSA - usually pre-installed)

## Customization

### Using Your Own Sound File

1. Replace `media/error-aavi.mp3` with your custom MP3 file
2. Keep the filename as `error-aavi.mp3`
3. Reload VS Code

### Modifying Error Keywords

Edit `src/extension.ts` and modify the `errorKeywords` array:

```typescript
const errorKeywords = ['error', 'failed', 'exception', 'your-custom-keyword'];
```

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- VS Code

### Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/error-aavi.git
cd error-aavi
```

2. Install dependencies:
```bash
npm install
```

3. Add your sound file:
   - Place `error-aavi.mp3` in the `media/` folder

4. Compile TypeScript:
```bash
npm run compile
```

### Running in Development

1. Open the project in VS Code
2. Press F5 to launch Extension Development Host
3. Test the extension in the new VS Code window

### Building

Compile the TypeScript code:
```bash
npm run compile
```

Watch mode for development:
```bash
npm run watch
```

## Packaging

### Install VSCE (VS Code Extension Manager)

```bash
npm install -g @vscode/vsce
```

### Create VSIX Package

```bash
npm run package
```

Or directly:
```bash
vsce package
```

This creates a `.vsix` file in the root directory (e.g., `error-aavi-1.0.0.vsix`).

## Publishing to VS Code Marketplace

### Prerequisites

1. **Create a Publisher Account**:
   - Go to [Visual Studio Marketplace Publisher Management](https://marketplace.visualstudio.com/manage)
   - Sign in with your Microsoft/GitHub account
   - Create a new publisher (choose a unique publisher ID)

2. **Generate Personal Access Token (PAT)**:
   - Go to [Azure DevOps](https://dev.azure.com)
   - Click on User Settings (top right) → Personal Access Tokens
   - Click "New Token"
   - Name: "VS Code Extension Publishing"
   - Organization: Select "All accessible organizations"
   - Scopes: Select "Marketplace" → "Manage"
   - Click "Create"
   - **Copy the token immediately** (you won't see it again)

### Update package.json

1. Replace `your-publisher-name` with your actual publisher ID:
```json
"publisher": "your-actual-publisher-id"
```

2. Update repository URLs with your actual GitHub repository

3. Add an icon (optional but recommended):
   - Create a 128x128 PNG image
   - Save it as `media/icon.png`

### Login to VSCE

```bash
vsce login your-publisher-id
```

Enter your Personal Access Token when prompted.

### Publish

```bash
npm run publish
```

Or directly:
```bash
vsce publish
```

For a specific version:
```bash
vsce publish 1.0.1
```

Or increment version automatically:
```bash
vsce publish patch  # 1.0.0 -> 1.0.1
vsce publish minor  # 1.0.0 -> 1.1.0
vsce publish major  # 1.0.0 -> 2.0.0
```

### Verify Publication

1. Go to [VS Code Marketplace](https://marketplace.visualstudio.com/)
2. Search for your extension
3. Or visit: `https://marketplace.visualstudio.com/items?itemName=your-publisher-id.error-aavi`

## Project Structure

```
error-aavi/
├── .vscode/
│   └── (VS Code settings - auto-generated)
├── media/
│   ├── error-aavi.mp3    # Your custom sound file
│   └── icon.png          # Extension icon (128x128)
├── src/
│   └── extension.ts      # Main extension code
├── out/
│   └── (compiled JavaScript - auto-generated)
├── .eslintrc.json        # ESLint configuration
├── .gitignore            # Git ignore rules
├── .vscodeignore         # Files to exclude from VSIX
├── package.json          # Extension manifest
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

## Troubleshooting

### Sound Not Playing

1. **Check sound file exists**: Ensure `media/error-aavi.mp3` is present
2. **Check file format**: Ensure it's a valid MP3 file
3. **Test manually**: Run the "Test Error Sound" command
4. **Check system audio**: Ensure your system volume is not muted

### Linux Audio Issues

Install audio players:
```bash
# Ubuntu/Debian
sudo apt-get install mpg123 pulseaudio-utils

# Fedora/RHEL
sudo dnf install mpg123 pulseaudio-utils

# Arch
sudo pacman -S mpg123 pulseaudio
```

### Extension Not Activating

1. Check VS Code version (must be 1.75.0+)
2. Reload VS Code window
3. Check Output panel → "Extension Host" for errors

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Support

- Report issues: [GitHub Issues](https://github.com/your-username/error-aavi/issues)
- Email: your-email@example.com

## Changelog

### 1.0.0 (Initial Release)

- Terminal output monitoring
- Error keyword detection (error, failed, exception)
- Cross-platform sound playback
- Test command for manual sound testing
- Support for Windows, macOS, and Linux

## Acknowledgments

- Built with VS Code Extension API
- Uses native audio playback for cross-platform compatibility

---

**Enjoy error-free coding with audio alerts!** 🎵
