import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Environnement de test
    environment: 'node',
    
    // Patterns de fichiers de test
    include: ['**/tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    
    // Configuration du coverage
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: [
        'coverage/**',
        'dist/**',
        '**/__tests__/**',
        '**/*.config.*',
        '**/*.d.ts',
        'DevStarter'  // Script principal
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    },
    
    // Configuration pour les tests d'intégration
    testTimeout: 30000,  // 30s pour les tests d'intégration
    
    // Globals
    globals: true,
    
    // Configuration des workers
    pool: 'forks',  // Utilise forks au lieu de threads pour process.chdir
    poolOptions: {
      forks: {
        singleFork: true  // Un seul processus pour éviter les conflits
      }
    },
    
    // Setup files
    setupFiles: ['./vitest.setup.js']
  }
})
