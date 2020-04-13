import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  max-width: 410px;
  height: 219px;
  margin: 0 auto;
  margin-top: ${({ theme }) => theme.spacings[7]};
  padding: ${({ theme: { spacings } }) => `${spacings[4]} ${spacings[4]}`};
  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    padding: ${({ theme: { spacings } }) => `${spacings[4]} ${spacings[5]}`};
    margin: unset;
    margin-top: ${({ theme }) => theme.spacings[7]};
  }
`;
