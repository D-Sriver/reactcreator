const { managers, bundlers, getAvailablePackageManagerChoices, detectPreferredPackageManager } = require('./PackageManagers');
const SystemDetector = require('./src/SystemDetector');
const ValidatorManager = require('./src/ValidatorManager');
const { isValidProjectName } = require('./src/utils/utils');
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
  
  // Obtenir les choix de package managers disponibles dynamiquement
  const availablePackageManagers = getAvailablePackageManagerChoices();
  const preferredPackageManager = detectPreferredPackageManager();
  
  // Message informatif sur les package managers détectés
  if (availablePackageManagers.length > 1) {
    console.log(`🔍 Package managers détectés: ${availablePackageManagers.map(pm => pm.value).join(', ')}`);
    console.log(`💡 Recommandé: ${preferredPackageManager} (basé sur les fichiers existants)`);
  }
  
  return [
    {
      type: 'text',
      name: 'projectName',
      message: translations.questions.projectName,
      validate: (name) => {
        const validation = ValidatorManager.validateProjectName(name);
        if (validation.isValid) {
          return true;
        }
        
        const errorMsg = validation.errors.join(', ');
        const suggestion = validation.suggestions.length > 0 ? 
          ` Suggestions: ${validation.suggestions.slice(0, 2).join(', ')}` : '';
        
        return `${errorMsg}${suggestion}`;
      }
    },
    {
      type: 'select',
      name: 'packageManager',
      message: `${translations.questions.packageManager} ${availablePackageManagers.length > 1 ? `(${preferredPackageManager} recommandé)` : ''}`,
      choices: availablePackageManagers,
      initial: availablePackageManagers.findIndex(pm => pm.value === preferredPackageManager) || 0
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
