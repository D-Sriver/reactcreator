const managers = {
  yarn: {
    install: 'yarn',
    run: 'yarn',
    init: 'yarn init -y',
    createVite: 'yarn create vite',
    createReactApp: 'yarn create react-app'
  },
  npm: {
    install: 'npm install',
    run: 'npm run',
    init: 'npm init -y',
    createVite: 'npm create vite@latest',
    createReactApp: 'npx create-react-app'
  },
  pnpm: {
    install: 'pnpm install',
    run: 'pnpm',
    init: 'pnpm init',
    createVite: 'pnpm create vite',
    createReactApp: 'pnpm create react-app'
  },
  bun: {
    install: 'bun install',
    run: 'bun run',
    init: 'bun init',
    createVite: 'bun create vite',
    createReactApp: 'bun create react-app'
  }
};

const choices = Object.keys(managers).map(key => ({ title: key, value: key }));

const bundlers = [
  { title: 'Create React App', value: 'cra' },
  { title: 'Vite', value: 'vite' }
];

module.exports = {
  managers,
  choices,
  bundlers
};