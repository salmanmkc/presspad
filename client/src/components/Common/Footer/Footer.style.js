import styled from 'styled-components';

import { breakpoints } from '../../../theme';

import { Row } from '../Grid';

export const Wrapper = styled(Row)`
  width: 100%;
  background: ${({ theme }) => theme.colors.darkBlue};

  padding: 25px 3% 25px 3%;

  @media ${breakpoints.mobileL} {
    padding: 25px 7% 25px 7%;
  }

  @media ${breakpoints.tablet} {
    padding: 25px 4% 25px 4%;
    align-items: center;
  }

  @media ${breakpoints.laptop} {
    padding: 25px 5% 25px 5%;
  }

  @media ${breakpoints.laptopL} {
    padding: 25px 7% 25px 7%;
  }
`;

export const SocialLink = styled.a`
  margin-right: ${({ theme }) => theme.spacings[2]};
  height: 20px;
  width: 20px;

  @media ${breakpoints.tablet} {
    height: 32px;
    width: 32px;
  }
`;
