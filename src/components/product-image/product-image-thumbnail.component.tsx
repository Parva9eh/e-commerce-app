'use client';

import Image from 'next/image';
import styled from 'styled-components';

type ProductImageThumbnailProps = {
  src: string;
  alt: string;
};

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 60px;

  img {
    object-fit: cover;
  }
`;

const ProductImageThumbnail = ({ src, alt }: ProductImageThumbnailProps) => (
  <ThumbnailWrapper>
    <Image src={src} alt={alt} fill sizes="80px" />
  </ThumbnailWrapper>
);

export default ProductImageThumbnail;