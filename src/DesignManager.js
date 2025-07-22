const chalk = require('chalk');

/**
 * Module de design simplifié pour DevStarter
 */
class DesignManager {
  static colors = {
    primary: '#00d2ff',
    secondary: '#3a0ca3',
    success: '#06ffa5',
    warning: '#ffb700',
    error: '#ff006e',
    info: '#8338ec',
    text: '#f8f9fa',
    muted: '#6c757d'
  };

  /**
   * Affiche un logo simple et compact
   */
  static displayLogo() {
    console.log('');
    console.log(chalk.hex(this.colors.secondary).bold('  ██████╗ ███████╗██╗   ██╗███████╗████████╗ █████╗ ██████╗ ████████╗███████╗██████╗ '));
    console.log(chalk.hex(this.colors.secondary).bold('  ██╔══██╗██╔════╝██║   ██║██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝██╔════╝██╔══██╗'));
    console.log(chalk.hex(this.colors.secondary).bold('  ██║  ██║█████╗  ██║   ██║███████╗   ██║   ███████║██████╔╝   ██║   █████╗  ██████╔╝'));
    console.log(chalk.hex(this.colors.secondary).bold('  ██║  ██║██╔══╝  ╚██╗ ██╔╝╚════██║   ██║   ██╔══██║██╔══██╗   ██║   ██╔══╝  ██╔══██╗'));
    console.log(chalk.hex(this.colors.secondary).bold('  ██████╔╝███████╗ ╚████╔╝ ███████║   ██║   ██║  ██║██║  ██║   ██║   ███████╗██║  ██║'));
    console.log(chalk.hex(this.colors.secondary).bold('  ╚═════╝ ╚══════╝  ╚═══╝  ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝'));
    console.log('');
    console.log(chalk.hex(this.colors.success)('                    🚀 Multi-Framework Project Generator 🚀'));
    console.log('');
  }

  /**
   * Affiche un message de bienvenue
   */
  static displayWelcome(version) {
    console.log(chalk.hex(this.colors.success).bold(`  ✨ Welcome to DevStarter v${version}! ✨`));
    console.log(chalk.hex(this.colors.muted)('  Ready to create amazing web projects\n'));
  }

  /**
   * Affiche les étapes de progression
   */
  static displayStep(step, description) {
    console.log(chalk.hex(this.colors.primary).bold(`\n  📋 ${step}`) + chalk.hex(this.colors.text)(` ${description}`));
  }

  /**
   * Affiche un message de succès
   */
  static displaySuccess(message) {
    console.log(chalk.hex(this.colors.success).bold(`  ✅ ${message}`));
  }

  /**
   * Affiche un message d'erreur
   */
  static displayError(message) {
    console.log(chalk.hex(this.colors.error).bold(`  ❌ ${message}`));
  }

  /**
   * Affiche un message d'information
   */
  static displayInfo(message) {
    console.log(chalk.hex(this.colors.info)(`  ℹ️  ${message}`));
  }

  /**
   * Affiche un message d'avertissement
   */
  static displayWarning(message) {
    console.log(chalk.hex(this.colors.warning)(`  ⚠️  ${message}`));
  }

  /**
   * Affiche une ligne de séparation
   */
  static displaySeparator() {
    console.log(chalk.hex(this.colors.muted)('  ' + '─'.repeat(40)));
  }

  /**
   * Affiche le résumé final du projet
   */
  static displayFinalSummary(config) {
    console.log('\n');
    console.log(chalk.hex(this.colors.primary)('  ╭─────────────────────────────╮'));
    console.log(chalk.hex(this.colors.primary)('  │') + chalk.hex(this.colors.success).bold('   🎉 PROJECT CREATED! 🎉   ') + chalk.hex(this.colors.primary)('│'));
    console.log(chalk.hex(this.colors.primary)('  ╰─────────────────────────────╯'));
    
    console.log(`\n  ${chalk.hex(this.colors.primary).bold('Project:')} ${chalk.hex(this.colors.text).bold(config.projectName)}`);
    console.log(`  ${chalk.hex(this.colors.primary).bold('Framework:')} ${chalk.hex(this.colors.text).bold(config.framework)}`);
    console.log(`  ${chalk.hex(this.colors.primary).bold('Package Manager:')} ${chalk.hex(this.colors.text).bold(config.packageManager)}`);
    console.log('');
  }

  /**
   * Clear la console
   */
  static clearScreen() {
    console.clear();
  }
}

module.exports = DesignManager;
