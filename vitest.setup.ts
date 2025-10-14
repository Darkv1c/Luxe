import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock CSS modules
const mockCSSModules = new Proxy({}, {
  get: (target, prop) => {
    if (typeof prop === 'string') {
      return `mock-${prop}`;
    }
    return prop;
  },
});

vi.mock('**/*.module.css', () => ({ default: mockCSSModules }));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})