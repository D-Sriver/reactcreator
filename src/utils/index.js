const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Utilitaires communs pour DevStarter
 */
const utils = {
  /**
   * Formate le nom du projet (minuscules, tirets)
   * @param {string} name - Nom du projet
   * @returns {string} Nom formaté
   */
  formatProjectName: (name) => name.toLowerCase().replace(/\s+/g, '-'),

  /**
   * Exécute une commande shell avec gestion d'erreur
   * @param {string} command - Commande à exécuter
   * @param {object} options - Options pour execSync
   */
  executeCommand: (command, options = {}) => {
    try {
      execSync(command, { stdio: 'inherit', ...options });
    } catch (error) {
      throw new Error(`Command failed: ${command}\n${error.message}`);
    }
  },

  /**
   * Met à jour le package.json d'un projet
   * @param {string} projectPath - Chemin vers le projet
   * @param {function} updateFn - Fonction de mise à jour
   */
  updatePackageJson: (projectPath, updateFn) => {
    const packageJsonPath = path.join(projectPath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      updateFn(packageJson);
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    }
  },

  /**
   * Vérifie si une commande existe dans le système
   * @param {string} command - Commande à vérifier
   * @returns {boolean} True si la commande existe
   */
  commandExists: (command) => {
    try {
      execSync(`where ${command}`, { stdio: 'ignore' });
      return true;
    } catch (error) {
      return false;
    }
  }
};

module.exports = utils;
