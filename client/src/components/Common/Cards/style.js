import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { H3, H7C, PBold, PXS } from '../Typography';
import { breakpoints } from '../../../theme';

export const SmallCardWrapper = styled(Link)`
  box-shadow: ${({ theme }) => theme.shadows.hostProfileCard};
  // min-width: 250px;
  display: flex;
  position: relative;
  min-height: 150px;
  flex-direction: ${({ type }) => type === 'big' && 'column'};

  // desktop
  @media ${breakpoints.mobileXL} {
    flex-direction: row;
    min-width: 450px;
    max-width: ${({ type }) => (type === 'big' ? '610px' : '515px')};
  }
`;

export const LeftDiv = styled.div`
  background-color: ${({ theme, type }) =>
    type === 'big' ? theme.colors.pink : theme.colors.lightBlue};
  color: ${({ theme }) => theme.colors.white};
  position: relative;
  min-height: ${({ type }) => (type === 'big' ? '180px' : '80px')};
  width: ${({ type }) => (type === 'big' ? '250px' : '150px')};

  @media ${breakpoints.mobileXL} {
    min-width: ${({ type }) => (type === 'big' ? '300px' : '200px')};
  }
`;

export const LeftTop = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: ${({ theme, type }) =>
    type === 'big'
      ? `${theme.spacings[4]} ${theme.spacings[5]}`
      : `${theme.spacings[2]} ${theme.spacings[4]}`};
`;

export const LeftTopContent = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const LeftBottom = styled.div`
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme, type }) =>
    type === 'big' ? theme.colors.lightPink : theme.colors.lightBlueGray};
  width: 100%;
  padding: ${({ theme }) => `${theme.spacings[1]} ${theme.spacings[4]}`};
  position: absolute;
  bottom: 0;
  left: 0;

  ${({ theme, type }) =>
    type === 'big' &&
    `
    padding: ${theme.spacings[2]} ${theme.spacings[5]};
    display: flex;
    justify-content: space-between;

`}
`;

export const Cost = styled(PBold)`
  font-size: 25px;
  color: ${({ theme, type }) =>
    type === 'big' ? theme.colors.white : theme.colors.darkerGray};
`;

export const RightDiv = styled.div`
  width: 100%;
  padding: ${({ theme, type }) =>
    type === 'big'
      ? `${theme.spacings[5]} ${theme.spacings[5]} ${theme.spacings[6]} ${theme.spacings[5]}`
      : `${theme.spacings[3]} ${theme.spacings[5]}`};

  @media ${breakpoints.mobileL} {
    width: 60%;
  }
`;

export const Name = styled(H3)`
  text-transform: capitalize;
  margin-bottom: ${({ theme }) => theme.spacings[2]};
`;

export const ViewBooking = styled(H7C)`
  color: ${({ theme }) => theme.colors.black};
  width: 50%;
  text-align: right;
  position: absolute;
  right: ${({ theme }) => theme.spacings[3]};
  bottom: ${({ theme }) => theme.spacings[3]};
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const SubTitle = styled(H7C)`
  color: ${({ theme }) => theme.colors.lighterGray};
  margin-bottom: ${({ theme }) => theme.spacings[1]};
`;

export const Body = styled(PXS)`
  margin-bottom: ${({ theme }) => theme.spacings[2]};
`;

export const InterestTitle = styled.span`
  font-weight: bold;
`;

export const Tag = styled.span`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => `${theme.spacings[1]} ${theme.spacings[2]}`};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 7px;
`;

export const Status = styled(H7C)`
  color: ${({ theme }) => theme.colors.darkBlue};
`;

export const InnerBottom = styled.div``;
