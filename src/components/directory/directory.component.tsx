'use client';

import DirectoryItem from '@/components/directory-item/directory-item.component';
import { DIRECTORY_CATEGORIES } from './directory.data';
import { DirectoryGrid } from './directory.styles';

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