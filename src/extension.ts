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

    // Monitor terminal tasks for failures
    const taskEndListener = vscode.tasks.onDidEndTaskProcess((event) => {
        if (event.exitCode !== 0 && !isPlaying) {
            outputChannel.appendLine(`Task failed with exit code: ${event.exitCode}`);
            playSound(context);
        }
    });

    // Monitor terminal close with error status
    const terminalCloseListener = vscode.window.onDidCloseTerminal((terminal) => {
        if (terminal.exitStatus && terminal.exitStatus.code !== 0 && !isPlaying) {
            outputChannel.appendLine(`Terminal closed with error code: ${terminal.exitStatus.code}`);
            playSound(context);
        }
    });

    // Monitor PowerShell history for errors
    monitorPowerShellHistory(context);

    // Monitor diagnostics (compilation errors)
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

    // Monitor npm log directory for errors
    monitorNpmLogs(context);

    context.subscriptions.push(disposable, taskEndListener, terminalCloseListener, diagnosticListener);
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

function monitorPowerShellHistory(context: vscode.ExtensionContext) {
    const os = require('os');
    const psHistoryPath = path.join(os.homedir(), 'AppData', 'Roaming', 'Microsoft', 'Windows', 'PowerShell', 'PSReadLine', 'ConsoleHost_history.txt');
    
    outputChannel.appendLine(`Monitoring PowerShell history: ${psHistoryPath}`);
    outputChannel.appendLine(`History file exists: ${fs.existsSync(psHistoryPath)}`);
    
    if (fs.existsSync(psHistoryPath)) {
        let lastSize = fs.statSync(psHistoryPath).size;
        outputChannel.appendLine(`Initial history file size: ${lastSize}`);
        
        setInterval(() => {
            try {
                const currentSize = fs.statSync(psHistoryPath).size;
                if (currentSize > lastSize && !isPlaying) {
                    const content = fs.readFileSync(psHistoryPath, 'utf8');
                    const newContent = content.slice(lastSize);
                    
                    outputChannel.appendLine(`New PowerShell activity: ${newContent.trim()}`);
                    
                    // Simple approach: Play sound for ANY command that's not very common
                    const command = newContent.trim().split(' ')[0].toLowerCase();
                    const veryCommonCommands = ['cd', 'ls', 'dir', 'cls', 'pwd', 'exit', 'clear'];
                    
                    // If it's not a very common command, assume it might be an error
                    const shouldPlaySound = !veryCommonCommands.includes(command) && command.length > 0;
                    
                    if (shouldPlaySound) {
                        outputChannel.appendLine(`Potential error command detected: ${newContent.trim()}`);
                        playSound(context);
                    }
                }
                lastSize = currentSize;
            } catch (error) {
                outputChannel.appendLine(`History monitoring error: ${error}`);
            }
        }, 1000);
    } else {
        outputChannel.appendLine('PowerShell history file not found - terminal monitoring disabled');
    }
}

function monitorNpmLogs(context: vscode.ExtensionContext) {
    const os = require('os');
    const npmLogDir = path.join(os.homedir(), 'AppData', 'Local', 'npm-cache', '_logs');
    
    if (fs.existsSync(npmLogDir)) {
        fs.watch(npmLogDir, (eventType, filename) => {
            if (eventType === 'rename' && filename && filename.includes('debug') && !isPlaying) {
                setTimeout(() => {
                    const logPath = path.join(npmLogDir, filename);
                    if (fs.existsSync(logPath)) {
                        const content = fs.readFileSync(logPath, 'utf8');
                        if (content.includes('error') || content.includes('verbose exit 1')) {
                            outputChannel.appendLine(`NPM error detected in: ${filename}`);
                            playSound(context);
                        }
                    }
                }, 100);
            }
        });
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