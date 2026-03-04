# Setup Guide - Terminal Error Sound Alert Extension

This guide will walk you through setting up, building, and publishing your VS Code extension.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional, for version control)
- **Visual Studio Code** (latest version)

## 🚀 Quick Start

### Step 1: Install Dependencies

Open a terminal in the project root and run:

```bash
npm install
```

This will install all required dependencies including:
- TypeScript
- VS Code Extension API types
- ESLint
- Other dev dependencies

### Step 2: Add Your Sound File

**IMPORTANT**: You must add your sound file before building!

1. Navigate to the `media/` folder
2. Add your MP3 file named exactly: `error-aavi.mp3`
3. Recommended: Keep file size under 500KB

### Step 3: Compile TypeScript

```bash
npm run compile
```

This compiles `src/extension.ts` to JavaScript in the `out/` folder.

### Step 4: Test the Extension

1. Open this project in VS Code
2. Press **F5** to launch Extension Development Host
3. A new VS Code window will open with your extension loaded
4. Test it:
   - Open a terminal in the new window
   - Type a command that produces an error (e.g., `node nonexistent.js`)
   - Or use Command Palette → "Test Error Sound"

## 🔧 Development Workflow

### Watch Mode

For active development, use watch mode to automatically recompile on changes:

```bash
npm run watch
```

Keep this running while you develop. Press F5 to test changes.

### Debugging

1. Set breakpoints in `src/extension.ts`
2. Press F5 to start debugging
3. Use Debug Console to inspect variables

## 📦 Building for Distribution

### Install VSCE (First Time Only)

```bash
npm install -g @vscode/vsce
```

### Create VSIX Package

```bash
npm run package
```

Or:

```bash
vsce package
```

This creates a `.vsix` file (e.g., `error-aavi-1.0.0.vsix`) in the project root.

## 🔌 Local Installation

### Install Your VSIX

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Click "..." menu → "Install from VSIX..."
4. Select your `.vsix` file
5. Reload VS Code

### Verify Installation

1. Open Command Palette (Ctrl+Shift+P / Cmd+Shift+P)
2. Type "Test Error Sound"
3. You should see the command and hear the sound

## 🌐 Publishing to VS Code Marketplace

### Step 1: Create Publisher Account

1. Go to [Visual Studio Marketplace Publisher Management](https://marketplace.visualstudio.com/manage)
2. Sign in with Microsoft/GitHub account
3. Click "Create Publisher"
4. Fill in details:
   - **Publisher ID**: Choose a unique ID (lowercase, no spaces)
   - **Display Name**: Your name or organization
   - **Email**: Contact email

### Step 2: Generate Personal Access Token (PAT)

1. Go to [Azure DevOps](https://dev.azure.com)
2. Sign in with the same account
3. Click User Settings (top right) → Personal Access Tokens
4. Click "New Token"
5. Configure:
   - **Name**: "VS Code Extension Publishing"
   - **Organization**: "All accessible organizations"
   - **Expiration**: Choose duration (90 days recommended)
   - **Scopes**: Click "Show all scopes" → Check **"Marketplace" → "Manage"**
6. Click "Create"
7. **COPY THE TOKEN IMMEDIATELY** (you won't see it again!)

### Step 3: Update package.json

Edit `package.json` and update:

```json
{
  "publisher": "your-actual-publisher-id",
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/error-aavi.git"
  },
  "bugs": {
    "url": "https://github.com/your-username/error-aavi/issues"
  }
}
```

### Step 4: Add Extension Icon (Recommended)

1. Create a 128x128 PNG icon
2. Save as `media/icon.png`
3. The icon is already referenced in `package.json`

### Step 5: Login to VSCE

```bash
vsce login your-publisher-id
```

Enter your Personal Access Token when prompted.

### Step 6: Publish

```bash
npm run publish
```

Or:

```bash
vsce publish
```

For version updates:

```bash
vsce publish patch  # 1.0.0 → 1.0.1
vsce publish minor  # 1.0.0 → 1.1.0
vsce publish major  # 1.0.0 → 2.0.0
```

### Step 7: Verify Publication

1. Go to [VS Code Marketplace](https://marketplace.visualstudio.com/)
2. Search for "Terminal Error Sound Alert"
3. Or visit: `https://marketplace.visualstudio.com/items?itemName=your-publisher-id.error-aavi`

## 🔄 Updating Your Extension

1. Make your code changes
2. Update version in `package.json`
3. Update `CHANGELOG.md` with changes
4. Compile: `npm run compile`
5. Test: Press F5
6. Publish: `vsce publish`

## 📝 Pre-Publication Checklist

Before publishing, ensure:

- [ ] Sound file `media/error-aavi.mp3` exists
- [ ] Extension icon `media/icon.png` exists (optional but recommended)
- [ ] `package.json` has correct publisher ID
- [ ] Repository URLs are updated
- [ ] `README.md` is complete and accurate
- [ ] `CHANGELOG.md` is updated
- [ ] Extension compiles without errors: `npm run compile`
- [ ] Extension works in test mode (F5)
- [ ] All files are committed to git (if using version control)

## 🐛 Troubleshooting

### "Cannot find module 'vscode'" Error

Run: `npm install`

### VSCE Command Not Found

Install globally: `npm install -g @vscode/vsce`

### Publishing Fails with Authentication Error

1. Verify your PAT has "Marketplace: Manage" scope
2. Re-login: `vsce login your-publisher-id`
3. Enter a fresh PAT

### Sound File Not Found

Ensure `media/error-aavi.mp3` exists and is a valid MP3 file.

### Extension Not Activating

1. Check VS Code version (must be 1.75.0+)
2. Check Output panel → "Extension Host" for errors
3. Reload VS Code window

## 📚 Additional Resources

- [VS Code Extension API](https://code.visualstudio.com/api)
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [Extension Manifest](https://code.visualstudio.com/api/references/extension-manifest)
- [VSCE Documentation](https://github.com/microsoft/vscode-vsce)

## 🎯 Next Steps

1. **Customize**: Modify error keywords in `src/extension.ts`
2. **Enhance**: Add configuration settings for users
3. **Test**: Try on different platforms (Windows, macOS, Linux)
4. **Share**: Publish to marketplace and share with the community!

---

**Happy Coding!** 🎉
