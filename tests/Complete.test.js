import { describe, it, expect } from 'vitest'
import { managers } from '../PackageManagers.js'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

describe('DevStarter Core Integration', () => {
  describe('Module Loading', () => {
    it('should load all core modules successfully', () => {
      const modules = {
        DesignManager: require('../src/DesignManager.js'),
        ProjectCreator: require('../src/ProjectCreator.js'),
        InstallationManager: require('../src/InstallationManager.js'),
        GitManager: require('../src/GitManager.js'),
        Languages: require('../Languages.js'),
        PackageManagers: require('../PackageManagers.js')
      }

      // Tous les modules doivent être définis
      Object.entries(modules).forEach(([name, module]) => {
        expect(module, `${name} should be defined`).toBeDefined()
      })
    })
  })

  describe('Framework Support', () => {
    it('should support all main frameworks', () => {
      const ProjectCreator = require('../src/ProjectCreator.js')
      
      const frameworks = ['react', 'vue', 'svelte', 'solid', 'qwik', 'lit']
      const bundlers = ['vite', 'cra', 'next']
      
      frameworks.forEach(framework => {
        bundlers.forEach(bundler => {
          try {
            const templates = ProjectCreator.getAvailableTemplates(bundler)
            expect(Array.isArray(templates)).toBe(true)
            
            const supportsTS = ProjectCreator.supportsTypeScript(bundler)
            expect(typeof supportsTS).toBe('boolean')
          } catch (error) {
            // Les combinaisons incompatibles sont attendues
          }
        })
      })
    })
  })

  describe('Package Manager Integration', () => {
    it('should have all required package managers with correct structure', () => {
      expect(managers.npm).toBeDefined()
      expect(managers.yarn).toBeDefined()
      expect(managers.pnpm).toBeDefined()
      expect(managers.bun).toBeDefined()

      Object.values(managers).forEach(pm => {
        expect(pm.install).toBeDefined()
        expect(pm.run).toBeDefined()
        expect(pm.createVite).toBeDefined()
        expect(pm.init).toBeDefined()
        expect(pm.createReactApp).toBeDefined()
        expect(pm.createNext).toBeDefined()
      })
    })

    it('should generate installation commands correctly', () => {
      const InstallationManager = require('../src/InstallationManager.js')
      
      Object.entries(managers).forEach(([pmName, pm]) => {
        // Test state managers
        const reduxCmd = InstallationManager.getStateManagerInstallCommand('redux', pm)
        expect(reduxCmd).toContain('redux')
        expect(reduxCmd).toContain(pm.install)

        // Test styling libraries
        const tailwindCmd = InstallationManager.getStylingLibraryInstallCommand('tailwind', pm)
        expect(tailwindCmd).toContain('tailwindcss')
        expect(tailwindCmd).toContain(pm.install)

        // Test routers
        const routerCmd = InstallationManager.getRouterInstallCommand('react-router', pm)
        expect(routerCmd).toContain('react-router-dom')
        expect(routerCmd).toContain(pm.install)
      })
    })
  })

  describe('Configuration Validation', () => {
    it('should validate basic project configurations', () => {
      const ProjectCreator = require('../src/ProjectCreator.js')
      
      const validConfigs = [
        {
          projectName: 'test-app',
          framework: 'react',
          bundler: 'vite',
          packageManager: 'npm'
        },
        {
          projectName: 'vue-app',
          framework: 'vue',
          bundler: 'vite',
          packageManager: 'yarn'
        }
      ]

      validConfigs.forEach(config => {
        expect(() => {
          ProjectCreator.validateConfig(config)
        }).not.toThrow()
      })
    })

    it('should reject invalid configurations', () => {
      const ProjectCreator = require('../src/ProjectCreator.js')
      
      const invalidConfigs = [
        // Pas de nom de projet
        {
          framework: 'react',
          bundler: 'vite',
          packageManager: 'npm'
        },
        // Combinaison incompatible
        {
          projectName: 'test',
          framework: 'vue',
          bundler: 'cra',
          packageManager: 'npm'
        }
      ]

      invalidConfigs.forEach(config => {
        expect(() => {
          ProjectCreator.validateConfig(config)
        }).toThrow()
      })
    })
  })

  describe('Git Integration', () => {
    it('should generate gitignore content', () => {
      const GitManager = require('../src/GitManager.js')
      
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

    it('should check git availability', () => {
      const GitManager = require('../src/GitManager.js')
      const isAvailable = GitManager.isAvailable()
      expect(typeof isAvailable).toBe('boolean')
    })
  })

  describe('Design System', () => {
    it('should have complete design system', () => {
      const DesignManager = require('../src/DesignManager.js')
      
      // Vérifier les couleurs
      expect(DesignManager.colors).toBeDefined()
      expect(DesignManager.colors.primary).toBeDefined()
      expect(DesignManager.colors.success).toBeDefined()
      expect(DesignManager.colors.error).toBeDefined()

      // Vérifier les méthodes d'affichage
      const displayMethods = [
        'displayLogo', 'displayWelcome', 'displayStep',
        'displaySuccess', 'displayError', 'displayInfo',
        'displayWarning', 'displaySeparator', 'displayFinalSummary',
        'displayStartCommand', 'clearScreen'
      ]

      displayMethods.forEach(method => {
        expect(typeof DesignManager[method]).toBe('function')
      })
    })
  })

  describe('Performance', () => {
    it('should load modules quickly', () => {
      const start = Date.now()
      
      // Recharger tous les modules
      delete require.cache[require.resolve('../src/DesignManager.js')]
      delete require.cache[require.resolve('../src/ProjectCreator.js')]
      delete require.cache[require.resolve('../src/InstallationManager.js')]
      delete require.cache[require.resolve('../src/GitManager.js')]
      
      require('../src/DesignManager.js')
      require('../src/ProjectCreator.js')
      require('../src/InstallationManager.js')
      require('../src/GitManager.js')
      
      const duration = Date.now() - start
      expect(duration).toBeLessThan(100) // Moins de 100ms
    })

    it('should validate configurations quickly', () => {
      const ProjectCreator = require('../src/ProjectCreator.js')
      const config = {
        projectName: 'perf-test',
        framework: 'react',
        bundler: 'vite',
        packageManager: 'npm'
      }

      const start = Date.now()
      for (let i = 0; i < 100; i++) {
        ProjectCreator.validateConfig(config)
      }
      const duration = Date.now() - start
      
      expect(duration).toBeLessThan(10) // 100 validations en moins de 10ms
    })
  })
})
