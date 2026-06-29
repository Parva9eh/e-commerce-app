import styled from 'styled-components';
import { focusVisible } from '@/styles/mixins';
import { media } from '@/styles/theme';

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  padding: 15px 0;
  font-size: ${({ theme }) => theme.fontSizes.md};
  align-items: center;

  ${media.tablet} {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 20px 0;
  }

  ${media.narrow} {
    gap: 10px;
    padding: 16px 0;
  }
`;

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;
  position: relative;
  min-height: 80px;

  ${media.tablet} {
    width: 100%;
    padding-right: 0;
    max-width: 200px;
  }
`;

export const BaseSpan = styled.span`
  width: 23%;

  ${media.tablet} {
    width: 100%;
  }
`;

export const Quantity = styled(BaseSpan)`
  display: flex;
  align-items: center;

  ${media.tablet} {
    width: 100%;
    justify-content: flex-start;
  }
`;

export const QuantityButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.md};
  padding: 4px 8px;
  color: ${({ theme }) => theme.colors.text};

  ${focusVisible}
`;

export const Value = styled.span`
  margin: 0 10px;
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  padding-left: 12px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};

  ${media.tablet} {
    padding-left: 0;
  }

  ${focusVisible}
`;