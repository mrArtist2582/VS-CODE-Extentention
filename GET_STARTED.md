# 🚀 Get Started - Terminal Error Sound Alert

Welcome! This guide will help you get your VS Code extension running in minutes.

## ✅ What You Have

A complete VS Code extension that:
- ✨ Monitors terminal output in real-time
- 🔍 Detects error keywords (error, failed, exception)
- 🔊 Plays custom sound alerts
- 🌍 Works on Windows, macOS, and Linux
- 📦 Ready to package and publish

## 🎯 Quick Setup (5 Minutes)

### 1️⃣ Install Dependencies

Open terminal in this folder and run:

```bash
npm install
```

This installs TypeScript, VS Code API types, and other dependencies.

### 2️⃣ Add Your Sound File

**CRITICAL**: Add your MP3 sound file:

1. Go to `media/` folder
2. Add file named: `error-aavi.mp3`
3. Recommended: 1-3 seconds, < 500KB

**Where to get sounds:**
- freesound.org (free sound effects)
- zapsplat.com (free downloads)
- Record your own voice
- Convert system sounds to MP3

### 3️⃣ Compile the Extension

```bash
npm run compile
```

This converts TypeScript to JavaScript in the `out/` folder.

### 4️⃣ Test It!

**Method 1: Press F5**
1. Open this project in VS Code
2. Press **F5** (starts Extension Development Host)
3. New VS Code window opens with extension loaded
4. Open terminal and trigger an error
5. Listen for the sound!

**Method 2: Manual Test**
1. In the Extension Development Host window
2. Press Ctrl+Shift+P (Cmd+Shift+P on Mac)
3. Type "Test Error Sound"
4. Press Enter

## 📦 Package for Distribution

### Install VSCE (One Time)

```bash
npm install -g @vscode/vsce
```

### Create VSIX File

```bash
npm run package
```

This creates: `error-aavi-1.0.0.vsix`

### Install Locally

1. Open VS Code
2. Extensions view (Ctrl+Shift+X)
3. Click "..." → "Install from VSIX..."
4. Select the `.vsix` file
5. Reload VS Code

## 🌐 Publish to Marketplace

### Before Publishing

1. **Update `package.json`:**
   - Change `publisher` to your publisher ID
   - Update `repository` URLs

2. **Create Publisher Account:**
   - Visit [marketplace.visualstudio.com/manage](https://marketplace.visualstudio.com/manage)
   - Sign in and create publisher

3. **Generate Access Token:**
   - Go to [dev.azure.com](https://dev.azure.com)
   - User Settings → Personal Access Tokens
   - Create token with "Marketplace: Manage" scope

4. **Login:**
   ```bash
   vsce login your-publisher-id
   ```

5. **Publish:**
   ```bash
   npm run publish
   ```

**Full Publishing Guide:** See `MARKETPLACE.md`

## 📚 Documentation

- **`QUICKSTART.md`** - Fast track guide
- **`SETUP.md`** - Detailed setup instructions
- **`MARKETPLACE.md`** - Complete publishing guide
- **`PROJECT_STRUCTURE.md`** - File organization
- **`README.md`** - Full documentation

## 🎨 Customization

### Change Error Keywords

Edit `src/extension.ts` line 58:

```typescript
const errorKeywords = ['error', 'failed', 'exception', 'your-keyword'];
```

### Add Extension Icon

1. Create 128x128 PNG image
2. Save as `media/icon.png`
3. Already configured in `package.json`

### Modify Sound Behavior

Edit functions in `src/extension.ts`:
- `handleTerminalOutput()` - Detection logic
- `playErrorSound()` - Playback behavior

## 🔧 Development Commands

```bash
npm run compile      # Compile TypeScript
npm run watch        # Auto-compile on changes
npm run lint         # Check code quality
npm run package      # Create VSIX
npm run publish      # Publish to marketplace
```

## 🐛 Troubleshooting

### "Cannot find module 'vscode'"
**Fix:** Run `npm install`

### "Sound file not found"
**Fix:** Add `media/error-aavi.mp3`

### "VSCE command not found"
**Fix:** Run `npm install -g @vscode/vsce`

### Extension not activating
**Fix:** 
- Check VS Code version (need 1.75.0+)
- Reload VS Code window
- Check Output panel → "Extension Host"

## ✨ Features

- **Auto-activation** on VS Code startup
- **Real-time monitoring** of all terminals
- **Case-insensitive** keyword matching
- **Cross-platform** audio playback
- **No external dependencies** for audio
- **Test command** for manual testing
- **Production-ready** code with comments

## 📋 Checklist Before Publishing

- [ ] Dependencies installed (`npm install`)
- [ ] Sound file added (`media/error-aavi.mp3`)
- [ ] Extension compiles (`npm run compile`)
- [ ] Extension tested (Press F5)
- [ ] Publisher ID updated in `package.json`
- [ ] Repository URLs updated
- [ ] Icon added (optional: `media/icon.png`)
- [ ] README reviewed
- [ ] CHANGELOG updated

## 🎉 Next Steps

1. ✅ Complete the setup above
2. 🧪 Test thoroughly on your system
3. 📦 Package as VSIX
4. 🌐 Publish to marketplace
5. 📢 Share with the community!

## 💡 Tips

- **Keep sound short** (1-3 seconds) for best UX
- **Test on different platforms** if possible
- **Add screenshots** to README before publishing
- **Respond to user feedback** after publishing
- **Update regularly** with improvements

## 🆘 Need Help?

- Check other `.md` files in this folder
- Review `src/extension.ts` comments
- VS Code API docs: [code.visualstudio.com/api](https://code.visualstudio.com/api)
- VSCE docs: [github.com/microsoft/vscode-vsce](https://github.com/microsoft/vscode-vsce)

---

**Ready to build?** Start with Step 1 above! 🚀
