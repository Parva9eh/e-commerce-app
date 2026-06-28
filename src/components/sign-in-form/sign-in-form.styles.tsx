import styled from 'styled-components';

export const SignInContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 380px;
  
    h2 {
      margin: 10px 0;
    }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AuthErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 14px;
  margin: 8px 0;
`;
