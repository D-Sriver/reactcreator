const utils = require('./utils');

/**
 * Gestionnaire d'installations pour DevStarter
 * Gère l'installation des routers, gestionnaires d'état et bibliothèques de style
 */
class InstallationManager {
  /**
   * Installe un gestionnaire d'état
   * @param {object} config - Configuration du projet
   * @param {object} lang - Objet de traduction
   */
  static async installStateManager(config, lang) {
    const { packageManager, stateManager } = config;
    const { managers } = require('../PackageManagers');
    const pm = managers[packageManager];
    const installCommand = this.getStateManagerInstallCommand(stateManager, pm);
    
    if (!installCommand) return;

    console.log(lang.installingStateManager.replace('{stateManager}', stateManager));
    utils.executeCommand(installCommand);
    console.log(lang.stateManagerConfigured.replace('{stateManager}', stateManager));
  }

  /**
   * Retourne la commande d'installation pour un gestionnaire d'état
   * @param {string} stateManager - Gestionnaire d'état choisi
   * @param {object} pm - Objet package manager
   * @returns {string|null} Commande d'installation
   */
  static getStateManagerInstallCommand(stateManager, pm) {
    const commands = {
      'redux': `${pm.install} redux react-redux @reduxjs/toolkit`,
      'mobx': `${pm.install} mobx mobx-react-lite`,
      'recoil': `${pm.install} recoil`,
      'zustand': `${pm.install} zustand`,
      'jotai': `${pm.install} jotai`
    };
    return commands[stateManager];
  }

  /**
   * Installe une bibliothèque de style
   * @param {object} config - Configuration du projet
   * @param {object} lang - Objet de traduction
   */
  static async installStylingLibrary(config, lang) {
    const { packageManager, stylingLibrary } = config;
    const { managers } = require('../PackageManagers');
    const pm = managers[packageManager];
    const installCommand = this.getStylingLibraryInstallCommand(stylingLibrary, pm);

    if (!installCommand) return;

    console.log(lang.installingStylingLibrary.replace('{library}', stylingLibrary));
    utils.executeCommand(installCommand);
    
    // Configuration spéciale pour Tailwind CSS
    if (stylingLibrary === 'tailwind') {
      await this.configureTailwind(lang);
    }
  }

  /**
   * Retourne la commande d'installation pour une bibliothèque de style
   * @param {string} stylingLibrary - Bibliothèque de style choisie
   * @param {object} pm - Objet package manager
   * @returns {string|null} Commande d'installation
   */
  static getStylingLibraryInstallCommand(stylingLibrary, pm) {
    const commands = {
      'styled-components': `${pm.install} styled-components`,
      'emotion': `${pm.install} @emotion/react @emotion/styled`,
      'tailwind': `${pm.install} -D tailwindcss postcss autoprefixer`,
      'sass': `${pm.install} -D sass`,
      'bootstrap': `${pm.install} bootstrap`,
      'pico': `${pm.install} @picocss/pico`,
      'chakra-ui': `${pm.install} @chakra-ui/react @emotion/react @emotion/styled framer-motion`,
      'mantine': `${pm.install} @mantine/core @mantine/hooks`
    };
    return commands[stylingLibrary];
  }

  /**
   * Configure Tailwind CSS
   * @param {object} lang - Objet de traduction
   */
  static async configureTailwind(lang) {
    try {
      utils.executeCommand('npx tailwindcss init -p');
      console.log(lang.tailwindConfigured || 'Tailwind CSS configuration files created.');
    } catch (error) {
      console.error('Error configuring Tailwind CSS:', error.message);
    }
  }

  /**
   * Installe un router
   * @param {object} config - Configuration du projet
   * @param {object} lang - Objet de traduction
   */
  static async installRouter(config, lang) {
    const { packageManager, router } = config;
    const { managers } = require('../PackageManagers');
    const pm = managers[packageManager];
    const installCommand = this.getRouterInstallCommand(router, pm);
    
    if (!installCommand) return;

    const routerName = this.getRouterDisplayName(router, lang);
    console.log(lang.installingRouter.replace('{router}', routerName));
    utils.executeCommand(installCommand);
    console.log(lang.routerInstalled.replace('{router}', routerName));
  }

  /**
   * Retourne la commande d'installation pour un router
   * @param {string} router - Router choisi
   * @param {object} pm - Objet package manager
   * @returns {string|null} Commande d'installation
   */
  static getRouterInstallCommand(router, pm) {
    const commands = {
      'react-router': `${pm.install} react-router-dom`,
      'tanstack-router': `${pm.install} @tanstack/react-router @tanstack/react-router-devtools`,
      'reach-router': `${pm.install} @reach/router`,
      'wouter': `${pm.install} wouter`,
      'hookrouter': `${pm.install} hookrouter`
    };
    return commands[router];
  }

  /**
   * Retourne le nom d'affichage d'un router
   * @param {string} router - Router choisi
   * @param {object} lang - Objet de traduction
   * @returns {string} Nom d'affichage
   */
  static getRouterDisplayName(router, lang) {
    const displayNames = {
      'react-router': 'React Router Dom',
      'tanstack-router': 'TanStack Router',
      'reach-router': 'Reach Router',
      'wouter': 'Wouter',
      'hookrouter': 'Hookrouter'
    };
    return displayNames[router] || router;
  }
}

module.exports = InstallationManager;
