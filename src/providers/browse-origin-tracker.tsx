'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackBrowseOrigin } from '@/utils/shop/browse-origin';

const BrowseOriginTrackerField = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    trackBrowseOrigin(pathname, searchParams);
  }, [pathname, searchParams]);

  return null;
};

export default function BrowseOriginTracker() {
  return (
    <Suspense fallback={null}>
      <BrowseOriginTrackerField />
    </Suspense>
  );
}