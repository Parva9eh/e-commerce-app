'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkUserSession } from '@/store/user/user.action';

/**
 * Single session check on mount. Firebase auth module is still loaded lazily
 * via the user saga / dynamic import — no route-timed branching here.
 */
export default function AppInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return null;
}
