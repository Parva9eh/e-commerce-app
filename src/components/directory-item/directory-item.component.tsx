'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { DirectoryItemContainer, BackgroundImage, Body } from './directory-item.styles';
import { DirectoryCategory } from '@/components/directory/directory.component';

type DirectoryItemProps = {
  category: DirectoryCategory;
};

const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
  const router = useRouter();
  const { imageUrl, title, route } = category;
  const onNavigateHandler = () => router.push(`/${route}`);

  return (
    <DirectoryItemContainer
      type="button"
      onClick={onNavigateHandler}
      aria-label={`Shop ${title}`}
    >
      <BackgroundImage $imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;