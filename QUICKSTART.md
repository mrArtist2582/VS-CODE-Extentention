# Quick Start Guide

Get your extension up and running in 5 minutes!

## ⚡ Fast Track

```bash
# 1. Install dependencies
npm install

# 2. Add your sound file to media/error-aavi.mp3

# 3. Compile
npm run compile

# 4. Test (Press F5 in VS Code)

# 5. Package
npm run package
```

## 📦 What You Get

After following the steps above, you'll have:
- ✅ A working VS Code extension
- ✅ A `.vsix` file ready for installation
- ✅ Terminal error monitoring with sound alerts

## 🎯 Next Steps

### Local Installation
```bash
# Install the VSIX in VS Code
# Extensions → ... → Install from VSIX → Select error-aavi-1.0.0.vsix
```

### Publish to Marketplace
See `MARKETPLACE.md` for complete publishing guide.

## 🔧 Commands

```bash
# Development
npm run compile          # Compile TypeScript
npm run watch           # Watch mode (auto-compile)
npm run lint            # Run ESLint

# Packaging
npm run package         # Create VSIX file
npm run publish         # Publish to marketplace
```

## 🎵 Sound File

**Required**: `media/error-aavi.mp3`

- Format: MP3
- Recommended: 1-3 seconds, < 500KB
- Get free sounds from: freesound.org, zapsplat.com

## 🧪 Testing

1. Press **F5** in VS Code (opens Extension Development Host)
2. In the new window:
   - Open terminal
   - Run: `node nonexistent.js` (triggers error)
   - Or use Command Palette → "Test Error Sound"

## 📝 Before Publishing

Update in `package.json`:
- `publisher`: Your publisher ID
- `repository`: Your GitHub URL

See `MARKETPLACE.md` for full publishing guide.

---

**Need help?** Check `SETUP.md` or `README.md` for detailed instructions.
