const chalk = require('chalk');

class Logger {
  static success(message) {
    console.log(chalk.green('✓'), message);
  }

  static error(message) {
    console.log(chalk.red('✗'), message);
  }

  static info(message) {
    console.log(chalk.blue('ℹ'), message);
  }

  static warn(message) {
    console.log(chalk.yellow('⚠'), message);
  }

  static log(message) {
    console.log(message);
  }
}

module.exports = Logger;