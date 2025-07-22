const fs = require('fs');
const path = require('path');
const { isValidProjectName, sanitizeProjectName } = require('./utils/utils');
const SystemDetector = require('./SystemDetector');

/**
 * Gestionnaire de validation pour DevStarter
 * Centralise toutes les validations de projet et de système
 */
class ValidatorManager {
  /**
   * Valide un nom de projet et fournit des suggestions si nécessaire
   * @param {string} name - Nom du projet à valider
   * @returns {Object} - Résultat de validation avec suggestions
   */
  static validateProjectName(name) {
    const result = {
      isValid: false,
      originalName: name,
      sanitizedName: '',
      suggestions: [],
      errors: []
    };

    if (!name || typeof name !== 'string') {
      result.errors.push('Le nom du projet est requis');
      return result;
    }

    // Nettoyer le nom
    result.sanitizedName = sanitizeProjectName(name);

    // Vérifier la validité
    if (isValidProjectName(result.sanitizedName)) {
      result.isValid = true;
    } else {
      result.errors.push('Le nom du projet contient des caractères invalides');
      
      // Générer des suggestions
      if (result.sanitizedName) {
        result.suggestions.push(result.sanitizedName);
      }
      result.suggestions.push(`my-project-${Date.now()}`);
      result.suggestions.push('awesome-app');
    }

    return result;
  }

  /**
   * Vérifie si un répertoire de projet existe déjà
   * @param {string} projectPath - Chemin du projet
   * @returns {Object} - Statut d'existence avec détails
   */
  static checkProjectExists(projectPath) {
    const result = {
      exists: false,
      path: projectPath,
      isEmpty: false,
      canOverwrite: false,
      contents: []
    };

    try {
      result.exists = fs.existsSync(projectPath);
      
      if (result.exists) {
        const stats = fs.statSync(projectPath);
        
        if (stats.isDirectory()) {
          const contents = fs.readdirSync(projectPath);
          result.contents = contents;
          result.isEmpty = contents.length === 0;
          
          // Un dossier peut être écrasé s'il est vide ou contient seulement des fichiers cachés
          result.canOverwrite = result.isEmpty || 
            contents.every(file => file.startsWith('.'));
        }
      }
    } catch (error) {
      // Si on ne peut pas lire le dossier, on considère qu'on ne peut pas l'écraser
      result.canOverwrite = false;
    }

    return result;
  }

  /**
   * Valide la configuration système requise
   * @param {Object} requirements - Exigences minimales
   * @returns {Object} - Rapport de validation système
   */
  static validateSystemRequirements(requirements = {}) {
    const defaultRequirements = {
      nodeVersion: '14.0.0',
      gitRequired: false,
      packageManagers: ['npm'], // Au moins un de ces package managers
      ...requirements
    };

    const systemReport = SystemDetector.generateSystemReport();
    const result = {
      isValid: true,
      errors: [],
      warnings: [],
      systemReport,
      requirements: defaultRequirements
    };

    // Vérifier Node.js
    if (!systemReport.node.available) {
      result.isValid = false;
      result.errors.push('Node.js n\'est pas installé');
    } else if (!systemReport.node.satisfiesMinimum) {
      result.isValid = false;
      result.errors.push(`Node.js ${defaultRequirements.nodeVersion}+ requis, ${systemReport.node.version} détecté`);
    }

    // Vérifier Git si requis
    if (defaultRequirements.gitRequired && !systemReport.git.available) {
      result.isValid = false;
      result.errors.push('Git est requis mais n\'est pas installé');
    }

    // Vérifier les package managers
    const hasRequiredPM = defaultRequirements.packageManagers.some(pm => 
      systemReport.packageManagers.available.includes(pm)
    );
    
    if (!hasRequiredPM) {
      result.isValid = false;
      result.errors.push(`Aucun package manager requis trouvé: ${defaultRequirements.packageManagers.join(', ')}`);
    }

    // Avertissements
    if (systemReport.packageManagers.available.length === 1) {
      result.warnings.push('Un seul package manager détecté. Considérez installer yarn ou pnpm pour plus d\'options.');
    }

    return result;
  }

