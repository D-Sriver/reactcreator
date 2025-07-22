const utils = require('./utils/utils');
const DesignManager = require('./DesignManager');
const { managers } = require('../PackageManagers');

/**
 * Gestionnaire de création de projets pour DevStarter
 * Gère la création des projets avec différents bundlers et frameworks
 */
class ProjectCreator {
  /**
   * Crée un nouveau projet
   * @param {object} config - Configuration du projet
   * @param {object} lang - Objet de traduction
   */
  static async create(config, lang) {
    const { projectName, packageManager, bundler, useTypeScript, framework } = config;
    const { managers } = require('../PackageManagers');
    const pm = managers[packageManager];
    
    DesignManager.displayInfo(lang.creatingProject
      .replace('{projectName}', projectName)
      .replace('{packageManager}', packageManager)
      .replace('{bundler}', bundler)
      .replace('{withTypeScript}', useTypeScript ? lang.withTypeScript : lang.withoutTypeScript)
    );

    // Génère et exécute la commande de création
    const creationCommand = this.getCreationCommand(config, pm);
    utils.executeCommand(creationCommand);

    // Change le répertoire de travail vers le projet créé
    process.chdir(projectName);
    
    // Installation des dépendances si nécessaire
    if (packageManager !== 'npm' && packageManager !== 'bun') {
      DesignManager.displayInfo(lang.installingDependencies);
      utils.executeCommand(pm.install);
    }

    DesignManager.displaySuccess(lang.projectCreated.replace('{projectName}', projectName));
  }

  /**
   * Génère la commande de création de projet
   * @param {object} config - Configuration du projet
   * @returns {string} Commande de création
   */
  static getCreationCommand(config) {
    const { bundler, useTypeScript, framework, projectName, packageManager } = config;
    
    const pm = managers[packageManager];
    if (!pm) {
      throw new Error(`Package manager not found: ${packageManager}`);
    }
    
    const commands = {
      'vite': `${pm.createVite} ${projectName} --template ${framework}${useTypeScript ? '-ts' : ''}`,
      'cra': `${pm.createReactApp} ${projectName}${useTypeScript ? ' --template typescript' : ''}`,
      'next': `${pm.createNext} ${projectName}${useTypeScript ? ' --typescript' : ' --js'} --eslint --no-tailwind --no-src-dir --app --no-import-alias`
    };
    
    if (!commands[bundler]) {
      throw new Error(`Invalid bundler: ${bundler}`);
    }
    
    return commands[bundler];
  }

  /**
   * Valide la configuration du projet
   * @param {object} config - Configuration à valider
   * @returns {boolean} True si la configuration est valide
   */
  static validateConfig(config) {
    const requiredFields = ['projectName', 'packageManager', 'bundler', 'framework'];
    
    for (const field of requiredFields) {
      if (!config[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Validation des combinaisons framework/bundler
    if (config.bundler === 'cra' && config.framework !== 'react') {
      throw new Error('Create React App only supports React framework');
    }

    if (config.bundler === 'next' && config.framework !== 'react') {
      throw new Error('Next.js only supports React framework');
    }

    return true;
  }

  /**
   * Retourne les templates disponibles pour un bundler
   * @param {string} bundler - Bundler choisi
   * @returns {array} Liste des templates disponibles
   */
  static getAvailableTemplates(bundler) {
    const templates = {
      'vite': ['react', 'vue', 'svelte', 'solid', 'qwik', 'vanilla'],
      'cra': ['react'],
      'next': ['react']
    };
    
    return templates[bundler] || [];
  }

  /**
   * Vérifie si un bundler supporte TypeScript nativement
   * @param {string} bundler - Bundler à vérifier
   * @returns {boolean} True si TypeScript est supporté
   */
  static supportsTypeScript(bundler) {
    const tsSupport = {
      'vite': true,
      'cra': true,
      'next': true
    };
    
    return tsSupport[bundler] || false;
  }

  /**
   * Retourne la commande de démarrage pour un projet
   * @param {object} config - Configuration du projet
   * @returns {string} Commande de démarrage
   */
  static getStartCommand(config) {
    const { managers } = require('../PackageManagers');
    const pm = managers[config.packageManager];
    
    const startCommands = {
      'vite': 'dev',
      'cra': 'start',
      'next': 'dev'
    };
    
    const command = startCommands[config.bundler] || 'start';
    return `${pm.run} ${command}`;
  }
}

module.exports = ProjectCreator;
