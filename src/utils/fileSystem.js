const fs = require('fs-extra');
const path = require('path');

class FileSystemUtils {
  static async ensureDirectory(dirPath) {
    try {
      await fs.ensureDir(dirPath);
      return true;
    } catch (error) {
      throw new Error(`Failed to create directory ${dirPath}: ${error.message}`);
    }
  }

  static async copyFile(sourcePath, targetPath) {
    try {
      await fs.copy(sourcePath, targetPath);
      return true;
    } catch (error) {
      throw new Error(`Failed to copy file from ${sourcePath} to ${targetPath}: ${error.message}`);
    }
  }

  static async fileExists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  static async writeFile(filePath, content) {
    try {
      await fs.writeFile(filePath, content, 'utf8');
      return true;
    } catch (error) {
      throw new Error(`Failed to write file ${filePath}: ${error.message}`);
    }
  }

  static getClaudeCommandsPath() {
    return path.join(process.cwd(), '.claude', 'commands');
  }

  static getTemplatesPath() {
    return path.join(__dirname, '..', 'templates');
  }
}

module.exports = FileSystemUtils;