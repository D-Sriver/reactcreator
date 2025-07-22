import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

describe('DesignManager', () => {
  let DesignManager
  let consoleSpy

  beforeEach(async () => {
    // Reset des modules avant chaque test
    vi.resetModules()
    
    // Mock console
    consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    
    // Import dynamique du module
    DesignManager = require('../src/DesignManager.js')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Structure', () => {
    it('should have colors object with all required methods', () => {
      expect(DesignManager.colors).toBeDefined()
      expect(typeof DesignManager.colors).toBe('object')
      
      // Test des couleurs de base
      expect(DesignManager.colors.primary).toBeDefined()
      expect(DesignManager.colors.success).toBeDefined()
      expect(DesignManager.colors.error).toBeDefined()
      expect(DesignManager.colors.warning).toBeDefined()
      expect(DesignManager.colors.info).toBeDefined()
    })

    it('should have all display methods', () => {
      const requiredMethods = [
        'displayLogo',
        'displayWelcome', 
        'displayStep',
        'displaySuccess',
        'displayError',
        'displayInfo',
        'displayWarning',
        'displaySeparator',
        'displayFinalSummary',
        'displayStartCommand',
        'clearScreen'
      ]

      requiredMethods.forEach(method => {
        expect(typeof DesignManager[method], `${method} should be a function`).toBe('function')
      })
    })
  })

  describe('Display Functions', () => {
    it('displayLogo should output logo', () => {
      DesignManager.displayLogo()
      
      expect(consoleSpy).toHaveBeenCalled()
      // Vérifier qu'au moins un appel contient une partie du logo
      const calls = consoleSpy.mock.calls.flat()
      const hasLogo = calls.some(call => 
        typeof call === 'string' && call.includes('D E V S T A R T E R')
      )
      expect(hasLogo).toBe(true)
    })

    it('displayStep should include step number and message', () => {
      const stepNumber = 1
      const message = 'Test step message'
      
      DesignManager.displayStep(stepNumber, message)
      
      expect(consoleSpy).toHaveBeenCalled()
      // Vérifier que les appels contiennent le numéro et le message
      const calls = consoleSpy.mock.calls.flat().join(' ')
      expect(calls).toMatch(/1/)
      expect(calls).toContain(message)
    })

    it('displaySuccess should show success indicator', () => {
      const message = 'Success test message'
      
      DesignManager.displaySuccess(message)
      
      expect(consoleSpy).toHaveBeenCalled()
      const calls = consoleSpy.mock.calls.flat().join(' ')
      expect(calls).toMatch(/✅|✓|SUCCESS/i)
      expect(calls).toContain(message)
    })

    it('displayError should show error indicator', () => {
      const message = 'Error test message'
      
      DesignManager.displayError(message)
      
      expect(consoleSpy).toHaveBeenCalled()
      const calls = consoleSpy.mock.calls.flat().join(' ')
      expect(calls).toMatch(/❌|✗|ERROR/i)
      expect(calls).toContain(message)
    })
  })

  describe('Error Handling', () => {
    it('should handle empty objects gracefully', () => {
      expect(() => {
        DesignManager.displayWelcome({})
        DesignManager.displayStep(1, '')
        DesignManager.displayFinalSummary({}, {})
        DesignManager.displayStartCommand('', {})
      }).not.toThrow()
    })
  })
})
