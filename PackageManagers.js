const managers = {
  yarn: {
    install: 'yarn',
    run: 'yarn',
    init: 'yarn init -y',
    createVite: 'yarn create vite',
    createReactApp: 'yarn create react-app',
    createNext: 'yarn create next-app'
  },
  npm: {
    install: 'npm install',
    run: 'npm run',
    init: 'npm init -y',
    createVite: 'npm create vite@latest',
    createReactApp: 'npx create-react-app',
    createNext: 'npx create-next-app'
  },
  pnpm: {
    install: 'pnpm install',
    run: 'pnpm',
    init: 'pnpm init',
    createVite: 'pnpm create vite',
    createReactApp: 'pnpm create react-app',
    createNext: 'pnpm create next-app'
  },
  bun: {
    install: 'bun install',
    run: 'bun run',
    init: 'bun init',
    createVite: 'bun create vite',
    createReactApp: 'bun create react-app',
    createNext: 'bunx create-next-app'
  }
};

const choices = Object.keys(managers).map(key => ({ title: key, value: key }));

const bundlers = [
  { title: 'Create React App', value: 'cra' },
  { title: 'Vite', value: 'vite' },
  { title: 'Next.js', value: 'next' }
];

module.exports = {
  managers,
  choices,
  bundlers
};