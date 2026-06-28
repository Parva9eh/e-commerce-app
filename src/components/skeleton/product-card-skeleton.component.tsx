import { SkeletonBlock } from './skeleton.styles';
import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProductCardSkeleton = () => (
  <Card aria-hidden="true">
    <SkeletonBlock $height="280px" />
    <SkeletonBlock $height="18px" />
    <SkeletonBlock $height="18px" />
  </Card>
);

export default ProductCardSkeleton;