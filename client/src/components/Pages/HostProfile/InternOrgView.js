import React, { Component } from 'react';
import { Spin, message, Icon } from 'antd';

import axios from 'axios';
import {
  API_VERIFY_PROFILE_URL,
  API_GET_USER_BOOKINGS_URL,
} from '../../../constants/apiRoutes';

import { HOST_COMPLETE_PROFILE_URL } from '../../../constants/navRoutes';
import Reviews from '../../Common/Reviews';

import Calendar from './Calendar';

import Button from '../../Common/Button';
import ListingGallery from '../../Common/Profile/ListingGallery';

import {
  TopDiv,
  Header,
  HeaderDiv,
  Headline,
  SubHeadline,
  ParagraphHeadline,
  Paragraph,
} from '../../Common/Profile/Profiles.style';

// Layouts
import SideMenuLayout from '../../Layouts/SideMenuLayout';

// Typography
import * as T from '../../Common/Typography';

// Icons
import PageIcon from '../../Common/Icon';

// Styles
import {
  MainSection,
  Card,
  ProfilePic,
  TextContentDiv,
  Address,
  Symbol,
  InfoCard,
  AvailableHosting,
  CalendarDiv,
  List,
  ListItem,
  BulletPoint,
  EditButton,
  Strong,
  MobileSubHeadline,
  Row,
  Col,
  WhyHereDiv,
} from './Profile.style';

// accommodation checklist
import types from '../../../constants/types';

//  helpers
import { titleCase, truncatePostcode } from '../../../helpers';
import 'antd/dist/antd.css';

import starSign from '../../../assets/star-sign-symbol.svg';
import profilePlaceholder from '../../../assets/random-profile.jpg';
import { shadows, colors } from '../../../theme';

//  individual styles to overwrite components
const tableFonts = { fontSize: '18px', lineHeight: '27px' };

export default class InternView extends Component {
  state = {
    isLoading: true,
    profileData: null,
    internBookings: [],
    expandDateSection: false,
    showFullData: false,
  };

  componentDidMount() {
    const { role } = this.props;

    this.getHostProfile();
    if (role !== 'admin') {
      axios
        .get(API_GET_USER_BOOKINGS_URL.replace(':id', this.props.id))
        .then(result => this.setState({ internBookings: result.data }))
        .catch(err => message.error(err || 'Something went wrong'));
    }
  }

  getHostProfile = () => {
    const { match, history, role } = this.props;
    let hostId = match.params.id;
    if (!hostId && match.path === '/my-profile') {
      hostId = this.props.id;
    }

    axios
      .get(`/api/host/${hostId}`)
      .then(({ data }) => {
        if (data.profile) {
          this.setState({
            isLoading: false,
            profileData: data,
            showFullData: data.showFullData,
          });
        }
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        if (
          error === 'User has no profile' &&
          ['host', 'superhost'].includes(role)
        ) {
          message
            .info(
              <p>
                You don&apos;t have profile
                <br /> You will be redirected to complete your profile
              </p>,
              1,
            )
            .then(() => history.push(HOST_COMPLETE_PROFILE_URL));
        } else {
          message.error(error || 'Something went wrong');
        }
      });
  };

  handleImageFail = ({ target }) => {
    // eslint-disable-next-line no-param-reassign
    target.src = profilePlaceholder;
  };

