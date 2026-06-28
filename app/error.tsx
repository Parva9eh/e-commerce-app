'use client';

import Button from '@/components/button/button.component';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <h1>Something went wrong</h1>
      <p>Please try again or return to the shop.</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}