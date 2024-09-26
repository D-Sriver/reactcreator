const managers = {
  npm: {
    install: 'npm install',
    run: 'npm run',
    init: 'npm init -y',
    createVite: 'npm create vite@latest'
  },
  yarn: {
    install: 'yarn',
    run: 'yarn',
    init: 'yarn init -y',
    createVite: 'yarn create vite'
  },
  pnpm: {
    install: 'pnpm install',
    run: 'pnpm',
    init: 'pnpm init',
    createVite: 'pnpm create vite'
  },
  bun: {
    install: 'bun install',
    run: 'bun run',
    init: 'bun init',
    createVite: 'bun create vite'
  }
};

const choices = Object.keys(managers).map(key => ({ title: key, value: key }));

const bundlers = [
  { title: 'Vite', value: 'vite' },
  { title: 'Create React App', value: 'cra' }
];

module.exports = {
  managers,
  choices,
  bundlers
};