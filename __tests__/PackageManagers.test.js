import { describe, it, expect, beforeEach, vi } from 'vitest'
import { managers } from '../PackageManagers.js'

describe('PackageManagers', () => {
  describe('Structure', () => {
    it('should have all required package managers', () => {
      expect(managers).toBeDefined()
      expect(managers.npm).toBeDefined()
      expect(managers.yarn).toBeDefined()
      expect(managers.pnpm).toBeDefined()
      expect(managers.bun).toBeDefined()
    })

    it('each package manager should have required commands', () => {
      Object.keys(managers).forEach(pmName => {
        const pm = managers[pmName]
        expect(pm.install, `${pmName}.install should exist`).toBeDefined()
        expect(pm.run, `${pmName}.run should exist`).toBeDefined()
        expect(pm.createVite, `${pmName}.createVite should exist`).toBeDefined()
        expect(pm.init, `${pmName}.init should exist`).toBeDefined()
        expect(pm.createReactApp, `${pmName}.createReactApp should exist`).toBeDefined()
        expect(pm.createNext, `${pmName}.createNext should exist`).toBeDefined()
      })
    })
  })

  describe('Commands Accuracy', () => {
    it('npm commands should be correct', () => {
      const npm = managers.npm
      expect(npm.install).toBe('npm install')
      expect(npm.run).toBe('npm run')
      expect(npm.init).toBe('npm init -y')
      expect(npm.createVite).toBe('npm create vite@latest')
      expect(npm.createReactApp).toBe('npx create-react-app')
      expect(npm.createNext).toBe('npx create-next-app')
    })

    it('yarn commands should be correct', () => {
      const yarn = managers.yarn
      expect(yarn.install).toBe('yarn')
      expect(yarn.run).toBe('yarn')
      expect(yarn.init).toBe('yarn init -y')
      expect(yarn.createVite).toBe('yarn create vite')
      expect(yarn.createReactApp).toBe('yarn create react-app')
      expect(yarn.createNext).toBe('yarn create next-app')
    })

    it('pnpm commands should be correct', () => {
      const pnpm = managers.pnpm
      expect(pnpm.install).toBe('pnpm install')
      expect(pnpm.run).toBe('pnpm')
      expect(pnpm.init).toBe('pnpm init')
      expect(pnpm.createVite).toBe('pnpm create vite')
      expect(pnpm.createReactApp).toBe('pnpm create react-app')
      expect(pnpm.createNext).toBe('pnpm create next-app')
    })

    it('bun commands should be correct', () => {
      const bun = managers.bun
      expect(bun.install).toBe('bun install')
      expect(bun.run).toBe('bun run')
      expect(bun.init).toBe('bun init -y')
      expect(bun.createVite).toBe('bun create vite')
      expect(bun.createReactApp).toBe('bun create react-app')
      expect(bun.createNext).toBe('bun create next-app')
    })
  })

  describe('Package Manager Selection', () => {
    it('should detect available package managers', async () => {
      // Mock du système pour simuler la présence des PMs
      const { detectPackageManager } = managers
      
      if (detectPackageManager) {
        const detected = detectPackageManager()
        expect(['npm', 'yarn', 'pnpm', 'bun']).toContain(detected)
      }
    })
  })
})
