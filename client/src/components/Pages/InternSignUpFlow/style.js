import styled from 'styled-components';

export const IllCareWrapper = styled.div`
  width: 100%;

  label,
  .extraInfo,
  .helper {
    width: 100%;
    @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
      width: 200%;
    }
  }
`;
