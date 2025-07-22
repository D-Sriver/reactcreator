const InstallationManager = require('./InstallationManager');
const ProjectCreator = require('./ProjectCreator');

/**
 * Gestionnaire d'affichage des résumés de projet pour DevStarter
 */
class ProjectSummary {
  /**
   * Affiche le résumé complet du projet créé
   * @param {object} config - Configuration du projet
   * @param {object} lang - Objet de traduction
   */
  static display(config, lang) {
    console.log('\n' + '='.repeat(50));
    console.log(lang.projectSummary);
    console.log('='.repeat(50));
    console.log(this.generate(config, lang));
    console.log('='.repeat(50) + '\n');
  }

  /**
   * Génère le contenu du résumé de projet
   * @param {object} config - Configuration du projet
   * @param {object} lang - Objet de traduction
   * @returns {string} Résumé formaté
   */
  static generate(config, lang) {
    const sections = [];

    // Section principale
    sections.push(this.getMainSection(config, lang));

    // Section des fonctionnalités
    const features = this.getFeaturesSections(config, lang);
    if (features.length > 0) {
      sections.push('');
      sections.push(lang.featuresTitle || '📦 Features:');
      sections.push(...features);
    }

    // Section des commandes
    sections.push('');
    sections.push(lang.commandsTitle || '🚀 Commands:');
    sections.push(this.getCommandsSection(config, lang));

    return sections.join('\n');
  }

  /**
   * Génère la section principale du résumé
   * @param {object} config - Configuration du projet
   * @param {object} lang - Objet de traduction
   * @returns {string} Section principale
   */
  static getMainSection(config, lang) {
    return lang.summaryTemplate
      .replace('{projectName}', config.projectName)
      .replace('{packageManager}', config.packageManager)
      .replace('{bundler}', config.bundler)
      .replace('{framework}', config.framework)
      .replace('{language}', config.useTypeScript ? 'TypeScript' : 'JavaScript');
  }

  /**
   * Génère les sections de fonctionnalités
   * @param {object} config - Configuration du projet
   * @param {object} lang - Objet de traduction
   * @returns {array} Liste des sections de fonctionnalités
   */
  static getFeaturesSections(config, lang) {
    const features = [];

    if (config.stateManager !== 'none') {
      features.push(`  • ${lang.summaryStateManager.replace('{stateManager}', config.stateManager)}`);
    }

    if (config.stylingLibrary !== 'none') {
      features.push(`  • ${lang.summaryStylingLibrary.replace('{stylingLibrary}', config.stylingLibrary)}`);
    }

    if (config.router && config.router !== 'none') {
      const routerName = InstallationManager.getRouterDisplayName(config.router, lang);
      features.push(`  • ${lang.summaryRouter.replace('{router}', routerName)}`);
    }

    if (config.initGit) {
      features.push(`  • ${lang.summaryGit}`);
    }

    return features;
  }

  /**
   * Génère la section des commandes
   * @param {object} config - Configuration du projet
   * @param {object} lang - Objet de traduction
   * @returns {string} Section des commandes
   */
  static getCommandsSection(config, lang) {
    const startCommand = ProjectCreator.getStartCommand(config);
    const commands = [
      `  cd ${config.projectName}`,
      `  ${startCommand}`,
    ];

    return commands.join('\n');
  }

  /**
   * Génère la section des prochaines étapes
   * @param {object} config - Configuration du projet
   * @param {object} lang - Objet de traduction
   * @returns {string} Section des prochaines étapes
   */
  static getNextStepsSection(config, lang) {
    const steps = [];

    // Étapes spécifiques aux fonctionnalités
    if (config.router && config.router !== 'none') {
      steps.push(`  4. ${lang.stepRouter || 'Configure your router in src/App.js'}`);
    }

    if (config.stateManager !== 'none') {
      steps.push(`  5. ${lang.stepStateManager || 'Set up your state management'}`);
    }

    if (config.stylingLibrary === 'tailwind') {
      steps.push(`  6. ${lang.stepTailwind || 'Configure Tailwind in your CSS files'}`);
    }

    return steps.join('\n');
  }

  /**
   * Affiche des conseils et astuces
   * @param {object} config - Configuration du projet
   * @param {object} lang - Objet de traduction
   */
  static displayTips(config, lang) {
    console.log('\n' + '💡 ' + (lang.tipsTitle || 'Tips & Tricks:'));
    
    const tips = this.getTips(config, lang);
    tips.forEach(tip => console.log(`   ${tip}`));
  }

  /**
   * Génère une liste de conseils basés sur la configuration
   * @param {object} config - Configuration du projet
   * @param {object} lang - Objet de traduction
   * @returns {array} Liste des conseils
   */
  static getTips(config, lang) {
    const tips = [];

    if (config.useTypeScript) {
      tips.push(lang.tipTypeScript || 'Use TypeScript for better type safety and developer experience');
    }

    if (config.bundler === 'vite') {
      tips.push(lang.tipVite || 'Vite offers fast HMR and excellent dev experience');
    }

    if (config.stateManager === 'zustand') {
      tips.push(lang.tipZustand || 'Zustand is lightweight and easy to use for state management');
    }

    if (config.stylingLibrary === 'tailwind') {
      tips.push(lang.tipTailwind || 'Use Tailwind CSS classes directly in your components');
    }

    return tips;
  }
}

module.exports = ProjectSummary;
