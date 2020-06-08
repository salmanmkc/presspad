import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  > button {
    margin: auto;
  }
  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    min-height: 530px;
    > button {
      margin: unset;
      margin-top: auto;
      margin-right: 0;
      align-self: flex-end;
    }
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  min-height: 420px;
  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    width: 50%;
    > button {
      margin-top: ${({ theme }) => theme.spacings[5]};
      width: 195px;
    }
  }
`;

export const CancelContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ButtonContainer = styled.div`
  display: flex;
  align-self: center;
  justify-content: space-between;
  margin-top: 3rem;
  width: 70%;
`;

export const ErrorWrapper = styled.div`
  border: ${({ error }) => (error ? '1px solid red' : 'initial')};
  margin-bottom: ${({ marginBottom }) => marginBottom};
  height: ${({ fullHeight }) => (fullHeight ? 'auto' : 'calc(100% - 27px)')};
  border-radius: 4px;
  position: relative;

  .ant-select-disabled .ant-select-selection {
    background: transparent;
    cursor: auto;
  }
`;
