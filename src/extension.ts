import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

let outputChannel: vscode.OutputChannel;
let isPlaying = false;

export function activate(context: vscode.ExtensionContext) {
    outputChannel = vscode.window.createOutputChannel('Error Aavi');
    outputChannel.appendLine('Extension activated!');
    
    // Create WAV file if it doesn't exist
    createWavFile(context);
    
    // Test command
    let disposable = vscode.commands.registerCommand('error-aavi.testSound', () => {
        outputChannel.appendLine('Manual test triggered');
        playSound(context);
        vscode.window.showInformationMessage('Playing error sound...');
    });

    // Monitor only task failures (commands that return non-zero exit codes)
    const taskEndListener = vscode.tasks.onDidEndTaskProcess((event) => {
        if (event.exitCode !== 0 && !isPlaying) {
            outputChannel.appendLine(`Command failed with exit code: ${event.exitCode}`);
            playSound(context);
        }
    });

    // Monitor compilation errors only
    const diagnosticListener = vscode.languages.onDidChangeDiagnostics((event) => {
        event.uris.forEach(uri => {
            const diagnostics = vscode.languages.getDiagnostics(uri);
            const hasErrors = diagnostics.some(d => d.severity === vscode.DiagnosticSeverity.Error);
            if (hasErrors && !isPlaying) {
                outputChannel.appendLine(`Compilation error detected in: ${uri.fsPath}`);
                playSound(context);
            }
        });
    });

    context.subscriptions.push(disposable, taskEndListener, diagnosticListener);
}

function createWavFile(context: vscode.ExtensionContext) {
    const wavPath = path.join(context.extensionPath, 'media', 'error-beep.wav');
    
    if (!fs.existsSync(wavPath)) {
        // Create a simple 1-second beep WAV file (440Hz tone)
        const sampleRate = 44100;
        const duration = 1; // 1 second
        const frequency = 440; // A4 note
        const amplitude = 0.3;
        
        const numSamples = sampleRate * duration;
        const buffer = Buffer.alloc(44 + numSamples * 2); // WAV header + 16-bit samples
        
        // WAV header
        buffer.write('RIFF', 0);
        buffer.writeUInt32LE(36 + numSamples * 2, 4);
        buffer.write('WAVE', 8);
        buffer.write('fmt ', 12);
        buffer.writeUInt32LE(16, 16); // PCM format size
        buffer.writeUInt16LE(1, 20);  // PCM format
        buffer.writeUInt16LE(1, 22);  // Mono
        buffer.writeUInt32LE(sampleRate, 24);
        buffer.writeUInt32LE(sampleRate * 2, 28); // Byte rate
        buffer.writeUInt16LE(2, 32);  // Block align
        buffer.writeUInt16LE(16, 34); // Bits per sample
        buffer.write('data', 36);
        buffer.writeUInt32LE(numSamples * 2, 40);
        
        // Generate sine wave samples
        for (let i = 0; i < numSamples; i++) {
            const sample = Math.sin(2 * Math.PI * frequency * i / sampleRate) * amplitude * 32767;
            buffer.writeInt16LE(Math.round(sample), 44 + i * 2);
        }
        
        fs.writeFileSync(wavPath, buffer);
        outputChannel.appendLine('Created WAV beep file: ' + wavPath);
    }
}



function playSound(context: vscode.ExtensionContext) {
    if (isPlaying) return;
    
    // Priority order: custom WAV -> generated WAV -> MP3
    const customWavPath = path.join(context.extensionPath, 'media', 'error-aavi.wav');
    const generatedWavPath = path.join(context.extensionPath, 'media', 'error-beep.wav');
    const mp3Path = path.join(context.extensionPath, 'media', 'error-aavi.mp3');
    
    let soundPath;
    if (fs.existsSync(customWavPath)) {
        soundPath = customWavPath;
    } else if (fs.existsSync(generatedWavPath)) {
        soundPath = generatedWavPath;
    } else if (fs.existsSync(mp3Path)) {
        soundPath = mp3Path;
    } else {
        outputChannel.appendLine('No sound file found');
        return;
    }

    isPlaying = true;
    outputChannel.appendLine('Playing sound: ' + soundPath);
    
    const { exec } = require('child_process');
    
    // Use SoundPlayer for WAV files (works reliably)
    if (soundPath.endsWith('.wav')) {
        exec(`powershell -c "(New-Object Media.SoundPlayer '${soundPath}').PlaySync()"`, (error: any) => {
            if (error) {
                outputChannel.appendLine('WAV playback failed: ' + error.message);
            } else {
                outputChannel.appendLine('WAV playback successful');
            }
        });
    } else {
        // Fallback for MP3
        exec(`start "" "${soundPath}"`, (error: any) => {
            if (error) {
                outputChannel.appendLine('MP3 playback failed: ' + error.message);
            } else {
                outputChannel.appendLine('MP3 playback started');
            }
        });
    }
    
    setTimeout(() => {
        isPlaying = false;
    }, 1000);
}

export function deactivate() {}