  /**
   * Valide une configuration de projet complète
   * @param {Object} config - Configuration du projet
   * @returns {Object} - Résultat de validation complète
   */
  static validateProjectConfig(config) {
    const result = {
      isValid: true,
      errors: [],
      warnings: [],
      suggestions: []
    };

    // Valider le nom
    const nameValidation = this.validateProjectName(config.name);
    if (!nameValidation.isValid) {
      result.isValid = false;
      result.errors.push(...nameValidation.errors);
      result.suggestions.push(...nameValidation.suggestions);
    }

    // Valider le chemin
    if (config.path) {
      const pathCheck = this.checkProjectExists(config.path);
      if (pathCheck.exists && !pathCheck.canOverwrite) {
        result.isValid = false;
        result.errors.push(`Le dossier ${config.path} existe déjà et n'est pas vide`);
        result.suggestions.push(`${config.path}-new`, `${config.path}-${Date.now()}`);
      }
    }

    // Valider le framework
    if (!config.framework) {
      result.errors.push('Un framework doit être sélectionné');
      result.isValid = false;
    }

    // Valider le package manager
    if (config.packageManager) {
      const available = SystemDetector.detectAvailablePackageManagers();
      if (!available.includes(config.packageManager)) {
        result.errors.push(`Package manager ${config.packageManager} n'est pas installé`);
        result.isValid = false;
        result.suggestions.push(`Installer ${config.packageManager} ou choisir: ${available.join(', ')}`);
      }
    }

    return result;
  }

  /**
   * Génère un rapport de validation complet pour le démarrage
   * @param {Object} config - Configuration complète
   * @returns {Object} - Rapport détaillé
   */
  static generateStartupValidationReport(config = {}) {
    const report = {
      timestamp: new Date().toISOString(),
      systemValidation: this.validateSystemRequirements(),
      projectValidation: config.name ? this.validateProjectConfig(config) : null,
      canProceed: false,
      recommendations: []
    };

    // Déterminer si on peut procéder
    report.canProceed = report.systemValidation.isValid && 
      (!report.projectValidation || report.projectValidation.isValid);

    // Générer des recommandations
    if (!report.canProceed) {
      report.recommendations.push('Résolvez les erreurs avant de continuer');
    }

    if (report.systemValidation.warnings.length > 0) {
      report.recommendations.push(...report.systemValidation.warnings);
    }

    // Recommandations basées sur le système détecté
    const systemReport = report.systemValidation.systemReport;
    if (systemReport.packageManagers.available.includes('bun')) {
      report.recommendations.push('Bun détecté - excellent choix pour la performance !');
    }
    if (systemReport.packageManagers.available.includes('pnpm')) {
      report.recommendations.push('pnpm détecté - idéal pour économiser l\'espace disque');
    }

    return report;
  }

  /**
   * Affiche un rapport de validation de manière formatée
   * @param {Object} report - Rapport à afficher
   * @param {Object} [DesignManager] - Module d'affichage optionnel
   */
  static displayValidationReport(report, DesignManager = null) {
    const display = DesignManager || console;
    
    if (DesignManager) {
      if (report.canProceed) {
        DesignManager.displaySuccess('✅ Validation système réussie !');
      } else {
        DesignManager.displayError('❌ Problèmes de validation détectés');
      }

      // Afficher les erreurs
      if (report.systemValidation.errors.length > 0) {
        DesignManager.displayError('Erreurs système:');
        report.systemValidation.errors.forEach(error => 
          DesignManager.displayError(`  • ${error}`)
        );
      }

      if (report.projectValidation?.errors.length > 0) {
        DesignManager.displayError('Erreurs projet:');
        report.projectValidation.errors.forEach(error => 
          DesignManager.displayError(`  • ${error}`)
        );
      }

      // Afficher les recommandations
      if (report.recommendations.length > 0) {
        DesignManager.displayInfo('💡 Recommandations:');
        report.recommendations.forEach(rec => 
          DesignManager.displayInfo(`  • ${rec}`)
        );
      }
    } else {
      console.log(report.canProceed ? '✅ Validation réussie' : '❌ Validation échouée');
      console.log('Rapport:', JSON.stringify(report, null, 2));
    }

    return report;
  }
}

module.exports = ValidatorManager;
