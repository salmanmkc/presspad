import styled from 'styled-components';

export const IllCareWrapper = styled.div`
  width: 100%;

  label,
  .extraInfo,
  .helper {
    width: 100%;
    @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
      width: ${({ width }) => width || '200%'};
    }
  }
`;

export const BursaryPageHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const BursaryButtonWrapperDesktop = styled.div`
  display: none;
  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    display: block;
  }
`;

export const BursaryButtonWrapperTablet = styled.div`
  display: block;
  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    display: none;
  }
`;

export const TitleContainer = styled.div`
  position: relative;

  background: ${({ theme }) => theme.colors.darkBlue};
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacings.headerHeight};
  margin-left: auto;

  left: -3vw;

  @media ${({ theme: { breakpoints } }) => breakpoints.mobileL} {
    left: -7vw;
  }

  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    left: -4vw;
  }

  @media ${({ theme: { breakpoints } }) => breakpoints.laptop} {
    left: -5vw;
  }

  @media ${({ theme: { breakpoints } }) => breakpoints.laptop} {
    left: -7vw;
  }
`;

export const SuccessWrapper = styled.div`
  max-width: 100%;
  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    max-width: 26rem;
  }
`;
