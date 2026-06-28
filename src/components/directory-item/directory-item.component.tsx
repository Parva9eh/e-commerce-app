'use client';

import Image from 'next/image';
import { DirectoryItemContainer, BackgroundImage, Body } from './directory-item.styles';

type DirectoryItemProps = {
  title: string;
  imageUrl: string;
  imageAlt: string;
  href: string;
};

const DirectoryItem = ({ title, imageUrl, imageAlt, href }: DirectoryItemProps) => (
  <DirectoryItemContainer href={href} aria-label={`Shop ${title}`}>
    <BackgroundImage>
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
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