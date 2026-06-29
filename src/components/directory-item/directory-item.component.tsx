'use client';

import Image from 'next/image';
import { rememberHomeBrowseOrigin } from '@/utils/shop/browse-origin';
import { DirectoryItemContainer, BackgroundImage, Body } from './directory-item.styles';

type DirectoryItemProps = {
  title: string;
  imageUrl: string;
  imageAlt: string;
  href: string;
  priority?: boolean;
};

const DirectoryItem = ({
  title,
  imageUrl,
  imageAlt,
  href,
  priority = false,
}: DirectoryItemProps) => (
  <DirectoryItemContainer
    href={href}
    aria-label={`Shop ${title}`}
    onClick={rememberHomeBrowseOrigin}
  >
    <BackgroundImage>
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        priority={priority}
        sizes="(max-width: 800px) 50vw, 30vw"
      />
    </BackgroundImage>
    <Body>
      <h2>{title}</h2>
      <p>Shop Now</p>
    </Body>
  </DirectoryItemContainer>
);

export default DirectoryItem;