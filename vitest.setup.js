// Setup global pour Vitest
import { vi } from 'vitest'
import fs from 'fs'
import path from 'path'

// Mock des modules qui nécessitent une interaction système
vi.mock('fs', async () => {
  const actual = await vi.importActual('fs')
  return {
    ...actual,
    writeFileSync: vi.fn(),
    mkdirSync: vi.fn(),
  }
})

// Configuration globale
global.console = {
  ...console,
  log: vi.fn(),
  error: vi.fn(),
  warn: vi.fn(),
}

// Helper pour créer des fichiers temporaires de test
global.createTempDir = () => {
  const tmpDir = path.join(process.cwd(), 'tmp-test-' + Date.now())
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true })
  }
  return tmpDir
}

// Cleanup après les tests
global.cleanupTempDir = (dir) => {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true })
  }
}
