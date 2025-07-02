const fs = require('fs-extra');
const path = require('path');
const FileSystemUtils = require('../src/utils/fileSystem');

describe('FileSystemUtils', () => {
  const testDir = path.join(__dirname, 'temp');

  beforeEach(async () => {
    await fs.ensureDir(testDir);
  });

  afterEach(async () => {
    await fs.remove(testDir);
  });

  test('should ensure directory creation', async () => {
    const dirPath = path.join(testDir, 'newdir');
    
    await FileSystemUtils.ensureDirectory(dirPath);
    
    const exists = await fs.pathExists(dirPath);
    expect(exists).toBe(true);
  });

  test('should check file existence correctly', async () => {
    const filePath = path.join(testDir, 'testfile.txt');
    
    let exists = await FileSystemUtils.fileExists(filePath);
    expect(exists).toBe(false);
    
    await fs.writeFile(filePath, 'test content');
    
    exists = await FileSystemUtils.fileExists(filePath);
    expect(exists).toBe(true);
  });

  test('should write file correctly', async () => {
    const filePath = path.join(testDir, 'testfile.txt');
    const content = 'test content';
    
    await FileSystemUtils.writeFile(filePath, content);
    
    const readContent = await fs.readFile(filePath, 'utf8');
    expect(readContent).toBe(content);
  });

  test('should copy file correctly', async () => {
    const sourcePath = path.join(testDir, 'source.txt');
    const targetPath = path.join(testDir, 'target.txt');
    const content = 'test content';
    
    await fs.writeFile(sourcePath, content);
    await FileSystemUtils.copyFile(sourcePath, targetPath);
    
    const readContent = await fs.readFile(targetPath, 'utf8');
    expect(readContent).toBe(content);
  });
});