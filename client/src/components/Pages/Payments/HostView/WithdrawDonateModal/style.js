import styled from 'styled-components';

export const ModalTitle = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 35px;

  color: #07294a;
`;

export const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  min-height: 285px;
  justify-content: space-between;

  & > * {
    margin-top: 0.75rem;
  }
`;

export const ModalDescription = styled.span`
  font-style: normal;
  font-weight: ${({ bold }) => (bold ? 'bold' : 300)};
  font-size: ${({ large }) => (large ? '25px' : '16px')};
  color: ${({ error, theme }) =>
    error ? theme.colors.red : theme.colors.fontLightBlack} !important;
  line-height: 25px;
`;

export const Label = styled.label`
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 25px;

  color: #393939;
  text-align: right;
  width: 100%;
  display: inline-block;
`;

export const Error = styled.p`
  position: absolute;
  top: 100%;
  color: red;
  font-size: 12px;
  font-style: italic;
`;

export const ErrorWrapper = styled.div`
  border: ${({ error }) => (error ? '1px solid red' : 'initial')};
  margin-bottom: ${({ marginBottom }) => marginBottom};

  border-radius: 4px;
  position: relative;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacings[6]};
  width: 220px;

  > button {
    min-width: unset;
    width: 100px;
    height: 35px;
    padding: 0;
    font-size: 14px;
  }
`;
