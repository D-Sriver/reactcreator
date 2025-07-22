const SystemDetector = require('./src/SystemDetector');

const managers = {
  npm: {
    name: 'npm',
    lockFile: 'package-lock.json',
    install: 'npm install',
    run: 'npm run',
    init: 'npm init -y',
    createVite: 'npm create vite@latest',
    createReactApp: 'npx create-react-app',
    createNext: 'npx create-next-app'
  },
  yarn: {
    name: 'yarn',
    lockFile: 'yarn.lock',
    install: 'yarn',
    run: 'yarn',
    init: 'yarn init -y',
    createVite: 'yarn create vite',
    createReactApp: 'yarn create react-app',
    createNext: 'yarn create next-app'
  },
  pnpm: {
    name: 'pnpm',
    lockFile: 'pnpm-lock.yaml',
    install: 'pnpm install',
    run: 'pnpm',
    init: 'pnpm init',
    createVite: 'pnpm create vite',
    createReactApp: 'pnpm create react-app',
    createNext: 'pnpm create next-app'
  },
  bun: {
    name: 'bun',
    lockFile: 'bun.lockb',
    install: 'bun install',
    run: 'bun run',
    init: 'bun init',
    createVite: 'bun create vite',
    createReactApp: 'bun create react-app',
    createNext: 'bunx create-next-app'
  }
};

// Configuration des bundlers disponibles
const bundlers = [
  { title: 'Create React App (deprecated)', value: 'cra' },
  { title: 'Vite', value: 'vite' },
  { title: 'Next.js', value: 'next' }
];

// Wrapper functions pour utiliser SystemDetector avec l'ancienne API
function detectAvailablePackageManagers() {
  return SystemDetector.detectAvailablePackageManagers();
}

function getAvailablePackageManagerChoices() {
  return SystemDetector.getAvailablePackageManagerChoices();
}

function detectPreferredPackageManager() {
  return SystemDetector.detectPreferredPackageManager();
}

function isCommandAvailable(command) {
  return SystemDetector.isCommandAvailable(command);
}

// Générer les choix basés sur les package managers disponibles
const choices = getAvailablePackageManagerChoices();

module.exports = {
  managers,
  choices,
  bundlers,
  detectAvailablePackageManagers,
  getAvailablePackageManagerChoices,
  detectPreferredPackageManager,
  isCommandAvailable
};