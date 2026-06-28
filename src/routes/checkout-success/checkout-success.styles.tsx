import styled from 'styled-components';

export const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  padding: 60px 20px;
`;

export const SuccessTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
`;

export const SuccessMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 480px;
  margin: 0;
`;