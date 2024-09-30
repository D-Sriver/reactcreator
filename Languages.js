const { choices, bundlers } = require('./PackageManagers');

module.exports = {
  fr: {
    welcome: 'Bienvenue dans ReactCreator !',
    error: 'Une erreur est survenue :',
    useTypeScript: 'Voulez-vous utiliser TypeScript ?',
    creatingProject: 'Création du projet {projectName} avec {packageManager} et {bundler}{withTypeScript}...',
    invalidProjectName: 'Le nom du projet ne doit contenir que des lettres, des chiffres, des tirets et des underscores.',
    withTypeScript: ' en utilisant TypeScript',
    withoutTypeScript: ' sans TypeScript',
    questions: [
      {
        type: 'text',
        name: 'projectName',
        message: 'Quel est le nom de votre projet ?',
        validate: (name) => /^[a-zA-Z0-9-_]+$/.test(name) || 'Le nom du projet ne doit contenir que des lettres, des chiffres, des tirets et des underscores.'
      },
      {
        type: 'select',
        name: 'packageManager',
        message: 'Quel gestionnaire de paquets voulez-vous utiliser ?',
        choices
      },
      {
        type: 'select',
        name: 'bundler',
        message: 'Quel bundler voulez-vous utiliser ?',
        choices: bundlers
      }
    ],
    installingDependencies: 'Installation des dépendances...',
    projectCreated: 'Projet {projectName} créé avec succès !',
    startCommand: 'Pour démarrer votre projet, exécutez : {command}',
    additionalPrompts: 'Des invites supplémentaires peuvent apparaître. Veuillez sélectionner React et TypeScript si demandé.',
    selectingReact: 'Sélection automatique de React...',
    selectingTypeScript: 'Sélection automatique de TypeScript...',
    chooseFramework: 'Quel framework voulez-vous utiliser ?',
    initGit: 'Voulez-vous initialiser un dépôt Git ?',
    chooseStateManager: 'Quel gestionnaire d\'état voulez-vous utiliser ?',
    chooseStylingLibrary: 'Quelle bibliothèque de styles voulez-vous installer ?',
    setupTests: 'Voulez-vous générer une structure de base pour les tests ?',
    setupCI: 'Voulez-vous générer des fichiers de configuration pour CI (GitHub Actions) ?',
    setupDocker: 'Voulez-vous configurer un environnement Docker ?',
    installDevTools: 'Voulez-vous installer des outils de développement ?',
    installReactRouter: 'Voulez-vous installer React Router Dom ?',
    yes: 'Oui',
    no: 'Non',
    none: 'Aucun',
    installingStylingLibrary: 'Installation de la bibliothèque de styles {library}...',
    invalidBundler: 'Bundler non valide sélectionné.',
    executingCommand: 'Exécution de la commande :',
    initializingGit: 'Initialisation du dépôt Git...',
    gitInitialized: 'Dépôt Git initialisé avec succès.',
    gitInitError: 'Erreur lors de l\'initialisation du dépôt Git :',
    finalizingProjectSetup: "Finalisation de la configuration du projet...",
    nextOnlySupportsReact: "Next.js ne supporte que React comme framework.",
    nextUsingReact: "Next.js utilise React par défaut.",
  },
  en: {
    welcome: 'Welcome to ReactCreator!',
    error: 'An error occurred:',
    useTypeScript: 'Do you want to use TypeScript?',
    creatingProject: 'Creating project {projectName} with {packageManager} and {bundler}{withTypeScript}...',
    invalidProjectName: 'The project name should only contain letters, numbers, hyphens, and underscores.',
    withTypeScript: ' using TypeScript',
    withoutTypeScript: ' without TypeScript',
    questions: [
      {
        type: 'text',
        name: 'projectName',
        message: 'What is the name of your project?',
        validate: (name) => /^[a-zA-Z0-9-_]+$/.test(name) || 'The project name should only contain letters, numbers, hyphens, and underscores.'
      },
      {
        type: 'select',
        name: 'packageManager',
        message: 'Which package manager do you want to use?',
        choices
      },
      {
        type: 'select',
        name: 'bundler',
        message: 'Which bundler do you want to use?',
        choices: bundlers
      }
    ],
    installingDependencies: 'Installing dependencies...',
    projectCreated: 'Project {projectName} created successfully!',
    startCommand: 'To start your project, run: {command}',
    additionalPrompts: 'Additional prompts may appear. Please select React and TypeScript if prompted.',
    selectingReact: 'Automatically selecting React...',
    selectingTypeScript: 'Automatically selecting TypeScript...',
    chooseFramework: 'Which framework do you want to use?',
    initGit: 'Do you want to initialize a Git repository?',
    chooseStateManager: 'Which state manager do you want to use?',
    chooseStylingLibrary: 'Which styling library do you want to install?',
    setupTests: 'Do you want to generate a basic structure for tests?',
    setupCI: 'Do you want to generate configuration files for CI (GitHub Actions)?',
    setupDocker: 'Do you want to configure a Docker environment?',
    installDevTools: 'Do you want to install development tools?',
    installReactRouter: 'Do you want to install React Router Dom?',
    yes: 'Yes',
    no: 'No',
    none: 'None',
    installingStylingLibrary: 'Installing styling library {library}...',
    invalidBundler: 'Invalid bundler selected.',
    executingCommand: 'Executing command:',
    initializingGit: 'Initializing Git repository...',
    gitInitialized: 'Git repository successfully initialized.',
    gitInitError: 'Error initializing Git repository:',
    finalizingProjectSetup: "Finalizing project setup...",
    nextOnlySupportsReact: "Next.js only supports React as a framework.",
    nextUsingReact: "Next.js uses React by default.",
  }
};
