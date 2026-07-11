'use client';

import DirectoryItem from '@/components/directory-item/directory-item.component';
import { DIRECTORY_CATEGORIES } from './directory.data';
import { DirectoryGrid } from './directory.styles';

/**
 * Marketing directory grid. Stays a Client Component because styled-components
 * requires a client boundary; tiles own browse-origin click handling.
 */
const Directory = () => (
  <DirectoryGrid>
    {DIRECTORY_CATEGORIES.map((category) => (
      <DirectoryItem
        key={category.id}
        title={category.title}
        imageUrl={category.imageUrl}
        imageAlt={category.imageAlt}
        href={category.href}
        priority={category.priority}
      />
    ))}
  </DirectoryGrid>
);

export default Directory;
