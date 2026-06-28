import styled, { css } from 'styled-components';

type FormInputLabelProps = {
  $shrink?: boolean;
};

const shrinkLabelStyles = css`
  top: -14px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text};
`;

export const FormInputLabel = styled.label<FormInputLabelProps>`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;
  ${({ $shrink }) => $shrink && shrinkLabelStyles}
`;

export const Input = styled.input`
  background: none;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: ${({ theme }) => theme.fontSizes.md};
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.textSubtle};
  margin: 25px 0;

  &:focus {
    outline: none;
  }

  &:focus-visible {
    border-bottom-color: ${({ theme }) => theme.colors.text};
    outline: ${({ theme }) => theme.focusRing.width} solid ${({ theme }) => theme.focusRing.color};
    outline-offset: ${({ theme }) => theme.focusRing.offset};
  }

  &:focus ~ ${FormInputLabel} {
    ${shrinkLabelStyles}
  }
`;

export const Group = styled.div`
  position: relative;
  margin: 45px 0;

  input[type='password'] {
    letter-spacing: 0.3em;
  }
`;