import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 300px;
  min-height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${({ theme }) => theme.spacings[5]} auto 0;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    min-height: 100vh;
    margin: 0;
  }
`;

export const Label = styled.label`
  font-family: Glacial Indifference;

  font-weight: bold;
  line-height: 25px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.blue};
  padding-left: ${({ theme }) => theme.spacings[1]};
  margin-top: ${({ theme }) => theme.spacings[4]};
  display: block;
`;

export const Error = styled.p`
  top: 100%;
  color: red;
  font-size: 12px;
  font-style: italic;
`;

export const ButtonWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacings[6]};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin-top: ${({ theme }) => theme.spacings[4]};
  }
`;
