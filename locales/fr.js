module.exports = {
  welcome: 'Bienvenue dans DevStarter !',
  error: 'Une erreur est survenue :',
  cancelled: 'Opération annulée.',
  creatingProject: 'Création du projet {projectName} avec {packageManager} et {bundler}{withTypeScript}...',
  withTypeScript: ' en utilisant TypeScript',
  withoutTypeScript: ' sans TypeScript',
  installingDependencies: 'Installation des dépendances...',
  projectCreated: 'Projet {projectName} créé avec succès !',
  initializingGit: 'Initialisation du dépôt Git...',
  gitInitialized: 'Dépôt Git initialisé avec succès.',
  gitInitError: 'Erreur lors de l\'initialisation du dépôt Git :',
  installingStateManager: 'Installation du gestionnaire d\'état {stateManager}...',
  stateManagerConfigured: 'Le gestionnaire d\'état {stateManager} a été configuré avec succès.',
  installingStylingLibrary: 'Installation de la bibliothèque de styles {library}...',
  installingRouter: 'Installation de la bibliothèque de routage {router}...',
  routerInstalled: '{router} installé avec succès.',
  tailwindConfigured: 'Fichiers de configuration Tailwind CSS créés.',
  projectSummary: '\n=== Récapitulatif du projet ===',
  summaryTemplate: 'Projet : {projectName}\nGestionnaire de paquets : {packageManager}\nBundler : {bundler}\nFramework : {framework}\nLangage : {language}',
  summaryStateManager: 'Gestionnaire d\'état : {stateManager}',
  summaryStylingLibrary: 'Bibliothèque de styles : {stylingLibrary}',
  summaryAdditionalFeatures: 'Fonctionnalités additionnelles :',
  summaryGit: 'Dépôt Git initialisé',
  summaryRouter: 'Bibliothèque de routage : {router}',
  startCommand: 'Commande de démarrage : {command}',
  
  // Questions
  questions: {
    projectName: 'Quel est le nom de votre projet ?',
    packageManager: 'Quel gestionnaire de paquets voulez-vous utiliser ?',
    bundler: 'Quel bundler voulez-vous utiliser ?',
    framework: 'Quel framework voulez-vous utiliser ?',
    useTypeScript: 'Voulez-vous utiliser TypeScript ?',
    stateManager: 'Quel gestionnaire d\'état voulez-vous utiliser ?',
    stylingLibrary: 'Quelle bibliothèque de styles voulez-vous installer ?',
    initGit: 'Voulez-vous initialiser un dépôt Git ?',
    router: 'Quelle bibliothèque de routage voulez-vous installer ?'
  },

  // Options
  options: {
    yes: 'Oui',
    no: 'Non',
    none: 'Aucun',
    stateManagers: {
      none: 'Aucun',
      redux: 'Redux Toolkit',
      mobx: 'MobX',
      recoil: 'Recoil',
      zustand: 'Zustand'
    },
    stylingLibraries: {
      none: 'Aucune',
      'styled-components': 'Styled-components',
      emotion: 'Emotion',
      tailwind: 'Tailwind CSS',
      sass: 'SASS/SCSS',
      bootstrap: 'Bootstrap',
      pico: 'Pico CSS'
    },
    frameworks: {
      react: 'React',
      vue: 'Vue',
      preact: 'Preact',
      lit: 'Lit',
      svelte: 'Svelte',
      solid: 'Solid',
      qwik: 'Qwik',
      vanilla: 'Vanilla'
    },
    routers: {
      none: 'Aucune',
      'react-router': 'React Router Dom',
      'tanstack-router': 'TanStack Router',
      'reach-router': 'Reach Router (déprécié)',
      'wouter': 'Wouter',
      'hookrouter': 'Hookrouter'
    }
  },

  // Validation
  validation: {
    projectName: 'Le nom du projet ne doit contenir que des lettres, des chiffres, des tirets et des underscores.'
  }
};
