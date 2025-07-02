const { Command } = require('commander');
const initCommand = require('./commands/init');
const chalk = require('chalk');

const program = new Command();

program
  .name('claude-role-command-tool')
  .description('CLI tool to generate Claude custom command files for different development personas')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize Claude custom commands in current directory')
  .action(async () => {
    try {
      await initCommand();
    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);