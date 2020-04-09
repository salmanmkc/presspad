import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacings[7]};
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
  > p {
    width: 50%;
    @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
      font-size: 22px;
    }
  }
  :last-child {
    margin-bottom: 0;
  }
`;
