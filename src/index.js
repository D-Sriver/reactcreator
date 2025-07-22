/**
 * Point d'entrée principal pour les modules DevStarter
 * Exporte tous les gestionnaires et utilitaires
 */

// Gestionnaires principaux
const SystemDetector = require('./SystemDetector');
const ValidatorManager = require('./ValidatorManager');
const DesignManager = require('./DesignManager');
const ProjectCreator = require('./ProjectCreator');
const GitManager = require('./GitManager');
const InstallationManager = require('./InstallationManager');
const ProjectSummary = require('./ProjectSummary');

// Utilitaires
const utils = require('./utils/utils');

// Configuration
const config = require('./config');

module.exports = {
  // Gestionnaires
  SystemDetector,
  ValidatorManager,
  DesignManager,
  ProjectCreator,
  GitManager,
  InstallationManager,
  ProjectSummary,
  
  // Utilitaires
  utils,
  
  // Configuration
  config,
  
  // Fonction d'aide pour initialiser le système
  async initialize(options = {}) {
    const {
      validateSystem = true,
      displayReport = true,
      DesignManager: designModule = null
    } = options;

    const results = {
      systemReport: null,
      validationReport: null,
      isReady: false
    };

    try {
      // Générer le rapport système
      results.systemReport = SystemDetector.generateSystemReport();
      
      if (validateSystem) {
        // Valider les exigences système
        results.validationReport = ValidatorManager.validateSystemRequirements();
        results.isReady = results.validationReport.isValid;
        
        if (displayReport && designModule) {
          ValidatorManager.displayValidationReport(results.validationReport, designModule);
        }
      } else {
        results.isReady = true;
      }

      return results;
    } catch (error) {
      console.error('Erreur lors de l\'initialisation:', error);
      results.isReady = false;
      return results;
    }
  },

  // Fonction d'aide pour créer un projet complet
  async createProject(config, options = {}) {
    const {
      validate = true,
      dryRun = false,
      verbose = false,
      DesignManager: designModule = null
    } = options;

    if (validate) {
      const validation = ValidatorManager.validateProjectConfig(config);
      if (!validation.isValid) {
        throw new Error(`Configuration invalide: ${validation.errors.join(', ')}`);
      }
    }

    // Ici on appellerait ProjectCreator avec la configuration validée
    if (verbose && designModule) {
      designModule.displayInfo(`${dryRun ? 'Simulation' : 'Création'} du projet: ${config.name}`);
    }

    return {
      success: true,
      config,
      dryRun,
      // Résultats de création seraient ici
    };
  }
};
