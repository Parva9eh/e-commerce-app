import styled from 'styled-components';
import { media } from '@/styles/theme';

export const AuthenticationContainer = styled.div`
  display: flex;
  width: 900px;
  max-width: 100%;
  justify-content: space-between;
  margin: 30px auto;
  gap: 40px;

  ${media.tablet} {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;