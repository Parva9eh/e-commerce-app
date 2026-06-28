'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchForm, SearchInput } from './search.styles';

const Search = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();

    if (!trimmed) {
      router.push('/shop');
      return;
    }

    router.push(`/shop?search=${encodeURIComponent(trimmed)}`);
  };

  return (
    <SearchForm onSubmit={handleSubmit} role="search">
      <SearchInput
        type="search"
        placeholder="Search products"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label="Search products"
      />
    </SearchForm>
  );
};

export default Search;