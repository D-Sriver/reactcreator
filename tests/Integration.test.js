import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

describe('DevStarter CLI Integration Tests', () => {
  describe('Module Loading', () => {
    it('should load all core modules without errors', async () => {
      const coreModules = [
        '../src/DesignManager.js',
        '../src/ProjectCreator.js',
        '../src/InstallationManager.js',
        '../src/GitManager.js',
        '../PackageManagers.js',
        '../Languages.js'
      ]

      for (const modulePath of coreModules) {
        expect(() => {
          require(modulePath)
        }, `Failed to load ${modulePath}`).not.toThrow()
      }
    })

    it('should have consistent module exports', () => {
      const DesignManager = require('../src/DesignManager.js')
      const ProjectCreator = require('../src/ProjectCreator.js')
      const InstallationManager = require('../src/InstallationManager.js')
      const GitManager = require('../src/GitManager.js')

      // Vérifier que les modules exportent des objets/classes
      expect(typeof DesignManager).toBe('object')
      expect(typeof ProjectCreator).toBe('object')
      expect(typeof InstallationManager).toBe('object')
      expect(typeof GitManager).toBe('object')
    })
  })

  describe('ProjectCreator Integration', () => {
    let ProjectCreator

    beforeEach(() => {
      ProjectCreator = require('../src/ProjectCreator.js')
    })

    it('should validate project configurations correctly', () => {
      const validConfigs = [
        {
          projectName: 'test-react-app',
          framework: 'react',
          bundler: 'vite',
          packageManager: 'npm'
        },
        {
          projectName: 'test-vue-app',
          framework: 'vue',
          bundler: 'vite',
          packageManager: 'yarn'
        },
        {
          projectName: 'test-svelte-app',
          framework: 'svelte',
          bundler: 'vite',
          packageManager: 'pnpm'
        }
      ]

      validConfigs.forEach(config => {
        expect(() => {
          ProjectCreator.validateConfig(config)
        }, `Config should be valid: ${JSON.stringify(config)}`).not.toThrow()
      })
    })

    it('should reject invalid project configurations', () => {
      const invalidConfigs = [
        // Nom de projet manquant
        {
          framework: 'react',
          bundler: 'vite',
          packageManager: 'npm'
        },
        // Combinaison incompatible
        {
          projectName: 'test-app',
          framework: 'vue',
          bundler: 'cra',
          packageManager: 'npm'
        }
      ]

      invalidConfigs.forEach(config => {
        expect(() => {
          ProjectCreator.validateConfig(config)
        }, `Config should be invalid: ${JSON.stringify(config)}`).toThrow()
      })
    })

    it('should generate appropriate creation commands', () => {
      const testConfigs = [
        {
          projectName: 'test-app',
          framework: 'react',
          bundler: 'vite',
          packageManager: 'npm',
          useTypeScript: false
        },
        {
          projectName: 'test-ts-app',
          framework: 'react',
          bundler: 'vite',
          packageManager: 'yarn',
          useTypeScript: true
        }
      ]

      testConfigs.forEach(config => {
        const command = ProjectCreator.getCreationCommand(config)
        expect(typeof command).toBe('string')
        expect(command.length).toBeGreaterThan(0)
        expect(command).toContain(config.projectName)
      })
    })

    it('should provide correct template lists', () => {
      const bundlers = ['vite', 'cra', 'next']
      
      bundlers.forEach(bundler => {
        const templates = ProjectCreator.getAvailableTemplates(bundler)
        expect(Array.isArray(templates)).toBe(true)
        
        if (bundler === 'vite') {
          expect(templates.length).toBeGreaterThan(0)
          expect(templates).toContain('react')
        }
      })
    })

    it('should correctly identify TypeScript support', () => {
      const bundlers = ['vite', 'cra', 'next']
      
      bundlers.forEach(bundler => {
        const hasTypeScript = ProjectCreator.supportsTypeScript(bundler)
        expect(typeof hasTypeScript).toBe('boolean')
        
        // Vite, CRA et Next supportent tous TypeScript
        if (['vite', 'cra', 'next'].includes(bundler)) {
          expect(hasTypeScript).toBe(true)
        }
      })
    })
  })

  describe('InstallationManager Integration', () => {
    let InstallationManager

    beforeEach(() => {
      InstallationManager = require('../src/InstallationManager.js')
    })

    it('should generate correct package installation commands', () => {
      const { managers } = require('../PackageManagers.js')
      
      Object.keys(managers).forEach(pmName => {
        const pm = managers[pmName]
        
        // Test state managers
        const reduxCommand = InstallationManager.getStateManagerInstallCommand('redux', pm)
        expect(reduxCommand).toContain('redux')
        expect(reduxCommand).toContain(pm.install)
        
        // Test styling libraries
        const tailwindCommand = InstallationManager.getStylingLibraryInstallCommand('tailwind', pm)
        expect(tailwindCommand).toContain('tailwindcss')
        expect(tailwindCommand).toContain(pm.install)
        
        // Test routers
        const routerCommand = InstallationManager.getRouterInstallCommand('react-router', pm)
        expect(routerCommand).toContain('react-router-dom')
        expect(routerCommand).toContain(pm.install)
      })
    })

    it('should provide correct router display names', () => {
      const routers = ['react-router', 'vue-router', 'unknown-router']
      const mockLang = {}
      
      routers.forEach(router => {
        const displayName = InstallationManager.getRouterDisplayName(router, mockLang)
        expect(typeof displayName).toBe('string')
        expect(displayName.length).toBeGreaterThan(0)
      })
    })
  })

  describe('GitManager Integration', () => {
    let GitManager

    beforeEach(() => {
      GitManager = require('../src/GitManager.js')
    })

    it('should check git availability', () => {
      const isAvailable = GitManager.isAvailable()
      expect(typeof isAvailable).toBe('boolean')
    })

    it('should generate gitignore content', () => {
      const frameworks = ['react', 'vue', 'svelte']
      const packageManagers = ['npm', 'yarn', 'pnpm']
      
      frameworks.forEach(framework => {
        packageManagers.forEach(pm => {
          const content = GitManager.generateGitignoreContent(framework, pm)
          expect(typeof content).toBe('string')
          expect(content.length).toBeGreaterThan(0)
          expect(content).toContain('node_modules')
        })
      })
    })
  })

  describe('Configuration Validation Flow', () => {
    it('should validate complete project creation flow', async () => {
      const ProjectCreator = require('../src/ProjectCreator.js')
      const InstallationManager = require('../src/InstallationManager.js')
      const GitManager = require('../src/GitManager.js')
      const { managers } = require('../PackageManagers.js')

      const testConfig = {
        projectName: 'integration-test',
        framework: 'react',
        bundler: 'vite',
        packageManager: 'npm',
        useTypeScript: true,
        stateManager: 'redux',
        stylingLibrary: 'tailwind',
        router: 'react-router',
        initGit: true
      }

      // 1. Validation de la configuration
      expect(() => {
        ProjectCreator.validateConfig(testConfig)
      }).not.toThrow()

      // 2. Génération des commandes
      const creationCommand = ProjectCreator.getCreationCommand(testConfig)
      expect(creationCommand).toBeTruthy()

      const startCommand = ProjectCreator.getStartCommand(testConfig)
      expect(startCommand).toBeTruthy()

      // 3. Installation des dépendances
      const pm = managers[testConfig.packageManager]
      
      const stateManagerCommand = InstallationManager.getStateManagerInstallCommand(testConfig.stateManager, pm)
      expect(stateManagerCommand).toBeTruthy()

      const stylingCommand = InstallationManager.getStylingLibraryInstallCommand(testConfig.stylingLibrary, pm)
      expect(stylingCommand).toBeTruthy()

      const routerCommand = InstallationManager.getRouterInstallCommand(testConfig.router, pm)
      expect(routerCommand).toBeTruthy()

      // 4. Configuration Git
      if (testConfig.initGit) {
        const gitIgnoreContent = GitManager.generateGitignoreContent(testConfig.framework, testConfig.packageManager)
        expect(gitIgnoreContent).toBeTruthy()
      }
    })
  })

  describe('Performance Tests', () => {
    it('should load modules quickly', async () => {
      const startTime = Date.now()
      
      // Charger tous les modules principaux
      require('../src/DesignManager.js')
      require('../src/ProjectCreator.js')
      require('../src/InstallationManager.js')
      require('../src/GitManager.js')
      require('../PackageManagers.js')
      require('../Languages.js')
      
      const loadTime = Date.now() - startTime
      
      // Les modules devraient se charger en moins de 100ms
      expect(loadTime).toBeLessThan(100)
    })

    it('should validate configurations quickly', () => {
      const ProjectCreator = require('../src/ProjectCreator.js')
      const config = {
        projectName: 'performance-test',
        framework: 'react',
        bundler: 'vite',
        packageManager: 'npm'
      }

      const startTime = Date.now()
      
      // Valider 100 fois la même configuration
      for (let i = 0; i < 100; i++) {
        ProjectCreator.validateConfig(config)
      }
      
      const validationTime = Date.now() - startTime
      
      // 100 validations devraient prendre moins de 10ms
      expect(validationTime).toBeLessThan(10)
    })
  })
})
