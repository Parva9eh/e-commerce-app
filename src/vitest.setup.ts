import '@testing-library/jest-dom/vitest';
import { TextEncoder, TextDecoder } from 'util';
import { vi } from 'vitest';

Object.assign(globalThis, { TextDecoder, TextEncoder });

globalThis.jest = {
  fn: vi.fn,
  mock: vi.mock,
  requireActual: vi.importActual,
  clearAllMocks: vi.clearAllMocks,
  resetAllMocks: vi.resetAllMocks,
};