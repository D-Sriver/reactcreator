const utils = require('./utils');
const DesignManager = require('./DesignManager');

/**
 * Gestionnaire Git pour DevStarter
 */
class GitManager {
  /**
   * Initialise un repository Git dans le projet courant
   * @param {object} lang - Objet de traduction
   */
  static async initialize(lang) {
    try {
      DesignManager.displayInfo(lang.initializingGit);
      
      utils.executeCommand('git init');
      utils.executeCommand('git add .');
      utils.executeCommand('git commit -m "Initial commit"');
      
      DesignManager.displaySuccess(lang.gitInitialized);
      return true;
    } catch (error) {
      DesignManager.displayError(lang.gitInitError + ': ' + error.message);
      return false;
    }
  }

  /**
   * Vérifie si Git est installé sur le système
   * @returns {boolean} True si Git est disponible
   */
  static isAvailable() {
    return utils.commandExists('git');
  }

  /**
   * Crée un fichier .gitignore personnalisé
   * @param {string} framework - Framework utilisé
   * @param {string} packageManager - Gestionnaire de paquets
   */
  static createGitignore(framework, packageManager) {
    const gitignoreContent = this.generateGitignoreContent(framework, packageManager);
    const fs = require('fs');
    
    try {
      fs.writeFileSync('.gitignore', gitignoreContent);
      DesignManager.displaySuccess('Custom .gitignore created');
    } catch (error) {
      DesignManager.displayError('Error creating .gitignore: ' + error.message);
    }
  }

  /**
   * Génère le contenu du .gitignore basé sur le framework
   * @param {string} framework - Framework utilisé
   * @param {string} packageManager - Gestionnaire de paquets
   * @returns {string} Contenu du .gitignore
   */
  static generateGitignoreContent(framework, packageManager) {
    const commonIgnores = [
      '# Dependencies',
      'node_modules/',
      '',
      '# Production builds',
      'dist/',
      'build/',
      '',
      '# Environment variables',
      '.env',
      '.env.local',
      '.env.development.local',
      '.env.test.local',
      '.env.production.local',
      '',
      '# Logs',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      '',
      '# IDE',
      '.vscode/',
      '.idea/',
      '*.swp',
      '*.swo',
      '',
      '# OS',
      '.DS_Store',
      'Thumbs.db'
    ];

    // Ajouts spécifiques au gestionnaire de paquets
    if (packageManager === 'yarn') {
      commonIgnores.push('', '# Yarn', '.yarn/', '.pnp.*');
    } else if (packageManager === 'pnpm') {
      commonIgnores.push('', '# pnpm', '.pnpm-store/');
    }

    // Ajouts spécifiques au framework
    if (framework === 'next') {
      commonIgnores.push('', '# Next.js', '.next/', 'out/');
    } else if (framework === 'vite') {
      commonIgnores.push('', '# Vite', '.vite/');
    }

    return commonIgnores.join('\n') + '\n';
  }
}

module.exports = GitManager;
