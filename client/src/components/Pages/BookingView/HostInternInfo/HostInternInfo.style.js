import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacings[7]};
`;

export const BioWrapper = styled.div`
  display: ${({ userRole }) => (userRole === 'intern' ? 'block' : 'none')};
  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    display: block;
    margin-top: ${({ theme }) => theme.spacings[6]};
  }
`;

export const InfoLine = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacings[5]};

  > h6 {
    line-height: 28px;
    width: 50%;
    @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
      font-size: 18px;
    }
  }
  > p,
  > div {
    width: 50%;
    > p {
      @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
        font-size: 22px;
      }
    }
  }

  :last-child {
    margin-bottom: 0;
  }
`;
