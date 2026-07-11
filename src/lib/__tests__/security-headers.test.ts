import { describe, expect, test } from 'vitest';
import { buildContentSecurityPolicy } from '@/lib/security-headers';

describe('security headers', () => {
  test('buildContentSecurityPolicy returns null in development', () => {
    expect(buildContentSecurityPolicy(false)).toBeNull();
  });

  test('buildContentSecurityPolicy includes Stripe and Firebase allowances in production', () => {
    const policy = buildContentSecurityPolicy(true);

    expect(policy).toContain("default-src 'self'");
    expect(policy).toContain('https://js.stripe.com');
    expect(policy).toContain('https://api.stripe.com');
    expect(policy).toContain('https://identitytoolkit.googleapis.com');
    expect(policy).toContain("frame-ancestors 'none'");
    expect(policy).toContain("script-src-attr 'none'");
    expect(policy).toContain('upgrade-insecure-requests');
  });
});