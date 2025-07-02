const path = require('path');
const fs = require('fs-extra');
const FileSystemUtils = require('../utils/fileSystem');
const Logger = require('../utils/logger');

const PERSONA_FILES = [
  'architect.md',
  'frontend.md',
  'backend.md',
  'analyzer.md',
  'mentor.md',
  'refactorer.md',
  'qa.md'
];

async function initCommand() {
  try {
    Logger.info('Initializing Claude role commands...');

    const claudeCommandsPath = FileSystemUtils.getClaudeCommandsPath();
    
    if (await FileSystemUtils.fileExists(claudeCommandsPath)) {
      Logger.warn(`Directory ${claudeCommandsPath} already exists`);
      Logger.info('Checking for existing files...');
    }

    await FileSystemUtils.ensureDirectory(claudeCommandsPath);
    Logger.success(`Created directory: ${claudeCommandsPath}`);

    const templatesPath = FileSystemUtils.getTemplatesPath();
    let copiedCount = 0;
    let skippedCount = 0;

    for (const filename of PERSONA_FILES) {
      const sourcePath = path.join(templatesPath, filename);
      const targetPath = path.join(claudeCommandsPath, filename);
      
      if (await FileSystemUtils.fileExists(targetPath)) {
        Logger.warn(`Skipped ${filename} (already exists)`);
        skippedCount++;
        continue;
      }

      if (await FileSystemUtils.fileExists(sourcePath)) {
        await FileSystemUtils.copyFile(sourcePath, targetPath);
        Logger.success(`Created ${filename}`);
        copiedCount++;
      } else {
        Logger.error(`Template ${filename} not found`);
      }
    }

    Logger.log('');
    Logger.success(`Initialization complete!`);
    Logger.info(`Created ${copiedCount} files, skipped ${skippedCount} existing files`);
    Logger.info(`Claude commands directory: ${claudeCommandsPath}`);
    
  } catch (error) {
    Logger.error(`Initialization failed: ${error.message}`);
    throw error;
  }
}

module.exports = initCommand;