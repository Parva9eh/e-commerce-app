import styled from 'styled-components';
import { media } from '@/styles/theme';

export const AuthenticationContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 900px;
  justify-content: space-between;
  margin: 30px auto;
  gap: 40px;

  ${media.tablet} {
    flex-direction: column;
    align-items: stretch;
    gap: 24px;
    margin: 20px auto;
  }

  ${media.narrow} {
    gap: 16px;
    margin: 12px auto;
  }
`;