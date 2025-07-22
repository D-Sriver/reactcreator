/**
 * Utilitaires généraux pour DevStarter
 * Fonctions d'aide et helpers communs
 */

const { execSync } = require('child_process');

/**
 * Exécute une commande système de manière synchrone
 * @param {string} command - Commande à exécuter
 * @param {Object} options - Options pour execSync
 * @returns {string|null} - Sortie de la commande ou null en cas d'erreur
 */
function executeCommand(command, options = {}) {
  const defaultOptions = {
    stdio: 'inherit',
    encoding: 'utf8',
    ...options
  };
  
  try {
    const result = execSync(command, defaultOptions);
    return result;
  } catch (error) {
    console.error(`Erreur lors de l'exécution de la commande: ${command}`);
    console.error(error.message);
    return null;
  }
}

/**
 * Vérifie si une commande existe sur le système
 * @param {string} command - Commande à vérifier
 * @returns {boolean} - True si la commande existe
 */
function commandExists(command) {
  try {
    const checkCommand = process.platform === 'win32' ? 'where' : 'which';
    execSync(`${checkCommand} ${command}`, { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Formate un nom de projet (alias pour sanitizeProjectName)
 * @param {string} name - Nom à formater
 * @returns {string} - Nom formaté
 */
function formatProjectName(name) {
  return sanitizeProjectName(name);
}

/**
 * Valide si une chaîne est un nom de projet valide
 * @param {string} name - Nom du projet à valider
 * @returns {boolean} - True si valide
 */
function isValidProjectName(name) {
  if (!name || typeof name !== 'string') return false;
  
  // Vérifier que le nom contient uniquement des caractères autorisés
  const validPattern = /^[a-zA-Z0-9\-_]+$/;
  return validPattern.test(name) && name.length >= 1 && name.length <= 50;
}

/**
 * Nettoie et normalise un nom de projet
 * @param {string} name - Nom à nettoyer
 * @returns {string} - Nom nettoyé
 */
function sanitizeProjectName(name) {
  if (!name) return '';
  
  return name
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\-_]/g, '-') // Remplacer caractères invalides par -
    .replace(/-+/g, '-') // Fusionner les tirets multiples
    .replace(/^-+|-+$/g, ''); // Supprimer tirets en début/fin
}

/**
 * Génère un nom de projet unique si le nom existe déjà
 * @param {string} baseName - Nom de base
 * @param {Function} existsChecker - Fonction pour vérifier l'existence
 * @returns {string} - Nom unique
 */
function generateUniqueName(baseName, existsChecker) {
  let name = baseName;
  let counter = 1;
  
  while (existsChecker(name)) {
    name = `${baseName}-${counter}`;
    counter++;
  }
  
  return name;
}

/**
 * Convertit une taille en octets en format lisible
 * @param {number} bytes - Taille en octets
 * @returns {string} - Taille formatée
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Convertit une durée en millisecondes en format lisible
 * @param {number} ms - Durée en millisecondes
 * @returns {string} - Durée formatée
 */
function formatDuration(ms) {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}m ${seconds}s`;
}

/**
 * Capitalise la première lettre d'une chaîne
 * @param {string} str - Chaîne à capitaliser
 * @returns {string} - Chaîne capitalisée
 */
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Vérifie si un objet est vide
 * @param {Object} obj - Objet à vérifier
 * @returns {boolean} - True si vide
 */
function isEmpty(obj) {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
}

/**
 * Crée un délai asynchrone
 * @param {number} ms - Délai en millisecondes
 * @returns {Promise} - Promise qui se résout après le délai
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Génère un identifiant unique simple
 * @returns {string} - Identifiant unique
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Clone profondément un objet
 * @param {*} obj - Objet à cloner
 * @returns {*} - Clone de l'objet
 */
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === 'object') {
    const cloned = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }
  return obj;
}

/**
 * Extrait l'extension d'un nom de fichier
 * @param {string} filename - Nom du fichier
 * @returns {string} - Extension (sans le point)
 */
function getFileExtension(filename) {
  if (!filename || typeof filename !== 'string') return '';
  const lastDot = filename.lastIndexOf('.');
  return lastDot === -1 ? '' : filename.slice(lastDot + 1);
}

/**
 * Vérifie si une URL est valide
 * @param {string} url - URL à vérifier
 * @returns {boolean} - True si valide
 */
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

module.exports = {
  executeCommand,
  commandExists,
  formatProjectName,
  isValidProjectName,
  sanitizeProjectName,
  generateUniqueName,
  formatFileSize,
  formatDuration,
  capitalize,
  isEmpty,
  sleep,
  generateId,
  deepClone,
  getFileExtension,
  isValidUrl
};
