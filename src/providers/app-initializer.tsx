'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { usePathname } from 'next/navigation';
import { checkUserSession } from '@/store/user/user.action';

const IMMEDIATE_AUTH_ROUTES = ['/auth', '/checkout'];
const DEFERRED_AUTH_ROUTES = ['/'];

const scheduleDeferredTask = (task: () => void) => {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  const browserWindow = window as Window &
    typeof globalThis & {
      requestIdleCallback?: (
        callback: IdleRequestCallback,
        options?: IdleRequestOptions,
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

  if (browserWindow.requestIdleCallback) {
    const idleId = browserWindow.requestIdleCallback(task, { timeout: 3000 });

    return () => browserWindow.cancelIdleCallback?.(idleId);
  }

  const timeoutId = browserWindow.setTimeout(task, 2000);

  return () => browserWindow.clearTimeout(timeoutId);
};

export default function AppInitializer() {
  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    const runCheck = () => dispatch(checkUserSession());

    if (IMMEDIATE_AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
      runCheck();
      return undefined;
    }

    if (DEFERRED_AUTH_ROUTES.includes(pathname)) {
      let hasRun = false;

      const runOnce = () => {
        if (hasRun) {
          return;
        }

        hasRun = true;
        runCheck();
      };

      const cancelIdle = scheduleDeferredTask(runOnce);
      const interactionEvents = ['pointerdown', 'keydown', 'touchstart'] as const;

      interactionEvents.forEach((eventName) => {
        window.addEventListener(eventName, runOnce, { once: true, passive: true });
      });

      return () => {
        cancelIdle();
        interactionEvents.forEach((eventName) => {
          window.removeEventListener(eventName, runOnce);
        });
      };
    }

    const timeoutId = window.setTimeout(runCheck, 0);

    return () => window.clearTimeout(timeoutId);
  }, [dispatch, pathname]);

  return null;
}