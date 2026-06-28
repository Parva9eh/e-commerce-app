'use client';

import Image from 'next/image';
import styled from 'styled-components';

type ProductImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
};

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;

  img {
    object-fit: cover;
  }
`;

const ProductImage = ({
  src,
  alt,
  priority = false,
  sizes = '(max-width: 800px) 50vw, 25vw',
}: ProductImageProps) => (
  <ImageWrapper>
    <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />
  </ImageWrapper>
);

export default ProductImage;