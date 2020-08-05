import React, { Component } from 'react';
import { Spin } from 'antd';

import Reviews from '../../../Common/Reviews';
import ListingGallery from '../../../Common/Profile/ListingGallery';

// Sub Components
import Header from './Header';
import ProfileCard from './Card';
import AccommodationCheckList from './AccommodationCheckList';
import HostProfileCalendar from './HostProfileCalendar';

// Typography
import * as T from '../../../Common/Typography';
import { colors } from '../../../../theme';
// Styles
import { ContentWrapper } from '../../../Layouts/SideMenuLayout/style';
import {
  SideWrapper,
  Card,
  PageDivider,
  InfoCard,
  Row,
  Col,
  WhyHereDiv,
  ReviewsPart,
  GalleryContainer,
} from '../Profile.style';

// accommodation checklist
import types from '../../../../constants/types';

//  helpers
import { titleCase, truncatePostcode } from '../../../../helpers';

// utils
import { getUserBookings, getHostProfile } from '../utils';

//  individual styles to overwrite components
const tableFonts = { fontSize: '18px', lineHeight: '1.2' };

export default class InternView extends Component {
  state = {
    isLoading: true,
    profileData: null,
    internBookings: [],
    expandDateSection: false,
    showFullData: false,
    bookingSearchDates: [],
  };

  async componentDidMount() {
    const { role, id, location, unauthenticated } = this.props;

    // check if dates were selected in search
    if (location && location.state && location.state.selectedSearchDates) {
      this.setState({ bookingSearchDates: location.state.selectedSearchDates });
    }

    // check intern's bookings
    if (role && !unauthenticated) {
      const {
        internBookings,
        error: getInternBookingsError,
      } = await getUserBookings(role, id);

      if (!getInternBookingsError) this.setState({ internBookings });
    }

    // get profile data
    const { profileData, error: getHostProfileError } = await getHostProfile(
      this.props,
    );

    if (!getHostProfileError) {
      this.setState({
        isLoading: false,
        profileData,
        showFullData: profileData.showFullData,
      });
    }
  }

  setProfileData = profileData =>
    this.setState({ profileData, showFullData: profileData.showFullData });

  toggleDateSection = () => {
    const { expandDateSection } = this.state;
    this.setState({ expandDateSection: !expandDateSection });
  };

