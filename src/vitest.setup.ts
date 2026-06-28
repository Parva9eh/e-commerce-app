import '@testing-library/jest-dom/vitest';
import { TextEncoder, TextDecoder } from 'util';
import { createElement } from 'react';
import { vi } from 'vitest';

const testFirebaseEnv = {
  NEXT_PUBLIC_FIREBASE_API_KEY: 'test-api-key',
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: 'test.firebaseapp.com',
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'test-project',
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: 'test-project.appspot.com',
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: '1234567890',
  NEXT_PUBLIC_FIREBASE_APP_ID: '1:1234567890:web:test',
} as const;

for (const [key, value] of Object.entries(testFirebaseEnv)) {
  process.env[key] ??= value;
}

Object.assign(globalThis, { TextDecoder, TextEncoder });

const MockSvg = (props: object) => createElement('svg', { 'data-testid': 'mock-svg', ...props });

vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
  }) => createElement('img', { src, alt, ...props }),
}));

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => createElement('a', { href, ...props }, children),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('@/assets/crown.svg', () => ({
  ReactComponent: MockSvg,
  default: 'crown.svg',
}));

vi.mock('@/assets/shopping-bag.svg', () => ({
  ReactComponent: MockSvg,
  default: 'shopping-bag.svg',
}));

globalThis.jest = {
  fn: vi.fn,
  mock: vi.mock,
  requireActual: vi.importActual,
  clearAllMocks: vi.clearAllMocks,
  resetAllMocks: vi.resetAllMocks,
};