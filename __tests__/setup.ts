// __tests__/setup.ts
// Global test setup - run before each test file

import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll, vi } from "vitest";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock global fetch
global.fetch = vi.fn();

// Mock window.Audio
const mockAudio = {
  play: vi.fn().mockResolvedValue(undefined),
  pause: vi.fn(),
  currentTime: 0,
  duration: 0,
};

Object.defineProperty(window, "Audio", {
  writable: true,
  value: vi.fn().mockImplementation(() => mockAudio),
});

// Mock Buffer for Node.js Buffer usage in tests
if (!global.Buffer) {
  global.Buffer = require("buffer").Buffer;
}

// Reset modules and mocks between tests
afterEach(() => {
  vi.restoreAllMocks();
  localStorageMock.clear();
  (global.fetch as ReturnType<typeof vi.fn>).mockReset();
});