import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { colors, shadows, size } from '../../../theme';
import { ReactComponent as BackArrowIcon } from '../../../assets/back-arrow.svg';

const classNames = {
  reactCalendar: '.react-calendar',
  reactCalendarNavigation: '.react-calendar__navigation',
};

// used to split page into 2 main parts
export const PageDivider = styled.section`
  display: flex;
  position: relative;

  @media (max-width: 775.98px) {
    flex-direction: column;
  }
`;

export const ReviewsPart = styled(PageDivider)``;

export const SideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${({ left }) => (left ? '55%' : '45%')};
  margin-left: ${({ left }) => (left ? '0' : '20px')};

  @media (max-width: 775.98px) {
    width: 100%;
    margin-left: 0;
  }
`;

export const Card = styled.div`
  box-shadow: ${({ noShadow }) =>
    noShadow ? 'none' : shadows.hostProfileCard};
  padding-top: 2rem;
  margin-top: 2rem;
  width: 100%;
  @media (max-width: 775.98px) {
    width: 100%;
    margin-top: 1rem;
    padding-top: 1rem;
  }
`;

export const WhyHereDiv = styled(Card)`
  height: 50px;
  display: flex;
  align-items: center;
  padding-top: 0;
  // margin-left: 2.5rem;
  align-self: flex-start;
  width: 70%;
  background: ${colors.darkBlue};

  h4 {
    color: ${colors.white};
    padding-left: 1.5rem;
  }

  @media (max-width: 775.98px) {
    margin-left: 0;

    h4 {
      padding-left: 1rem;
    }
  }
`;

export const Wrapper = styled.div`
  width: 80%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

export const LinkDiv = styled.div`
  margin: 2rem 0;
  height: 25px;
`;

export const BackLinkDiv = styled.div`
  margin-left: -10px;
  display: flex;
  justify-content: flex-start;
`;

export const AdminTopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MultipleButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const Arrow = styled(BackArrowIcon)`
  width: 4vw;
`;

export const BackToAdmin = styled.div`
  color: ${colors.links};
  cursor: pointer;
  font-weight: 500;
  line-height: 1;
`;

export const BackLink = styled(Link)`
  color: ${colors.links};
  text-decoration: none;
  font-weight: 500;
  line-height: 1;
`;

const blurPic = css`
  filter: ${({ blur }) => (blur ? 'blur(2px)' : 'none')};
  -webkit-filter: ${({ blur }) => (blur ? 'blur(2px)' : 'none')};
`;

export const ProfilePic = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center center;
  ${props => !props.adminView && blurPic}
  @media (max-width: 600px) {
    width: 60px;
    height: 60px;
  }
`;

export const Address = styled.h3`
  font-size: 16px;
  color: ${colors.fontLightBlack};
  margin-top: auto;
`;

export const SymbolDiv = styled.div`
  position: absolute;
  right: 0;
  width: 25%;
  padding-top: 1rem;
`;

export const Symbol = styled.div`
  width: 38px;
  height: 50px;
  background-image: url(${({ src }) => src});
`;

export const ImageSection = styled.section`
  margin-top: 15px;
  height: 400px;
  display: flex;
  align-items: center;

  @media (max-width: 775.98px) {
    height: auto;
    flex-direction: column;
    padding-top: 20px;
  }
`;

export const MainImageDiv = styled.div`
  width: 65%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 775.98px) {
    width: 100%;
  }
`;

export const MainImage = styled.div`
  width: 100%;
  height: 380px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(${({ src }) => src});
`;

export const SideImageDiv = styled.div`
  width: 35%;
  height: 380px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  margin-left: 5px;

  @media (max-width: 775.98px) {
    width: 100%;
    margin-left: 0px;
  }
`;
export const SubImage = styled.div`
  width: 100%;
  height: 185px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(${({ src }) => src});
`;

export const CalendarCard = styled(Card)`
  box-shadow: none;
  border: 1px solid blue;
`;

export const AvailableHosting = styled.div`
  background-color: ${colors.white};
  height: auto;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  overflow-y: scrollable;
  z-index: 99;
