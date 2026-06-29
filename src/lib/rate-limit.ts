import { NextRequest, NextResponse } from 'next/server';

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, RateLimitBucket>();

export type RateLimitResult = {
  ok: boolean;
  limit: number;
  remaining: number;
  retryAfterSeconds?: number;
};

export const getClientIp = (request: NextRequest): string => {
  const forwardedFor = request.headers.get('x-forwarded-for');

  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }

  return request.headers.get('x-real-ip') ?? 'unknown';
};

const cleanupExpiredBuckets = (now: number) => {
  for (const [key, bucket] of buckets) {
    if (now >= bucket.resetAt) {
      buckets.delete(key);
    }
  }
};

export const checkRateLimit = (
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult => {
  const now = Date.now();
  cleanupExpiredBuckets(now);

  const bucket = buckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, limit, remaining: Math.max(0, limit - 1) };
  }

  if (bucket.count >= limit) {
    return {
      ok: false,
      limit,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;

  return {
    ok: true,
    limit,
    remaining: Math.max(0, limit - bucket.count),
  };
};

export const enforceRateLimit = (
  request: NextRequest,
  routeName: string,
  limit = 10,
  windowMs = 60_000,
): RateLimitResult => {
  const ip = getClientIp(request);
  return checkRateLimit(`${routeName}:${ip}`, limit, windowMs);
};

export const applyRateLimitHeaders = (
  response: NextResponse,
  rateLimit: RateLimitResult,
): void => {
  response.headers.set('X-RateLimit-Limit', String(rateLimit.limit));
  response.headers.set('X-RateLimit-Remaining', String(rateLimit.remaining));

  if (!rateLimit.ok && rateLimit.retryAfterSeconds) {
    response.headers.set('Retry-After', String(rateLimit.retryAfterSeconds));
  }
};

export const rateLimitExceededResponse = (
  message: string,
  rateLimit: RateLimitResult,
): NextResponse => {
  const response = NextResponse.json({ error: message }, { status: 429 });
  applyRateLimitHeaders(response, rateLimit);
  return response;
};