  verifyProfile = (profileId, bool) => {
    axios
      .post(API_VERIFY_PROFILE_URL, { profileId, verify: bool })
      .catch(err => message.error(err || 'Something went wrong'));
  };

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
            addressline1 = '',
            addressline2 = '',
            postcode = '',
            city = '',
          } = {},
          photos,
          otherInfo,
          accommodationChecklist,
          neighbourhoodDescription,
        },
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
      },
      internBookings,
      showFullData,
      expandDateSection,
    } = this.state;

    const { match, id: currentUserId, role, windowWidth } = this.props;
    const { id: hostId } = match.params;

    // key infos to be rendered in top section as table
    const keyInfoTable = {
      Gender: gender && gender,
      'University / School': school && school,
      Hometown: hometown && hometown,
      'Media I work in': workingArea && workingArea,
      'Areas of Interest': areasOfInterest && areasOfInterest,
    };
    const keyDetailsArr = Object.entries(keyInfoTable);

    // renders accommodation checklist with tick / cross icons
    const renderAccommodationChecklist = (totalList, actualList) => {
      // delete 'none of these' from total list
      if (totalList[totalList.length - 1] === 'None of these') totalList.pop();
      // also take it out from actual list
      const filteredActualList = actualList.filter(
        item => item !== 'None of these',
      );

      return totalList.map(item =>
        filteredActualList.includes(item) ? (
          <BulletPoint>
            <PageIcon icon="tick" width="24px" height="24px" />
            <ListItem key={`accommodation-checklist-item-${Math.random()}`}>
              {item}
            </ListItem>
          </BulletPoint>
        ) : (
          <BulletPoint>
            <PageIcon icon="cross" width="24px" height="24px" />
            <ListItem key={`accommodation-checklist-item-${Math.random()}`}>
              {item}
            </ListItem>
          </BulletPoint>
        ),
      );
    };

    return (
      <SideMenuLayout goBack>
        <Header>
          <TopDiv>
            <ProfilePic
              src={profileImage.url || profilePlaceholder}
              adminView={role === 'admin' || userId === currentUserId || !!name}
              onError={this.handleImageFail}
              blur={!showFullData}
            />
            {/* HEADLINE */}
            <HeaderDiv>
              {role === 'admin' ? (
                <T.H2>{name || 'Anonymous'}</T.H2>
              ) : (
                <T.H2 style={{ fontSize: '24px', lineHeight: '23px' }}>
                  {jobTitle &&
                    `A ${titleCase(jobTitle)} ${
                      organisation ? `at ${titleCase(organisation)}` : ''
                    }`}
                </T.H2>
              )}
              {/* ADDRESS */}
              <T.P>
                {city} {showFullData ? postcode : truncatePostcode(postcode)}
              </T.P>
            </HeaderDiv>
          </TopDiv>
          {/* BADGE */}
          <TopDiv>
            {badge && <Symbol src={starSign} />}

            {userId === currentUserId && (
              <EditButton to={HOST_COMPLETE_PROFILE_URL}>
                Edit Profile
              </EditButton>
            )}
          </TopDiv>
        </Header>
        {/* GALLERY */}
        <ListingGallery
          img1={photos[0] && photos[0].url}
          img2={photos[1] && photos[1].url}
          img3={photos[2] && photos[2].url}
        />
        <MainSection>
          <TextContentDiv>
            {/* Basic Infos */}
            <InfoCard style={{ paddingTop: windowWidth > 776 && '2rem' }}>
              {keyDetailsArr.map(details => (
                <Row>
                  <Col>
                    <T.H6C style={tableFonts}>{details[0]}</T.H6C>
                  </Col>
                  <Col value>
                    <T.PBold style={tableFonts}>
                      {titleCase(details[1])}
                    </T.PBold>
                  </Col>
                </Row>
              ))}
            </InfoCard>
            {/* About me */}
            <Card>
              <InfoCard>
                <T.H3>A bit about Me</T.H3>
                <T.P>{bio}</T.P>
              </InfoCard>
            </Card>
            {/* About my Home */}
            <Card>
              <InfoCard>
                <T.H3>About my home</T.H3>
                {accommodationChecklist &&
                  accommodationChecklist.length &&
                  renderAccommodationChecklist(
                    types.accommodationChecklist,
                    accommodationChecklist,
                  )}
              </InfoCard>
            </Card>
            {/* About my Neigbourhood */}
            <Card>
              <InfoCard>
                <T.H3>About my neighbourhood</T.H3>
                <T.P>{neighbourhoodDescription || 'N/A'}</T.P>
              </InfoCard>
            </Card>
            {/* Other Info */}
            <Card>
              <InfoCard>
                <T.H3>Other Info / House Rules</T.H3>
                <T.P>{otherInfo || 'N/A'}</T.P>
              </InfoCard>
            </Card>
            {/* Why I'm here section */}
            <WhyHereDiv>
              <T.H4C>Why I’m here</T.H4C>
            </WhyHereDiv>
            {(hostingReasonAnswer ||
              mentoringExperienceAnswer ||
              industryExperienceAnswer) && (
              <>
                {hostingReasonAnswer && (
                  <Card>
                    <InfoCard>
                      <T.H4>Why I want to be a PressPad host</T.H4>
                      <T.PS>{hostingReasonAnswer}</T.PS>
                    </InfoCard>
                  </Card>
                )}

                {mentoringExperienceAnswer && (
                  <Card>
                    <InfoCard>
                      <T.H4>What experience do I have of mentoring?</T.H4>
                      <T.PS>{mentoringExperienceAnswer}</T.PS>
                    </InfoCard>
                  </Card>
                )}
                {industryExperienceAnswer && (
                  <Card>
                    <InfoCard>
                      <T.H4>
                        How was my own experience getting into the industry?
                      </T.H4>
                      <T.PS>{industryExperienceAnswer}</T.PS>
                    </InfoCard>
                  </Card>
                )}
                {backgroundAnswer && (
                  <Card>
                    <InfoCard>
                      <T.H4>Something you should know</T.H4>
                      <T.PS>{backgroundAnswer}</T.PS>
                    </InfoCard>
                  </Card>
                )}
              </>
            )}
            {/* Reviews */}
            <Card>
              <Reviews userId={userId} name={name} userRole="host" />
            </Card>
          </TextContentDiv>
          {windowWidth < 776 ? (
            <AvailableHosting mobile expanded={expandDateSection}>
              {expandDateSection ? (
                <Card mobile>
                  <Icon
                    type="close"
                    style={{
                      fontSize: '32px',
                      color: 'primary',
                      cursor: 'pointer',
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                    }}
                    onClick={this.toggleDateSection}
                  />
                  <CalendarDiv userRole={role}>
                    {role === 'host' && (
                      <SubHeadline>Your available Dates</SubHeadline>
                    )}
                    {role !== 'host' && (
                      <>
                        <MobileSubHeadline>Available hosting</MobileSubHeadline>
                        <ParagraphHeadline>
                          Choose a slot to view price and request a stay with
                          this host
                        </ParagraphHeadline>
                      </>
                    )}
                    <Calendar
                      currentUserId={currentUserId}
                      hostId={hostId}
                      role={role}
                      listingId={_id}
                      availableDates={availableDates}
                      internBookings={internBookings}
                      price={price}
                      adminView={role === 'admin'}
                      getHostProfile={this.getHostProfile}
                    />
                  </CalendarDiv>
                </Card>
              ) : (
                <Card mobileSmall>
                  <MobileSubHeadline>
                    View available dates & price to stay
                  </MobileSubHeadline>
                  <Button
                    type="secondary"
                    label="View dates"
                    width="180px"
                    onClick={this.toggleDateSection}
                  />
                </Card>
              )}
            </AvailableHosting>
          ) : (
            <AvailableHosting>
              <Card>
                <CalendarDiv userRole={role}>
                  {role === 'host' && (
                    <SubHeadline>Your available Dates</SubHeadline>
                  )}
                  {role !== 'host' && (
                    <>
                      <SubHeadline>Available hosting</SubHeadline>
                      <ParagraphHeadline>
                        Choose a slot to view price and request a stay with this
                        host
                      </ParagraphHeadline>
                    </>
                  )}
                  <Calendar
                    currentUserId={currentUserId}
                    hostId={hostId}
                    role={role}
                    listingId={_id}
                    availableDates={availableDates}
                    internBookings={internBookings}
                    price={price}
                    adminView={role === 'admin'}
                    getHostProfile={this.getHostProfile}
                  />
                </CalendarDiv>
              </Card>
            </AvailableHosting>
          )}
        </MainSection>
      </SideMenuLayout>
    );
  }
}