`;

export const MobileCalendarCard = styled.div`
  padding: 0.75rem;
  display: flex;
  align-items: center;
  background-color: ${colors.darkBlue};

  p {
    color: ${colors.white};
    text-align: left;
    padding-right: 2rem;
  }

  // when user clicks open
  ${({ open }) =>
    open &&
    css`
      background-color: ${colors.white};
      padding: auto;
      position: relative;
      display: block;
      height: 100%;
      left: 0;
      position: fixed;
      top: 0;
      width: 100%;
      overflow-y: auto;

      p {
        color: ${colors.black};
      }
    `}
`;

export const MobileCalendarHeadline = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  align-items: flex-start;

  p {
    margin-top: 0.5rem;
  }
`;

const InnerCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1.5rem 0 1.5rem;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 775.98px) {
    padding: 0 0.5rem 0 0.5rem;
  }
`;

export const InfoCard = styled(InnerCard)`
  margin-bottom: 1rem;

  h3,
  h4 {
    padding-bottom: 0.5rem;
  }

  p {
    padding-bottom: 1rem;
  }

  @media (max-width: 775.98px) {
    height: auto;
  }
`;

export const Reviews = styled(InnerCard)`
  margin-top: 10px;
  min-height: 380px;
  @media (max-width: 775.98px) {
    height: auto;
  }
`;

export const ReviewsSection = styled.div`
  display: flex;

  @media (max-width: 775.98px) {
    flex-direction: column;
  }
`;

export const ReviewsBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 8px;
  width: 50%;

  @media (max-width: 775.98px) {
    padding: 0px;
    width: 100%;
  }
`;

export const ReviewsHeader = styled.div`
  display: flex;
  @media (max-width: 575.98px) {
    flex-direction: column;
  }
`;

export const ReviewHeadline = styled.h4`
  font-size: 16px;
  font-weight: 500;
  line-height: 2;
`;

export const ReviewText = styled.p`
  font-weight: 300;
  font-size: 16px;
`;

export const MoreReviewsLink = styled(Link)`
  text-align: left;
  color: ${colors.links};
  text-decoration: none;
`;

export const CalendarDiv = styled.div.attrs(classNames)`
  width: 100%;
  margin: -2rem auto 0 auto;

  @media (max-width: 775.98px) {
    margin-top: -1rem;
  }

  ${classNames.reactCalendar} {
    pointer-events: ${props => (props.userRole === 'host' ? 'none' : 'all')};
  }

  ${classNames.reactCalendarNavigation} {
    button {
      min-width: 50px;
      pointer-events: all;
      background: none;
    }
    @media (max-width: ${size.mobileM}) {
      padding-right: 0.25rem;
    }
  }
`;

export const SubHeadline = styled.h2`
  font-weight: 600;
  font-size: 22px;
  text-align: left;
  margin: 5px 1rem 0 0;
`;

export const MobileSubHeadline = styled.h2`
  font-weight: 600;
  font-size: 18px;
  text-align: left;
  padding-right: 2rem;
  padding-top: 0.5rem;

  @media (max-width: ${size.mobileM}) {
    padding-right: 0.25rem;
  }
`;

export const List = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  margin-bottom: 2rem;

  @media (max-width: 775.98px) {
    flex-direction: column;
  }
`;
export const BulletPoint = styled.div`
  display: flex;
`;

export const ListItem = styled.li`
  font-weight: 300;
  width: 100%;
  list-style-type: none;
  margin: 0 0 0.5rem 0.5rem;

  @media (max-width: 775.98px) {
    width: 100%;
  }
`;

export const EditButton = styled(Link)`
  background: #ffffff;
  border: 1px solid #dbdbdb;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  color: #0ac7e7;
  padding: 7px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: block;
  width: 100px;
  height: fit-content;
  text-align: center;
  margin-left: 1rem;
`;

export const Strong = styled.span`
  font-size: 1em;
  font-weight: 700;
`;

export const KeyInfoRow = styled.span`
  margin-top: '0.5rem';
  display: flex;
`;

export const Row = styled.div`
  display: flex;
  padding-bottom: 0.5rem;
`;

export const Col = styled.div`
  padding-left: ${({ value }) => value && '1rem'};
  width: 170px;
`;

export const GalleryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
