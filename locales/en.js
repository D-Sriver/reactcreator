module.exports = {
  welcome: 'Welcome to DevStarter!',
  error: 'An error occurred:',
  cancelled: 'Operation cancelled.',
  creatingProject: 'Creating project {projectName} with {packageManager} and {bundler}{withTypeScript}...',
  withTypeScript: ' using TypeScript',
  withoutTypeScript: ' without TypeScript',
  installingDependencies: 'Installing dependencies...',
  projectCreated: 'Project {projectName} created successfully!',
  initializingGit: 'Initializing Git repository...',
  gitInitialized: 'Git repository successfully initialized.',
  gitInitError: 'Error initializing Git repository:',
  installingStateManager: 'Installing state manager {stateManager}...',
  stateManagerConfigured: 'The state manager {stateManager} has been successfully configured.',
  installingStylingLibrary: 'Installing styling library {library}...',
  installingRouter: 'Installing routing library {router}...',
  routerInstalled: '{router} installed successfully.',
  tailwindConfigured: 'Tailwind CSS configuration files created.',
  projectSummary: '\n=== Project Summary ===',
  summaryTemplate: 'Project: {projectName}\nPackage Manager: {packageManager}\nBundler: {bundler}\nFramework: {framework}\nLanguage: {language}',
  summaryStateManager: 'State manager: {stateManager}',
  summaryStylingLibrary: 'Styling library: {stylingLibrary}',
  summaryAdditionalFeatures: 'Additional features:',
  summaryGit: 'Git repository initialized',
  summaryRouter: 'Routing library: {router}',
  startCommand: 'Start command: {command}',
  
  // Questions
  questions: {
    projectName: 'What is the name of your project?',
    packageManager: 'Which package manager do you want to use?',
    bundler: 'Which bundler do you want to use?',
    framework: 'Which framework do you want to use?',
    useTypeScript: 'Do you want to use TypeScript?',
    stateManager: 'Which state manager do you want to use?',
    stylingLibrary: 'Which styling library do you want to install?',
    initGit: 'Do you want to initialize a Git repository?',
    router: 'Which routing library do you want to install?'
  },

  // Options
  options: {
    yes: 'Yes',
    no: 'No',
    none: 'None',
    stateManagers: {
      none: 'None',
      redux: 'Redux Toolkit',
      mobx: 'MobX',
      recoil: 'Recoil',
      zustand: 'Zustand'
    },
    stylingLibraries: {
      none: 'None',
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
      none: 'None',
      'react-router': 'React Router Dom',
      'tanstack-router': 'TanStack Router',
      'reach-router': 'Reach Router (deprecated)',
      'wouter': 'Wouter',
      'hookrouter': 'Hookrouter'
    }
  },

  // Validation
  validation: {
    projectName: 'The project name should only contain letters, numbers, hyphens, and underscores.'
  }
};
