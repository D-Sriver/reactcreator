const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Gestionnaire de détection des outils système pour DevStarter
 * Détecte automatiquement les package managers, bundlers et autres outils installés
 */
class SystemDetector {
  /**
   * Vérifie si une commande est disponible sur le système
   * @param {string} command - La commande à vérifier
   * @returns {boolean} - True si la commande existe
   */
  static isCommandAvailable(command) {
    try {
      // Pour Windows, on utilise 'where', pour Unix 'which'
      const checkCommand = process.platform === 'win32' ? 'where' : 'which';
      execSync(`${checkCommand} ${command}`, { stdio: 'ignore' });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Détecte les package managers installés sur le système
   * @returns {Array} - Liste des package managers disponibles
   */
  static detectAvailablePackageManagers() {
    const managers = ['npm', 'yarn', 'pnpm', 'bun'];
    const available = [];
    
    for (const manager of managers) {
      if (this.isCommandAvailable(manager)) {
        available.push(manager);
      }
    }
    
    // npm est généralement toujours disponible avec Node.js
    if (available.length === 0 && this.isCommandAvailable('node')) {
      available.push('npm');
    }
    
    return available;
  }

  /**
   * Génère les choix de package managers basés sur ceux disponibles
   * @returns {Array} - Choix formatés pour prompts
   */
  static getAvailablePackageManagerChoices() {
    const available = this.detectAvailablePackageManagers();
    
    // Si aucun package manager n'est détecté, retourner au moins npm
    if (available.length === 0) {
      console.warn('⚠️  Aucun package manager détecté. npm sera utilisé par défaut.');
      return [{ title: 'npm (par défaut)', value: 'npm' }];
    }
    
    const titles = {
      npm: 'npm',
      yarn: 'Yarn',
      pnpm: 'pnpm',
      bun: 'Bun'
    };
    
    return available.map(pm => ({
      title: titles[pm] || pm,
      value: pm
    }));
  }

  /**
   * Détecte le package manager préféré basé sur les fichiers de lock
   * @param {string} [directory=process.cwd()] - Répertoire à analyser
   * @returns {string} - Package manager détecté ou 'npm' par défaut
   */
  static detectPreferredPackageManager(directory = process.cwd()) {
    // Ordre de priorité basé sur les fichiers de lock
    const lockFiles = [
      { file: 'bun.lockb', manager: 'bun' },
      { file: 'pnpm-lock.yaml', manager: 'pnpm' },
      { file: 'yarn.lock', manager: 'yarn' },
      { file: 'package-lock.json', manager: 'npm' }
    ];
    
    for (const { file, manager } of lockFiles) {
      if (fs.existsSync(path.join(directory, file))) {
        // Vérifier que le package manager est installé
        if (this.isCommandAvailable(manager)) {
          return manager;
        }
      }
    }
    
    // Si aucun fichier de lock trouvé, retourner le premier disponible
    const available = this.detectAvailablePackageManagers();
    return available.length > 0 ? available[0] : 'npm';
  }

  /**
   * Détecte les bundlers/tools disponibles sur le système
   * @returns {Object} - Statut de disponibilité des bundlers
   */
  static detectAvailableBundlers() {
    const bundlers = {
      vite: this.isCommandAvailable('vite'),
      webpack: this.isCommandAvailable('webpack'),
      rollup: this.isCommandAvailable('rollup'),
      parcel: this.isCommandAvailable('parcel'),
      esbuild: this.isCommandAvailable('esbuild')
    };

    return bundlers;
  }

  /**
   * Vérifie si Git est installé
   * @returns {boolean} - True si Git est disponible
   */
  static isGitAvailable() {
    return this.isCommandAvailable('git');
  }

  /**
   * Détecte la version de Node.js
   * @returns {string|null} - Version de Node.js ou null si non détecté
   */
  static getNodeVersion() {
    try {
      const version = execSync('node --version', { encoding: 'utf8' }).trim();
      return version;
    } catch (error) {
      return null;
    }
  }

  /**
   * Vérifie si le système supporte une version de Node.js minimale
   * @param {string} minVersion - Version minimale requise (ex: '14.0.0')
   * @returns {boolean} - True si la version est suffisante
   */
  static checkNodeVersion(minVersion) {
    const currentVersion = this.getNodeVersion();
    if (!currentVersion) return false;

    const current = currentVersion.replace('v', '').split('.').map(Number);
    const required = minVersion.split('.').map(Number);

    for (let i = 0; i < 3; i++) {
      if (current[i] > required[i]) return true;
      if (current[i] < required[i]) return false;
    }
    return true; // Versions égales
  }

  /**
   * Génère un rapport complet du système
   * @returns {Object} - Rapport détaillé des outils disponibles
   */
  static generateSystemReport() {
    const report = {
      node: {
        available: this.isCommandAvailable('node'),
        version: this.getNodeVersion(),
        satisfiesMinimum: this.checkNodeVersion('14.0.0')
      },
      packageManagers: {
        available: this.detectAvailablePackageManagers(),
        preferred: this.detectPreferredPackageManager(),
        choices: this.getAvailablePackageManagerChoices()
      },
      bundlers: this.detectAvailableBundlers(),
      git: {
        available: this.isGitAvailable()
      },
      platform: process.platform,
      arch: process.arch
    };

    return report;
  }

  /**
   * Affiche un résumé du système détecté
   * @param {Object} [DesignManager] - Module d'affichage optionnel
   */
  static displaySystemSummary(DesignManager = null) {
    const report = this.generateSystemReport();
    
    if (DesignManager) {
      DesignManager.displayInfo('🔍 Détection du système...');
      DesignManager.displaySuccess(`Node.js: ${report.node.version || 'Non détecté'}`);
      DesignManager.displaySuccess(`Package managers: ${report.packageManagers.available.join(', ')}`);
      DesignManager.displaySuccess(`Préféré: ${report.packageManagers.preferred}`);
      if (report.git.available) {
        DesignManager.displaySuccess('Git: Disponible');
      } else {
        DesignManager.displayWarning('Git: Non détecté');
      }
    } else {
      console.log('🔍 Détection du système...');
      console.log(`Node.js: ${report.node.version || 'Non détecté'}`);
      console.log(`Package managers: ${report.packageManagers.available.join(', ')}`);
      console.log(`Préféré: ${report.packageManagers.preferred}`);
      console.log(`Git: ${report.git.available ? 'Disponible' : 'Non détecté'}`);
    }

    return report;
  }
}

module.exports = SystemDetector;
