import { RefObject, useEffect } from 'react';

export const useSearchClear = (
  ref: RefObject<HTMLInputElement | null>,
  onClear: () => void,
  active: boolean
) => {
  useEffect(() => {
    if (!active) return;

    const input = ref.current;
    if (!input) return;

    const handleNativeSearch = () => {
      if (!input.value.trim()) {
        onClear();
      }
    };

    input.addEventListener('search', handleNativeSearch);
    return () => input.removeEventListener('search', handleNativeSearch);
  }, [ref, onClear, active]);
};