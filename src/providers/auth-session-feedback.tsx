'use client';

import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import { selectCurrentUser } from '@/store/user/user.selector';
import { getUserLabel } from '@/utils/user/user-display.utils';
import { showInfo, showSuccess } from '@/utils/toast/toast.utils';

export default function AuthSessionFeedback() {
  const currentUser = useSelector(selectCurrentUser);
  const pathname = usePathname();
  const router = useRouter();
  const previousUserRef = useRef(currentUser);
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    if (pathname === '/auth' && currentUser) {
      router.replace('/');
    }
  }, [pathname, currentUser, router]);

  useEffect(() => {
    const previousUser = previousUserRef.current;

    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      previousUserRef.current = currentUser;
      return;
    }

    if (currentUser && !previousUser && pathname === '/auth') {
      showSuccess(`Welcome back, ${getUserLabel(currentUser)}!`);
    }

    if (!currentUser && previousUser) {
      showInfo('You have been signed out.');
    }

    previousUserRef.current = currentUser;
  }, [currentUser, pathname]);

  return null;
}