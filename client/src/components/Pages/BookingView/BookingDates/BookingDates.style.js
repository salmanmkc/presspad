import styled from 'styled-components';

export const Wrapper = styled.div`
  height: calc(182px - ${({ theme }) => theme.spacings.sideMenuLayout.bottom});
  margin-top: ${({ theme }) => theme.spacings[6]};
  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    height: 0;
    margin-top: 0;
  }
`;
export const AbsoluteWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.pink};
  color: ${({ theme }) => theme.colors.white};
  font-family: Glacial Indifference;
  font-style: normal;
  font-weight: bold;
  width: 100%;
  min-height: 182px;
  position: absolute;
  right: 0;
  bottom: 0;
  padding-top: ${({ theme: { spacings } }) => spacings[3]};
  padding-left: ${({ theme: { spacings } }) => spacings[7]};
  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    padding-bottom: ${({ theme: { spacings } }) => spacings[5]};
    padding-top: ${({ theme: { spacings } }) => spacings[5]};
    max-width: 507px;
    width: 50%;
    height: 287px;
    top: 162px;
    > h6:first-child {
      font-size: 18px;
      line-height: 23px;
    }
    > h6 {
      font-size: 14px;
      line-height: 14px;
    }
    > h4 {
      font-size: 40px;
      line-height: 52px;
    }
  }
`;

export const BookingDateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 120px;
  margin-top: ${({ theme: { spacings } }) => `${spacings[3]}`};
  margin-bottom: ${({ theme: { spacings } }) => `${spacings[4]}`};
  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    width: 270px;
    margin-top: ${({ theme: { spacings } }) => `${spacings[4]}`};
    margin-bottom: ${({ theme: { spacings } }) => `${spacings[5]}`};
    h6 {
      font-size: 30px;
      line-height: 39px;
    }
  }
`;

export const DayNumber = styled.span`
  font-size: 40px;
  line-height: 52px;
  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    font-size: 100px;
    line-height: 78px;
  }
`;
