const { choices, bundlers } = require('./PackageManagers');

// Fonction pour valider le nom du projet
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
    ]
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
    ]
  }
};
