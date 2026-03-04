# VS Code Marketplace Publishing Guide

Complete step-by-step guide for publishing your extension to the Visual Studio Code Marketplace.

## 🎯 Overview

Publishing to the VS Code Marketplace makes your extension available to millions of developers worldwide. This guide covers everything from account creation to ongoing maintenance.

## 📋 Prerequisites

- [ ] Extension is fully tested and working
- [ ] All code is committed to version control (Git recommended)
- [ ] README.md is complete with screenshots/GIFs
- [ ] CHANGELOG.md documents all changes
- [ ] Extension icon (128x128 PNG) is created
- [ ] Sound file (error-aavi.mp3) is included

## 🔐 Step 1: Create Azure DevOps Account

### Why Azure DevOps?

VS Code Marketplace uses Azure DevOps for authentication and publisher management.

### Steps:

1. Visit [Azure DevOps](https://dev.azure.com)
2. Click "Start free"
3. Sign in with:
   - Microsoft Account
   - GitHub Account
   - Or create new account
4. Complete profile setup

## 👤 Step 2: Create Publisher Profile

### Navigate to Publisher Management

1. Go to [Marketplace Publisher Management](https://marketplace.visualstudio.com/manage)
2. Sign in with your Azure DevOps account
3. Click "Create Publisher"

### Fill Publisher Details

- **Publisher ID**: 
  - Must be unique
  - Lowercase letters, numbers, hyphens only
  - Cannot be changed later
  - Example: `john-doe-dev`, `mycompany-extensions`
  
- **Display Name**: 
  - Your name or company name
  - Can be changed later
  - Example: "John Doe", "My Company"
  
- **Email**: 
  - Contact email for users
  - Must be valid
  
- **Personal Access Token**: (We'll create this next)

## 🔑 Step 3: Generate Personal Access Token (PAT)

### Create Token

1. Go to [Azure DevOps](https://dev.azure.com)
2. Click your profile icon (top right)
3. Select "Personal Access Tokens"
4. Click "+ New Token"

### Configure Token

**Name**: `VS Code Extension Publishing`

**Organization**: Select "All accessible organizations"

**Expiration**: 
- Recommended: 90 days (for security)
- Maximum: 1 year
- Set calendar reminder to renew before expiration

**Scopes**: 
1. Click "Show all scopes"
2. Scroll to "Marketplace"
3. Check **"Marketplace: Manage"** (this includes Acquire and Publish)

### Save Token

1. Click "Create"
2. **IMMEDIATELY COPY THE TOKEN** - you won't see it again!
3. Store securely (password manager recommended)
4. Never commit to version control

## 📝 Step 4: Prepare Extension Files

### Update package.json

```json
{
  "name": "error-aavi",
  "displayName": "Terminal Error Sound Alert",
  "publisher": "YOUR-PUBLISHER-ID-HERE",
  "version": "1.0.0",
  "icon": "media/icon.png",
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR-USERNAME/error-aavi.git"
  },
  "bugs": {
    "url": "https://github.com/YOUR-USERNAME/error-aavi/issues"
  },
  "homepage": "https://github.com/YOUR-USERNAME/error-aavi#readme"
}
```

### Create Extension Icon

**Requirements**:
- Format: PNG
- Size: 128x128 pixels
- Transparent background recommended
- Clear, simple design
- Visible at small sizes

**Tools**:
- Figma (free, web-based)
- Canva (free templates)
- GIMP (free, desktop)
- Photoshop

**Save as**: `media/icon.png`

### Enhance README.md

Include:
- Clear description
- Screenshots or GIFs showing functionality
- Installation instructions
- Usage examples
- Configuration options
- Troubleshooting section
- Links to issues/support

### Update CHANGELOG.md

Document all changes:
```markdown
## [1.0.0] - 2024-03-04
### Added
- Initial release
- Terminal monitoring
- Error detection
- Sound alerts
```

## 🛠️ Step 5: Install VSCE

VSCE (Visual Studio Code Extensions) is the command-line tool for packaging and publishing.

```bash
npm install -g @vscode/vsce
```

Verify installation:
```bash
vsce --version
```

## 🔐 Step 6: Login with VSCE

```bash
vsce login YOUR-PUBLISHER-ID
```

When prompted, paste your Personal Access Token.

**Success message**: "Successfully logged in as YOUR-PUBLISHER-ID"

## 📦 Step 7: Package Extension

Before publishing, create a local package to test:

```bash
vsce package
```

This creates: `error-aavi-1.0.0.vsix`

### Test VSIX Locally

1. Open VS Code
2. Extensions view (Ctrl+Shift+X)
3. Click "..." → "Install from VSIX..."
4. Select the .vsix file
5. Test thoroughly

## 🚀 Step 8: Publish to Marketplace

### First-Time Publish

```bash
vsce publish
```

Or with npm script:
```bash
npm run publish
```

### What Happens:

1. VSCE validates your extension
2. Packages the extension
3. Uploads to Marketplace
4. Extension goes live (usually within minutes)

### Verify Publication

1. Visit [VS Code Marketplace](https://marketplace.visualstudio.com/)
2. Search for your extension name
3. Or go to: `https://marketplace.visualstudio.com/items?itemName=YOUR-PUBLISHER-ID.error-aavi`

## 🔄 Step 9: Update Extension

### Version Numbering (Semantic Versioning)

- **Patch** (1.0.0 → 1.0.1): Bug fixes
- **Minor** (1.0.0 → 1.1.0): New features, backward compatible
- **Major** (1.0.0 → 2.0.0): Breaking changes

### Update Process

1. Make code changes
2. Update CHANGELOG.md
3. Compile: `npm run compile`
4. Test: Press F5 in VS Code
5. Publish with version bump:

```bash
vsce publish patch   # Bug fixes
vsce publish minor   # New features
vsce publish major   # Breaking changes
```

Or manually update version in package.json:
```bash
vsce publish
```

## 📊 Step 10: Monitor and Maintain

### View Statistics

1. Go to [Publisher Management](https://marketplace.visualstudio.com/manage)
2. Click your extension
3. View:
   - Install count
   - Ratings and reviews
   - Trends over time

### Respond to Users

- Monitor reviews and ratings
- Respond to issues on GitHub
- Update documentation based on feedback
- Release updates regularly

### Update PAT Before Expiration

1. Create new PAT (same process as Step 3)
2. Login again: `vsce login YOUR-PUBLISHER-ID`
3. Enter new token

## ✅ Pre-Publish Checklist

Before publishing, verify:

### Code Quality
- [ ] Extension compiles without errors
- [ ] No TypeScript errors
- [ ] ESLint passes
- [ ] All features tested

### Files
- [ ] `media/error-aavi.mp3` exists
- [ ] `media/icon.png` exists (128x128)
- [ ] README.md is complete
- [ ] CHANGELOG.md is updated
- [ ] LICENSE file exists

### Configuration
- [ ] `package.json` has correct publisher ID
- [ ] Repository URLs are correct
- [ ] Version number is appropriate
- [ ] Keywords are relevant
- [ ] Categories are correct

### Testing
- [ ] Tested on Windows
- [ ] Tested on macOS (if available)
- [ ] Tested on Linux (if available)
- [ ] All commands work
- [ ] Sound plays correctly
- [ ] No console errors

## 🚨 Common Issues and Solutions

### Issue: "Publisher not found"

**Solution**: 
- Verify publisher ID in package.json matches your actual publisher ID
- Login again: `vsce login YOUR-PUBLISHER-ID`

### Issue: "Invalid Personal Access Token"

**Solution**:
- Generate new PAT with "Marketplace: Manage" scope
- Ensure "All accessible organizations" is selected
- Login with new token

### Issue: "Extension validation failed"

**Solution**:
- Check all required fields in package.json
- Ensure icon file exists at specified path
- Verify version format (x.y.z)
- Check for syntax errors

### Issue: "Cannot find module 'vscode'"

**Solution**:
```bash
npm install
```

### Issue: "ENOENT: no such file or directory"

**Solution**:
- Ensure all referenced files exist
- Check file paths in package.json
- Verify media folder contains required files

## 📚 Additional Resources

### Official Documentation
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [Extension Manifest](https://code.visualstudio.com/api/references/extension-manifest)
- [VSCE GitHub](https://github.com/microsoft/vscode-vsce)

### Community
- [VS Code Extension Samples](https://github.com/microsoft/vscode-extension-samples)
- [Stack Overflow - vscode-extensions tag](https://stackoverflow.com/questions/tagged/vscode-extensions)

## 🎉 Success!

Once published, your extension is available to millions of VS Code users worldwide!

### Next Steps:
1. Share on social media
2. Write a blog post
3. Submit to extension lists/newsletters
4. Gather user feedback
5. Plan future enhancements

---

**Good luck with your extension!** 🚀
