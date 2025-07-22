const { choices, bundlers } = require('./PackageManagers');
const path = require('path');

// Charger les fichiers de langue
const loadLanguage = (lang) => {
  try {
    return require(path.join(__dirname, 'locales', `${lang}.js`));
  } catch (error) {
    console.error(`Language file for '${lang}' not found, falling back to English.`);
    return require(path.join(__dirname, 'locales', 'en.js'));
  }
};

// Générer les questions pour une langue donnée
const generateQuestions = (lang) => {
  const translations = loadLanguage(lang);
  
  return [
    {
      type: 'text',
      name: 'projectName',
      message: translations.questions.projectName,
      validate: (name) => /^[a-zA-Z0-9-_]+$/.test(name) || translations.validation.projectName
    },
    {
      type: 'select',
      name: 'packageManager',
      message: translations.questions.packageManager,
      choices
    },
    {
      type: 'select',
      name: 'bundler',
      message: translations.questions.bundler,
      choices: bundlers
    },
    {
      type: (prev, values) => values.bundler === 'next' ? null : 'select',
      name: 'framework',
      message: translations.questions.framework,
      choices: Object.entries(translations.options.frameworks).map(([value, title]) => ({
        title,
        value
      }))
    },
    {
      type: 'toggle',
      name: 'useTypeScript',
      message: translations.questions.useTypeScript,
      initial: false,
      active: translations.options.yes,
      inactive: translations.options.no
    },
    {
      type: 'select',
      name: 'stateManager',
      message: translations.questions.stateManager,
      choices: Object.entries(translations.options.stateManagers).map(([value, title]) => ({
        title,
        value
      }))
    },
    {
      type: 'select',
      name: 'stylingLibrary',
      message: translations.questions.stylingLibrary,
      choices: Object.entries(translations.options.stylingLibraries).map(([value, title]) => ({
        title,
        value
      }))
    },
    {
      type: 'toggle',
      name: 'initGit',
      message: translations.questions.initGit,
      initial: true,
      active: translations.options.yes,
      inactive: translations.options.no
    },
    {
      type: (prev, values) => values.framework === 'react' || values.bundler === 'next' ? 'select' : null,
      name: 'router',
      message: translations.questions.router,
      choices: Object.entries(translations.options.routers).map(([value, title]) => ({
        title,
        value
      }))
    }
  ];
};

module.exports = {
  loadLanguage,
  generateQuestions
};
