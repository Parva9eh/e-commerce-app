const STRIPE_SCRIPT_SOURCES = ['https://js.stripe.com', 'https://m.stripe.network'];
const STRIPE_FRAME_SOURCES = ['https://js.stripe.com', 'https://hooks.stripe.com'];
const STRIPE_CONNECT_SOURCES = [
  'https://api.stripe.com',
  'https://m.stripe.com',
  'https://m.stripe.network',
];

const FIREBASE_CONNECT_SOURCES = [
  'https://identitytoolkit.googleapis.com',
  'https://securetoken.googleapis.com',
  'https://firestore.googleapis.com',
  'https://www.googleapis.com',
];

const FIREBASE_FRAME_SOURCES = ['https://accounts.google.com', 'https://*.firebaseapp.com'];

/**
 * Production CSP.
 * Note: Next.js + styled-components still require 'unsafe-inline' for scripts/styles
 * without a full nonce pipeline. We harden with script-src-attr 'none' and tight host allowlists.
 */
export const buildContentSecurityPolicy = (isProduction: boolean): string | null => {
  if (!isProduction) {
    return null;
  }

  const directives = [
    "default-src 'self'",
    [
      "script-src 'self' 'unsafe-inline'",
      ...STRIPE_SCRIPT_SOURCES,
      'https://apis.google.com',
    ].join(' '),
    "script-src-attr 'none'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://i.ibb.co",
    "font-src 'self' data:",
    [
      "connect-src 'self'",
      ...STRIPE_CONNECT_SOURCES,
      ...FIREBASE_CONNECT_SOURCES,
    ].join(' '),
    ["frame-src 'self'", ...STRIPE_FRAME_SOURCES, ...FIREBASE_FRAME_SOURCES].join(' '),
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    'upgrade-insecure-requests',
  ];

  return directives.join('; ');
};

export const applySecurityHeaders = (
  response: Response,
  options: { isApiRoute: boolean; isProduction: boolean },
): void => {
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  // No Cross-Origin-Opener-Policy: Google sign-in popups log window.close warnings under COOP,
  // and this app does not use cross-origin isolation (COEP / SharedArrayBuffer).
  response.headers.set('Cross-Origin-Resource-Policy', 'same-site');

  const csp = buildContentSecurityPolicy(options.isProduction);

  if (csp) {
    response.headers.set('Content-Security-Policy', csp);
  }

  if (options.isApiRoute) {
    response.headers.set('Cache-Control', 'no-store');
  }
};
