'use client';

import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSearchClear } from '@/hooks/use-search-clear';
import {
  buildCurrentPath,
  getPreSearchPath,
  setPreSearchPath,
  updateShopParam,
} from '@/utils/shop/shop-params';
import {
  FiltersContainer,
  FilterGroup,
  FilterSelect,
  MobileSearchForm,
  MobileSearchInput,
  ShopToolbar,
} from './shop-filters.styles';

const ShopFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const isNavigatingRef = useRef(false);
  const search = searchParams.get('search') ?? '';
  const category = searchParams.get('category') ?? 'all';
  const sort = searchParams.get('sort') ?? 'default';
  const hasActiveSearch = Boolean(search);
  const [mobileQuery, setMobileQuery] = useState(search);

  useEffect(() => {
    isNavigatingRef.current = false;
  }, [pathname, search]);

  useEffect(() => {
    setMobileQuery(search);
  }, [search]);

  const updateParams = (key: 'search' | 'category' | 'sort', value: string) => {
    router.push(updateShopParam(searchParams, key, value));
  };

  const navigateToPreSearch = useCallback(() => {
    if (isNavigatingRef.current) {
      return;
    }

    isNavigatingRef.current = true;
    setMobileQuery('');

    const preSearchPath = getPreSearchPath();

    if (preSearchPath) {
      router.push(preSearchPath);
      return;
    }

    router.push(updateShopParam(searchParams, 'search', ''));
  }, [router, searchParams]);

  const clearSearch = useCallback(() => {
    if (hasActiveSearch) {
      navigateToPreSearch();
      return;
    }

    setMobileQuery('');
  }, [hasActiveSearch, navigateToPreSearch]);

  useSearchClear(inputRef, clearSearch, Boolean(mobileQuery.trim()) || hasActiveSearch);

  const handleMobileSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = mobileQuery.trim();

    if (!trimmed) {
      if (hasActiveSearch) {
        navigateToPreSearch();
      }

      return;
    }

    setPreSearchPath(buildCurrentPath(pathname, searchParams));
    updateParams('search', trimmed);
  };

  const handleMobileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (hasActiveSearch && !value.trim()) {
      navigateToPreSearch();
      return;
    }

    setMobileQuery(value);
  };

  return (
    <ShopToolbar>
      <MobileSearchForm onSubmit={handleMobileSearch}>
        <MobileSearchInput
          ref={inputRef}
          name="mobile-search"
          type="search"
          placeholder="Search products"
          value={mobileQuery}
          onChange={handleMobileChange}
          aria-label="Search products"
        />
      </MobileSearchForm>
      <FiltersContainer>
        <FilterGroup>
          Category
          <FilterSelect
            value={category}
            onChange={(event) => updateParams('category', event.target.value)}
            aria-label="Filter by category"
          >
            <option value="all">All categories</option>
            <option value="hats">Hats</option>
            <option value="jackets">Jackets</option>
            <option value="sneakers">Sneakers</option>
            <option value="womens">Womens</option>
            <option value="mens">Mens</option>
          </FilterSelect>
        </FilterGroup>
        <FilterGroup>
          Sort
          <FilterSelect
            value={sort}
            onChange={(event) => updateParams('sort', event.target.value)}
            aria-label="Sort products"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </FilterSelect>
        </FilterGroup>
      </FiltersContainer>
    </ShopToolbar>
  );
};

export default ShopFilters;