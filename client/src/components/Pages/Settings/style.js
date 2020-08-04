import styled from 'styled-components';

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

export const SuccessHeaderWrapper = styled.p`
  margin-top: ${({ theme }) => theme.spacings[4]};
  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    margin-top: ${({ theme }) => theme.spacings[8]};
  }
`;
