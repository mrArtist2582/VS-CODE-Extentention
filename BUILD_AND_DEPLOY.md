# 🏗️ Build and Deploy Guide

Complete commands and steps to build, test, package, and deploy your extension.

## 📦 Build Process

### Step 1: Install Dependencies

```bash
npm install
```

**What this does:**
- Installs TypeScript compiler
- Installs VS Code API type definitions
- Installs ESLint and other dev tools
- Creates `node_modules/` folder
- Creates `package-lock.json`

**Expected output:**
```
added 150 packages in 30s
```

### Step 2: Add Sound File

**REQUIRED**: Before building, add your sound file:

```
media/error-aavi.mp3
```

**Verify:**
```bash
# Windows PowerShell
Test-Path media/error-aavi.mp3

# Should return: True
```

### Step 3: Compile TypeScript

```bash
npm run compile
```

**What this does:**
- Compiles `src/extension.ts` → `out/extension.js`
- Generates source maps for debugging
- Checks for TypeScript errors

**Expected output:**
```
> error-aavi@1.0.0 compile
> tsc -p ./
```

**Verify:**
```bash
# Check compiled file exists
Test-Path out/extension.js
```

## 🧪 Testing

### Method 1: Debug Mode (Recommended)

1. Open this project in VS Code
2. Press **F5** (or Run → Start Debugging)
3. Extension Development Host window opens
4. Test the extension:

**Test A: Automatic Detection**
```bash
# In Extension Development Host terminal
node nonexistent.js
# Should play sound when error appears
```

**Test B: Manual Test Command**
1. Press Ctrl+Shift+P (Cmd+Shift+P on Mac)
2. Type: "Test Error Sound"
3. Press Enter
4. Sound should play

### Method 2: Watch Mode

For active development:

```bash
npm run watch
```

Keep this running. Changes auto-compile. Press F5 to test.

### Method 3: Install VSIX Locally

```bash
# Package
npm run package

# Install in VS Code
# Extensions → ... → Install from VSIX → Select error-aavi-1.0.0.vsix
```

## 📦 Packaging

### Install VSCE (One Time)

```bash
npm install -g @vscode/vsce
```

**Verify installation:**
```bash
vsce --version
```

### Create VSIX Package

```bash
npm run package
```

**Or directly:**
```bash
vsce package
```

**Output:**
```
Executing prepublish script 'npm run vscode:prepublish'...
DONE  Packaged: error-aavi-1.0.0.vsix (150 files, 1.2MB)
```

**What's included in VSIX:**
- ✅ Compiled JavaScript (`out/`)
- ✅ Sound file (`media/error-aavi.mp3`)
- ✅ Icon (`media/icon.png`)
- ✅ Package manifest (`package.json`)
- ✅ Documentation (`README.md`, `CHANGELOG.md`)
- ✅ License (`LICENSE`)
- ❌ Source code (`src/` - excluded)
- ❌ Config files (`.eslintrc.json`, etc. - excluded)

## 🔌 Local Installation

### Install VSIX in VS Code

**Method 1: Command Line**
```bash
code --install-extension error-aavi-1.0.0.vsix
```

**Method 2: VS Code UI**
1. Open VS Code
2. Extensions view (Ctrl+Shift+X / Cmd+Shift+X)
3. Click "..." menu (top right)
4. Select "Install from VSIX..."
5. Choose `error-aavi-1.0.0.vsix`
6. Click "Reload" when prompted

**Verify Installation:**
1. Extensions view
2. Search for "Terminal Error Sound Alert"
3. Should show as installed

### Uninstall

```bash
code --uninstall-extension your-publisher-id.error-aavi
```

Or via Extensions view → Right-click → Uninstall

## 🌐 Marketplace Deployment

### Prerequisites Checklist

- [ ] Publisher account created
- [ ] Personal Access Token (PAT) generated
- [ ] `package.json` updated with publisher ID
- [ ] Repository URLs updated
- [ ] Sound file added
- [ ] Icon added (optional but recommended)
- [ ] README has screenshots/GIFs
- [ ] CHANGELOG updated
- [ ] Extension tested thoroughly

### Step 1: Update package.json

```json
{
  "publisher": "your-actual-publisher-id",
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/error-aavi.git"
  }
}
```

### Step 2: Create Publisher (First Time Only)

1. Visit: https://marketplace.visualstudio.com/manage
2. Sign in with Microsoft/GitHub
3. Click "Create Publisher"
4. Choose unique Publisher ID
5. Fill in display name and email

### Step 3: Generate PAT (First Time Only)

1. Visit: https://dev.azure.com
2. User Settings → Personal Access Tokens
3. New Token
4. Name: "VS Code Extension Publishing"
5. Organization: "All accessible organizations"
6. Scopes: **Marketplace → Manage** ✓
7. Create and **COPY TOKEN IMMEDIATELY**

### Step 4: Login to VSCE

```bash
vsce login your-publisher-id
```

Paste your PAT when prompted.

**Success message:**
```
Personal Access Token for publisher 'your-publisher-id': ****
The Personal Access Token verification succeeded for the publisher 'your-publisher-id'.
```

### Step 5: Publish

**First time publish:**
```bash
npm run publish
```

**Or directly:**
```bash
vsce publish
```

**With version bump:**
```bash
vsce publish patch   # 1.0.0 → 1.0.1 (bug fixes)
vsce publish minor   # 1.0.0 → 1.1.0 (new features)
vsce publish major   # 1.0.0 → 2.0.0 (breaking changes)
```

