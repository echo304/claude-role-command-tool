const fs = require('fs-extra');
const path = require('path');
const initCommand = require('../src/commands/init');
const FileSystemUtils = require('../src/utils/fileSystem');

describe('Init Command', () => {
  const testDir = path.join(__dirname, 'temp');
  const originalCwd = process.cwd();

  beforeEach(async () => {
    await fs.ensureDir(testDir);
    process.chdir(testDir);
  });

  afterEach(async () => {
    process.chdir(originalCwd);
    await fs.remove(testDir);
  });

  test('should create .claude/commands directory', async () => {
    await initCommand();
    
    const claudeCommandsPath = FileSystemUtils.getClaudeCommandsPath();
    const exists = await fs.pathExists(claudeCommandsPath);
    
    expect(exists).toBe(true);
  });

  test('should create all persona MD files', async () => {
    await initCommand();
    
    const claudeCommandsPath = FileSystemUtils.getClaudeCommandsPath();
    const personaFiles = [
      'architect.md',
      'frontend.md',
      'backend.md',
      'analyzer.md',
      'mentor.md',
      'refactorer.md',
      'qa.md'
    ];

    for (const filename of personaFiles) {
      const filePath = path.join(claudeCommandsPath, filename);
      const exists = await fs.pathExists(filePath);
      expect(exists).toBe(true);
    }
  });

  test('should not overwrite existing files', async () => {
    const claudeCommandsPath = FileSystemUtils.getClaudeCommandsPath();
    await fs.ensureDir(claudeCommandsPath);
    
    const testContent = 'test content';
    const testFilePath = path.join(claudeCommandsPath, 'architect.md');
    await fs.writeFile(testFilePath, testContent);

    await initCommand();

    const content = await fs.readFile(testFilePath, 'utf8');
    expect(content).toBe(testContent);
  });
});