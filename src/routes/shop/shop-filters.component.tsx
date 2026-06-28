'use client';

import { FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiltersContainer, FilterGroup, FilterSelect, MobileSearchInput } from './shop-filters.styles';

const ShopFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('search') ?? '';
  const category = searchParams.get('category') ?? 'all';
  const sort = searchParams.get('sort') ?? 'default';

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === 'all' || value === 'default') {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const query = params.toString();
    router.push(query ? `/shop?${query}` : '/shop');
  };

  const handleMobileSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const value = String(formData.get('mobile-search') ?? '').trim();
    updateParams('search', value);
  };

  return (
    <>
      <form onSubmit={handleMobileSearch}>
        <MobileSearchInput
          name="mobile-search"
          type="search"
          placeholder="Search products"
          defaultValue={search}
          aria-label="Search products"
        />
      </form>
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
    </>
  );
};

export default ShopFilters;