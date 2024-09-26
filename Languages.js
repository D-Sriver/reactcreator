const { choices, bundlers } = require('./PackageManagers');

module.exports = {
  fr: {
    welcome: 'Bienvenue dans ReactCreator !',
    error: 'Une erreur est survenue :',
    questions: [
      {
        type: 'text',
        name: 'projectName',
        message: 'Quel est le nom de votre projet ?'
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
    questions: [
      {
        type: 'text',
        name: 'projectName',
        message: 'What is the name of your project?'
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
