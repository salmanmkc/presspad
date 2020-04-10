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

export const WarningWrapper = styled.span`
  svg {
    float: left;
    margin-right: 5px;
  }
  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
  }
`;

export const TipsWrapper = styled.div`
  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    height: ${({ height, theme }) => height || theme.spacings[3]};
  }
  > div {
    margin-top: ${({ theme }) => theme.spacings[6]};
    margin-bottom: ${({ theme }) => theme.spacings[8]};
    @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
      position: absolute;
      top: 470px;
      right: 0;
      width: 50%;
      max-width: 507px;
    }
  }
`;