  render() {
    if (this.state.isLoading) return <Spin tip="Loading Profile" />;

    const {
      profileData: {
        _id: userId,
        listing: {
          _id,
          availableDates,
          price,
          address: {
            // addressline1 = '',
            // addressline2 = '',
            postcode = '',
            city = '',
          } = {},
          photos,
          otherInfo,
          accommodationChecklist,
          neighbourhoodDescription,
        },
        listingActiveBookings,
        profile: {
          bio,
          jobTitle,
          organisation,
          profileImage,
          hostingReasonAnswer,
          mentoringExperienceAnswer,
          industryExperienceAnswer,
          backgroundAnswer,
          badge,
          hometown,
          gender,
          school,
          workingArea,
          areasOfInterest,
        },
        name,
        respondedRequests,
        respondingTime,
      },
      internBookings,
      showFullData,
      expandDateSection,
      bookingSearchDates,
    } = this.state;

    const { match, id: currentUserId, role, windowWidth } = this.props;
    const { id: hostId } = match.params;

    const isMobile =
      (windowWidth && windowWidth < 776) || window.innerWidth < 776;

    // passed on to Header Component
    const headerProfileData = {
      userId,
      name,
      jobTitle,
      organisation,
      city,
      postcode,
      badge,
    };

    // passed on to Calendar component
    const calendarBookingDetails = {
      currentUserId,
      hostId,
      role,
      listingId: _id,
      availableDates,
      internBookings,
      price,
      bookingSearchDates,
      listingActiveBookings,
    };

    const calendarData = {
      calendarBookingDetails,
      calendarFunctions: {
        getHostProfile,
        setProfileData: this.setProfileData,
        toggleDateSection: this.toggleDateSection,
      },
      respondedRequests,
      respondingTime,
      stateProps: { expandDateSection },
    };

    // key infos to be rendered in top section as table
    const keyInfoTable = {
      Gender: gender && gender,
      'University / School': school && school,
      Hometown: hometown && hometown,
      'Media I work in': workingArea && workingArea,
      'Areas of Interest': areasOfInterest && areasOfInterest,
    };
    const keyDetailsArr = Object.entries(keyInfoTable);

    // content for Profile Card Component
    const profileContents = {
      aboutMe: {
        title: 'A bit about me',
        text: bio || 'NA',
      },
      neighbourhood: {
        title: 'About my neighbourhood',
        text: neighbourhoodDescription || 'NA',
      },
      houseRules: {
        title: 'House Rules / Information',
        text: otherInfo || 'N/A',
      },
      whyHost: {
        title: 'Why I want to be a PressPad host',
        text: hostingReasonAnswer || 'NA',
      },
      mentoring: {
        title: 'What experience do I have of mentoring?',
        text: mentoringExperienceAnswer || 'NA',
      },
      background: {
        title: 'Something you should know',
        text: backgroundAnswer || 'NA',
      },
      industryExperience: {
        title: 'How was my own experience getting into the industry?',
        text: industryExperienceAnswer,
      },
    };

    return (
      <ContentWrapper>
        {/* Header */}
        <Header
          profileImage={profileImage}
          userData={{ role, currentUserId }}
          profileData={headerProfileData}
          stateProps={{ showFullData }}
          helpers={{ titleCase, truncatePostcode }}
        />

        <GalleryContainer>
          <ListingGallery
            img1={photos[0] && photos[0].url}
            img2={photos[1] && photos[1].url}
            img3={photos[2] && photos[2].url}
          />
        </GalleryContainer>

        {/* MAIN SECTION */}
        <PageDivider>
          <SideWrapper left>
            {/* Basic Info Table */}
            <Card
              left
              noShadow
              style={{ paddingTop: isMobile ? '2rem' : '0', marginTop: 0 }}
            >
              <InfoCard style={{ paddingTop: !isMobile && '2rem' }}>
                {keyDetailsArr.map(details => (
                  <Row>
                    <Col>
                      <T.H6C style={(tableFonts, { color: colors.lightGray })}>
                        {details[0]}
                      </T.H6C>
                    </Col>
                    <Col value>
                      <T.PBold style={tableFonts}>
                        {titleCase(details[1])}
                      </T.PBold>
                    </Col>
                  </Row>
                ))}
              </InfoCard>
            </Card>

            {/* About me */}
            <ProfileCard
              type="about"
              mobile={isMobile}
              side="left"
              headline={profileContents.aboutMe.title}
              text={profileContents.aboutMe.text}
            />

            {/* About my Home */}
            <Card left>
              <InfoCard>
                {!isMobile ? (
                  <T.H3>About my home</T.H3>
                ) : (
                  <T.PBold>About my home</T.PBold>
                )}

                {/* Checklist */}
                {accommodationChecklist && accommodationChecklist.length && (
                  <AccommodationCheckList
                    totalList={types.accommodationChecklist}
                    actualList={accommodationChecklist}
                  />
                )}
              </InfoCard>
            </Card>

            {/* About my Neigbourhood */}
            <ProfileCard
              type="about"
              mobile={isMobile}
              side="left"
              headline={profileContents.neighbourhood.title}
              text={profileContents.neighbourhood.text}
            />
          </SideWrapper>

          {/* Calendar on desktop */}
          {!isMobile && (
            <SideWrapper right>
              {/* Calendar on desktop */}
              <HostProfileCalendar
                type="desktop"
                calendarData={calendarData}
                isMobile={isMobile}
              />

              {/* Other Info */}
              <ProfileCard
                type="about"
                mobile={isMobile}
                side="right"
                headline={profileContents.houseRules.title}
                text={profileContents.houseRules.text}
              />
            </SideWrapper>
          )}
        </PageDivider>

        {/* Why I'm here section */}
        <PageDivider>
          <SideWrapper left>
            <WhyHereDiv>
              <T.H4C>Why I’m here</T.H4C>
            </WhyHereDiv>

            {hostingReasonAnswer && (
              <ProfileCard
                type="whyHere"
                mobile={isMobile}
                side="left"
                headline={profileContents.whyHost.title}
                text={profileContents.whyHost.text}
              />
            )}

            {mentoringExperienceAnswer && (
              <ProfileCard
                type="whyHere"
                mobile={isMobile}
                side="left"
                headline={profileContents.mentoring.title}
                text={profileContents.mentoring.text}
              />
            )}

            {backgroundAnswer && (
              <ProfileCard
                type="whyHere"
                mobile={isMobile}
                side="left"
                headline={profileContents.background.title}
                text={profileContents.background.text}
              />
            )}
          </SideWrapper>

          <SideWrapper right style={{ marginTop: !isMobile && '5rem' }}>
            {industryExperienceAnswer && (
              <ProfileCard
                type="whyHere"
                mobile={isMobile}
                side="right"
                headline={profileContents.industryExperience.title}
                text={profileContents.industryExperience.text}
              />
            )}
          </SideWrapper>
        </PageDivider>

        {/* Reviews */}
        <ReviewsPart>
          <SideWrapper left>
            <Card left noShadow>
              <InfoCard>
                <Reviews userId={userId} name={name} userRole="host" />
              </InfoCard>
            </Card>
          </SideWrapper>
        </ReviewsPart>

        {/* Calendar on Mobile */}
        {isMobile && (
          <HostProfileCalendar
            type="mobile"
            calendarData={calendarData}
            isMobile={isMobile}
          />
        )}
      </ContentWrapper>
    );
  }
}
