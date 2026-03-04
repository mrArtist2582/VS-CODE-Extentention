# Media Folder

This folder contains the audio and visual assets for the extension.

## Required Files

### error-aavi.mp3
- **Purpose**: The sound file that plays when error keywords are detected in terminal output
- **Format**: MP3 audio file
- **Recommended**: 
  - Duration: 1-3 seconds (short alert sound)
  - File size: < 500KB for optimal performance
  - Sample rate: 44.1kHz or 48kHz
  - Bitrate: 128-192 kbps

**Important**: You must add your own `error-aavi.mp3` file here before building the extension.

### icon.png (Optional but Recommended)
- **Purpose**: Extension icon displayed in VS Code marketplace and extensions view
- **Format**: PNG image
- **Required size**: 128x128 pixels
- **Recommended**: 
  - Use a simple, recognizable design
  - Ensure good visibility at small sizes
  - Use transparent background if appropriate

## How to Add Your Sound File

1. Find or create an MP3 sound file for error alerts
2. Name it exactly: `error-aavi.mp3`
3. Place it in this `media/` folder
4. The extension will automatically use this file

## Sound File Sources

You can:
- Create your own using audio editing software
- Use royalty-free sound effects from:
  - freesound.org
  - zapsplat.com
  - mixkit.co
- Record your own voice saying "Error!"
- Use system sounds converted to MP3

## Testing Your Sound

After adding the sound file:
1. Compile the extension: `npm run compile`
2. Press F5 to run in development mode
3. Use Command Palette → "Test Error Sound"
4. Or trigger an error in the terminal to test automatically

---

**Note**: The extension will show an error message if `error-aavi.mp3` is missing.
