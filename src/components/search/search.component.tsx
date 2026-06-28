'use client';

import { ChangeEvent, FormEvent, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSearchClear } from '@/hooks/use-search-clear';
import {
  buildCurrentPath,
  getPreSearchPath,
  setPreSearchPath,
  updateShopParam,
} from '@/utils/shop/shop-params';
import { SearchForm, SearchInput } from './search.styles';

const SearchField = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const isNavigatingRef = useRef(false);
  const isShopSearchPage = pathname === '/shop';
  const urlSearch = isShopSearchPage ? (searchParams.get('search') ?? '') : '';
  const hasActiveSearch = isShopSearchPage && Boolean(urlSearch);
  const [query, setQuery] = useState('');

  useEffect(() => {
    isNavigatingRef.current = false;
  }, [pathname, urlSearch]);

  useEffect(() => {
    if (isShopSearchPage) {
      setQuery(urlSearch);
    }
  }, [isShopSearchPage, urlSearch]);

  const navigateToPreSearch = useCallback(() => {
    if (isNavigatingRef.current) {
      return;
    }

    isNavigatingRef.current = true;
    setQuery('');

    const preSearchPath = getPreSearchPath();

    if (preSearchPath) {
      router.push(preSearchPath);
      return;
    }

    if (hasActiveSearch) {
      router.push(updateShopParam(searchParams, 'search', ''));
    }
  }, [hasActiveSearch, router, searchParams]);

  const handleClear = useCallback(() => {
    if (hasActiveSearch) {
      navigateToPreSearch();
      return;
    }

    setQuery('');
  }, [hasActiveSearch, navigateToPreSearch]);

  const hasClearableSearch = Boolean(query.trim()) || hasActiveSearch;

  useSearchClear(inputRef, handleClear, hasClearableSearch);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();

    if (!trimmed) {
      if (hasActiveSearch) {
        navigateToPreSearch();
      } else if (!isShopSearchPage) {
        router.push('/shop');
      } else {
        router.push(updateShopParam(searchParams, 'search', ''));
      }

      return;
    }

    setPreSearchPath(buildCurrentPath(pathname, searchParams));

    if (isShopSearchPage) {
      router.push(updateShopParam(searchParams, 'search', trimmed));
      return;
    }

    router.push(updateShopParam(new URLSearchParams(), 'search', trimmed));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (hasActiveSearch && !value.trim()) {
      navigateToPreSearch();
      return;
    }

    setQuery(value);
  };

  return (
    <SearchForm onSubmit={handleSubmit} role="search">
      <SearchInput
        ref={inputRef}
        type="search"
        placeholder="Search products"
        value={query}
        onChange={handleChange}
        aria-label="Search products"
      />
    </SearchForm>
  );
};

const Search = () => (
  <Suspense fallback={null}>
    <SearchField />
  </Suspense>
);

export default Search;