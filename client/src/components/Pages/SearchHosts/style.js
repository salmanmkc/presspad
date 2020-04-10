import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { H4C, H7C } from '../../Common/Typography';

export const HeroWrapper = styled.section`
  text-align: right;
  min-height: auto;
  min-height: calc(88vw - 80px);

  @media ${({ theme: { breakpoints } }) => breakpoints.mobileXL} {
    min-height: calc(88vw - 80px);
    max-height: calc(868px - 80px);
  }

  @media ${({ theme: { breakpoints } }) => breakpoints.laptop} {
    min-height: calc(868px - 80px);
  }
`;

export const HeroBackground = styled.img`
  max-width: 100%;
  max-height: 868px;
  min-height: 240px;
  width: 975px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  box-shadow: 0px 4px 4px rgba(128, 109, 109, 0.1),
    0px -1px 4px rgba(128, 109, 109, 0.05);
  max-width: 760px;
  z-index: 1000;
  top: 120px;
  background: #fff;
  text-align: left;
  min-height: 608.31px;
  margin-right: auto;
  @media ${({ theme: { breakpoints } }) => breakpoints.mobileL} {
    padding: 40px 50px;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
  align-items: flex-start;
  margin-top: ${({ mt, theme }) => theme.spacings[mt] || 0};

  @media ${({ theme: { breakpoints } }) => breakpoints.mobileXL} {
    flex-direction: row;
    align-items: center;
  }
`;

export const SubRow = styled(Row)`
  display: flex;
  flex-wrap: wrap;
  margin-right: ${({ theme }) => theme.spacings[4]};
`;

export const HostsSection = styled.section`
  margin-top: ${({ theme }) => theme.spacings[7]};
`;

export const HostCardsWrapper = styled.section`
  margin-top: 50px;
  display: flex;
  position: relative;
`;

export const HostCardWrapper = styled(Link)`
  margin: 0 auto;
  display: block;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 4px 4px rgba(128, 109, 109, 0.1),
    0px -1px 4px rgba(128, 109, 109, 0.05);
  max-width: 480px;
  width: 100vw;
  margin-left: -3%; /**equaul to the side padding for the layout */
  transition: 0.5s all;

  @media ${({ theme: { breakpoints } }) => breakpoints.mobileM} {
    margin-left: -7%; /**equaul to the side padding for the layout */
  }
  @media ${({ theme: { breakpoints } }) => breakpoints.mobileL} {
    margin-left: auto;
    width: 100%;
  }

  :active,
  :hover {
    transform: translate(0, -5px);
    box-shadow: 0px 4px 4px rgba(128, 109, 109, 0.3),
      0px -1px 4px rgba(128, 109, 109, 0.05);
    max-width: 480px;
  }
`;

export const CardImage = styled.img`
  height: 234px;
  object-fit: cover;
  width: 100%;

  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    height: ${({ long }) => (long ? '344px' : '234px')};
  }
`;
export const CardDetailsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  min-height: 75px;
`;

export const CardDetails = styled.div`
  padding: 0 20px;
`;

export const CardCity = styled(H4C)`
  color: ${({ theme }) => theme.colors.white};
  padding: 5px;
  background-color: ${({ theme }) => theme.colors.darkerGray};
`;

export const MasonryColumn = styled.div`
  flex: 1;
  margin-left: ${({ ml }) => (ml ? '25px' : 0)};

  @media ${({ theme: { breakpoints } }) => breakpoints.mobileXL} {
    margin-left: ${({ ml }) => (ml ? '50px' : 0)};
  }
`;

export const MasonryItem = styled.div`
  margin-bottom: 25px;
  @media ${({ theme: { breakpoints } }) => breakpoints.mobileXL} {
    margin-bottom: 50px;
  }
`;

export const NoResultsWrapper = styled.section`
  max-width: 700px;
`;

export const ErrorMessage = styled(H7C)`
  padding: ${({ theme }) => theme.spacings[3]};
  color: ${({ theme }) => theme.colors.pink};
`;