**Expected output:**
```
Publishing your-publisher-id.error-aavi@1.0.0...
DONE  Published your-publisher-id.error-aavi@1.0.0
Your extension will live at https://marketplace.visualstudio.com/items?itemName=your-publisher-id.error-aavi
```

### Step 6: Verify Publication

**Check marketplace:**
1. Visit: https://marketplace.visualstudio.com/
2. Search: "Terminal Error Sound Alert"
3. Or direct link: `https://marketplace.visualstudio.com/items?itemName=your-publisher-id.error-aavi`

**Install from marketplace:**
```bash
code --install-extension your-publisher-id.error-aavi
```

## 🔄 Update Process

### For Bug Fixes (Patch)

```bash
# 1. Fix the bug in src/extension.ts
# 2. Update CHANGELOG.md
# 3. Compile
npm run compile

# 4. Test
# Press F5

# 5. Publish with patch bump
vsce publish patch
```

### For New Features (Minor)

```bash
# 1. Add feature in src/extension.ts
# 2. Update README.md with new feature
# 3. Update CHANGELOG.md
# 4. Compile and test
npm run compile

# 5. Publish with minor bump
vsce publish minor
```

### For Breaking Changes (Major)

```bash
# 1. Make breaking changes
# 2. Update all documentation
# 3. Update CHANGELOG.md with migration guide
# 4. Compile and test thoroughly
npm run compile

# 5. Publish with major bump
vsce publish major
```

## 🛠️ All Commands Reference

### Development
```bash
npm install              # Install dependencies
npm run compile          # Compile TypeScript
npm run watch           # Watch mode (auto-compile)
npm run lint            # Run ESLint
```

### Testing
```bash
# Press F5 in VS Code    # Debug mode
npm run compile && code --extensionDevelopmentPath=$PWD  # CLI test
```

### Packaging
```bash
npm run package         # Create VSIX (calls vsce package)
vsce package           # Direct VSCE package
vsce package --out dist/  # Package to specific folder
```

### Publishing
```bash
vsce login <publisher-id>  # Login (one time)
npm run publish            # Publish (calls vsce publish)
vsce publish              # Direct publish
vsce publish patch        # Publish with patch bump
vsce publish minor        # Publish with minor bump
vsce publish major        # Publish with major bump
vsce publish 1.2.3        # Publish specific version
```

### Installation
```bash
code --install-extension error-aavi-1.0.0.vsix  # Install VSIX
code --install-extension publisher.error-aavi    # Install from marketplace
code --uninstall-extension publisher.error-aavi  # Uninstall
```

### Utilities
```bash
vsce ls                 # List files that will be packaged
vsce show <publisher.extension>  # Show extension info
vsce unpublish <publisher.extension>  # Unpublish (careful!)
```

## 🐛 Troubleshooting

### Build Issues

**Error: Cannot find module 'vscode'**
```bash
npm install
```

**Error: tsc command not found**
```bash
npm install -g typescript
# Or use: npx tsc -p ./
```

**TypeScript errors**
```bash
# Check tsconfig.json is correct
# Ensure all imports are valid
npm run compile
```

### Packaging Issues

**Error: vsce command not found**
```bash
npm install -g @vscode/vsce
```

**Error: Missing publisher name**
- Update `publisher` field in `package.json`

**Error: Missing README**
- Ensure `README.md` exists in root

**Warning: Large file size**
- Check `.vscodeignore` excludes unnecessary files
- Ensure `node_modules/` is excluded

### Publishing Issues

**Error: Invalid Personal Access Token**
- Generate new PAT with "Marketplace: Manage" scope
- Ensure "All accessible organizations" is selected
- Login again: `vsce login <publisher-id>`

**Error: Extension already exists**
- You're trying to publish with same version
- Bump version: `vsce publish patch`

**Error: Publisher not found**
- Create publisher at marketplace.visualstudio.com/manage
- Update `publisher` in package.json

### Runtime Issues

**Extension not activating**
- Check VS Code version (need 1.75.0+)
- Check Output → Extension Host for errors
- Reload window: Ctrl+R (Cmd+R)

**Sound not playing**
- Verify `media/error-aavi.mp3` exists
- Check file is valid MP3
- Test with command: "Test Error Sound"
- Check system audio is not muted

## 📊 Pre-Flight Checklist

Before publishing to marketplace:

### Code Quality
- [ ] `npm run compile` succeeds
- [ ] `npm run lint` passes
- [ ] No TypeScript errors
- [ ] Extension tested in debug mode (F5)

### Files
- [ ] `media/error-aavi.mp3` exists and works
- [ ] `media/icon.png` exists (128x128)
- [ ] `README.md` complete with examples
- [ ] `CHANGELOG.md` updated
- [ ] `LICENSE` has your name

### Configuration
- [ ] `package.json` publisher ID correct
- [ ] Repository URLs updated
- [ ] Version number appropriate
- [ ] Keywords relevant
- [ ] Categories correct

### Testing
- [ ] Tested on Windows
- [ ] Tested on macOS (if available)
- [ ] Tested on Linux (if available)
- [ ] Test command works
- [ ] Automatic detection works
- [ ] No console errors

### Publishing
- [ ] Publisher account created
- [ ] PAT generated and saved
- [ ] Logged in: `vsce login`
- [ ] Ready to run: `vsce publish`

## 🎉 Success Metrics

After publishing, monitor:
- Install count
- Ratings and reviews
- GitHub issues
- User feedback

Update regularly based on feedback!

---

**Ready to deploy?** Follow the steps above! 🚀
