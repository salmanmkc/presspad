import React from 'react';
import moment from 'moment';
import * as S from './style';
import { PS, PBold, PXS, PXSBold, H7C } from '../../../../Common/Typography';
import { Select, Input } from '../../../../Common/AntdWrappers';
import GoBackComponent from '../../../../Common/GoBack';
import Icon from '../../../../Common/Icon';
import FileDownload from '../../../../Common/Files/FileDownload';
import ButtonNew from '../../../../Common/ButtonNew';

import { formatPrice } from '../../../../../helpers';

const { Option } = Select;
const selectStyles = {
  width: '245px',
  height: '50px',
  marginTop: '1rem',
};
const detailsStyles = {
  headline: {
    marginBottom: '0.5rem',
  },
};

// TODO ADD GO BACK BUTTON TO GO BACK AND TOGGLE SEARCH BAR
const BookingReview = ({
  toggleSearchBar,
  toggleBookingView,
  details,
  reviewBooking,
  setReviewBooking,
}) => {
  console.log('props', details);

  const {
    cancellationDetails = {},
    host = {},
    intern = {},
    startDate = '',
    endDate = '',
    payedAmount = '',
    price = '',
    coupon = {},
  } = details;
  const { internship } = intern;

  const cancellingUserDetails =
    cancellationDetails && cancellationDetails.cancelledBy === intern._id
      ? { name: intern.name, role: 'intern' }
      : { name: host.name, role: 'host' };

  return (
    <>
      <S.GoBackWrapper>
        <GoBackComponent
          onClick={() => {
            setReviewBooking(false);
            toggleSearchBar();
            toggleBookingView();
          }}
        />
      </S.GoBackWrapper>

      {reviewBooking ? (
        <S.Wrapper>
          <S.ReviewWrapper>
            <S.Row mt="-0.2rem">
              <H7C style={detailsStyles.headline} color="lightBlue">
                cancel requested by
              </H7C>
              <PS>
                {cancellingUserDetails.name} ({cancellingUserDetails.role})
              </PS>
            </S.Row>

            <S.Row>
              <H7C style={detailsStyles.headline} color="lightBlue">
                reason provided
              </H7C>
              <PS>{cancellationDetails.cancellingUserMessage}</PS>
            </S.Row>

            {/* BOOKING DETAILS */}
            <S.Row>
              <H7C style={detailsStyles.headline} color="lightBlue">
                booking details
              </H7C>
              <S.SubRow>
                <S.Column>
                  <PXSBold>Start Date of Stay</PXSBold>
                  <PXS>{moment(startDate).format('DD/MM/YYYY')}</PXS>
                </S.Column>
                <S.Column>
                  <PXSBold>Length of Stay</PXSBold>
                  <PXS>
                    {moment(endDate).diff(moment(startDate), 'days')} days
                  </PXS>
                </S.Column>
                <S.Column>
                  <PXSBold>Paid by Organisation</PXSBold>
                  {coupon && coupon.discountRate ? (
                    <PXS>
                      {coupon.discountRate}% ({coupon.Organisation})
                    </PXS>
                  ) : (
                    'N/A'
                  )}
                </S.Column>
                <S.Column>
                  <PXSBold>Paid so far</PXSBold>
                  <PXS>{formatPrice(payedAmount)}</PXS>
                </S.Column>
                <S.Column>
                  <PXSBold>Total cost</PXSBold>
                  <PXS>{formatPrice(price)}</PXS>
                </S.Column>
              </S.SubRow>
            </S.Row>

            {/* INTERNSHIP DETAILS */}
            <S.Row>
              <H7C style={detailsStyles.headline} color="lightBlue">
                internship details
              </H7C>
              <S.SubRow>
                <S.Column>
                  <PXSBold>Organisation</PXSBold>
                  <PXS>{internship.Organisation}</PXS>
                </S.Column>
                <S.Column>
                  <PXSBold>Contact Name</PXSBold>
                  <PXS>{internship['Contact Details'].name}</PXS>
                </S.Column>
                <S.Column>
                  <PXSBold>Contact Email</PXSBold>
                  <PXS>
                    {' '}
                    <a
                      href={`mailto:${internship['Contact Details'].email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {internship['Contact Details'].email}
                    </a>
                  </PXS>
                </S.Column>
                <S.Column>
                  <PXSBold>Contact Number</PXSBold>
                  <PXS>{internship['Contact Details'].phoneNumber}</PXS>
                </S.Column>
                <S.Column>
                  <PXSBold>Proof of Internship</PXSBold>
                  <PXS style={{ textDecoration: 'underline' }}>
                    {internship['Proof of Internship'].fileName ? (
                      <FileDownload
                        style={{
                          marginBottom: '10px',
                          border: '1px red solid',
                        }}
                        url={internship['Proof of Internship'].fileName}
                        fileName="Click to download"
                      />
                    ) : (
                      <PXS>Missing file</PXS>
                    )}
                  </PXS>
                </S.Column>
              </S.SubRow>
            </S.Row>

            {/* HOST DETAILS */}
            <S.Row>
              <H7C style={detailsStyles.headline} color="lightBlue">
                host details
              </H7C>
              <S.SubRow>
                <S.Column>
                  <PXSBold>Name</PXSBold>
                  <PXS>{host.name}</PXS>
                </S.Column>
                <S.Column>
                  <PXSBold>Contact Email</PXSBold>
                  <PXS>
                    <a
                      href={`mailto:${host.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {host.email}
                    </a>
                  </PXS>
                </S.Column>
                <S.Column>
                  <PXSBold>Contact Number</PXSBold>
                  <PXS>{host.phone}</PXS>
                </S.Column>
              </S.SubRow>
            </S.Row>

            {/* INTERN DETAILS */}
            <S.Row>
              <H7C style={detailsStyles.headline} color="lightBlue">
                intern details
              </H7C>
              <S.SubRow>
                <S.Column>
                  <PXSBold>Name</PXSBold>
                  <PXS>{intern.name}</PXS>
                </S.Column>
                <S.Column>
                  <PXSBold>Contact Email</PXSBold>
                  <PXS>
                    <a
                      href={`mailto:${intern.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {intern.email}
                    </a>
                  </PXS>
                </S.Column>
                <S.Column>
                  <PXSBold>Contact Number</PXSBold>
                  <PXS>{intern.phone}</PXS>
                </S.Column>
              </S.SubRow>
            </S.Row>
          </S.ReviewWrapper>

          {/* ADMIN ACTIONS */}
          <S.ActionsWrapper>
            <S.ActionsContainer>
              <PBold color="darkGray">ADMIN ACTIONS</PBold>

              {/* REASON SELECT */}
              <S.Row mt="2rem">
                <PBold>Reason for cancelling</PBold>
                <Select
                  placeholder="Select"
                  style={selectStyles}
                  // onSelect={value => handleAction(value, booking)}
                >
                  <Option value="legitimate">Legitimate</Option>
                  <Option value="illegitimate">Illegitimate</Option>
                </Select>
              </S.Row>

              {/* RESPONSIBLE SELECT */}
              <S.Row>
                <PBold>Who is responsible for the cancellation?</PBold>
                <Select
                  style={selectStyles}
                  placeholder="Select"
                  // onSelect={value => handleAction(value, booking)}
                >
                  <Option value="intern">Intern</Option>
                  <Option value="host">Host</Option>
                  <Option value="organisation">Organisation</Option>
                  <Option value="presspad">PressPad</Option>
                </Select>
              </S.Row>

              {/* ALLOCATION SECTION */}
              <S.Row>
                <PBold>
                  £{formatPrice(payedAmount)} has been paid so far. Please
                  select how much to allocate to each user
                </PBold>
                <S.SubRow mt="2rem">
                  {/* HOST AMOUNT */}
                  <S.Column>
                    <PBold>Host</PBold>
                    <S.InputWrapper>
                      <Input
                        placeholder="Enter amount..."
                        name="hostAmount"
                        style={{ width: '100%' }}
                        // value={state.organisation}
                        // onChange={onInputChange}
                        // error={errors.organisation}
                      />
                    </S.InputWrapper>
                  </S.Column>
                  {/* INTERN AMOUNT */}
                  <S.Column>
                    <PBold>Intern</PBold>
                    <S.InputWrapper>
                      <Input
                        placeholder="Enter amount..."
                        name="internAmount"
                        style={{ width: '100%' }}
                        // value={state.organisation}
                        // onChange={onInputChange}
                        // error={errors.organisation}
                      />
                    </S.InputWrapper>
                  </S.Column>
                </S.SubRow>
              </S.Row>
              <S.Row>
                <S.SubRow mt="-2rem">
                  {/* ORG AMOUNT */}
                  <S.Column>
                    <PBold>Organisation</PBold>
                    <S.InputWrapper>
                      <Input
                        placeholder="Enter amount..."
                        name="orgAmount"
                        style={{ width: '100%' }}
                        disabled={!(coupon && coupon.discountRate)}
                        // value={state.organisation}
                        // onChange={onInputChange}
                        // error={errors.organisation}
                      />
                    </S.InputWrapper>
                  </S.Column>
                  {/* PressPad amount */}
                  <S.Column>
                    <PBold>PressPad</PBold>
                    <S.InputWrapper>
                      <Input
                        placeholder="Enter amount..."
                        name="pressPadAmount"
                        style={{ width: '100%' }}
                        // value={state.organisation}
                        // onChange={onInputChange}
                        // error={errors.organisation}
                      />
                    </S.InputWrapper>
                  </S.Column>
                </S.SubRow>
              </S.Row>
              <PBold style={{ marginTop: '2rem' }} color="lightBlue">
                £140 left to allocate
              </PBold>
              {/* NOTES SECTION */}
              <S.Row>
                <S.Column>
                  <PBold>PressPad Notes</PBold>
                  <PXS style={{ marginTop: '1rem', width: '432px' }}>
                    Add any notes that maybe useful for future reference (e.g.
                    why you decided it was a legitimate / illegitimate
                    cancellation or why you’ve allocated the money in this way).
                  </PXS>
                  <S.TextArea>
                    <Input
                      style={{ width: '432px', height: 'auto' }}
                      textArea
                      placeholder="Write your reasons here..."
                    />
                  </S.TextArea>
                </S.Column>
              </S.Row>
            </S.ActionsContainer>

            {/* POLICY SECTION */}
            <S.PolicyContainer>
              <S.IconWrapper>
                <Icon icon="explanationMarkCircle" width="40px" height="40px" />
              </S.IconWrapper>
              <S.PolicyContent>
                <PBold color="gray">
                  Remember to check with PressPad internal policy on what makes
                  a booking legitimate or illegitimate. Examples include:
                </PBold>
                <S.List>
                  <S.ListItem>
                    <PXS>
                      - Example one. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do eiusmod tempor
                    </PXS>
                  </S.ListItem>
                  <S.ListItem>
                    <PXS>
                      - Example one. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do eiusmod tempor
                    </PXS>
                  </S.ListItem>
                  <S.ListItem>
                    <PXS>
                      - Example one. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do eiusmod tempor
                    </PXS>
                  </S.ListItem>
                  <S.ListItem>
                    <PXS>
                      - Example one. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do eiusmod tempor
                    </PXS>
                  </S.ListItem>
                </S.List>
              </S.PolicyContent>
            </S.PolicyContainer>
          </S.ActionsWrapper>
          <ButtonNew
            large
            type="primary"
            mt="8"
            color="blue"
            // onClick={() =>
            //   history.push(INTERN_PROFILE.replace(':id', internId))
            // }
          >
            confirm cancellation
          </ButtonNew>
        </S.Wrapper>
      ) : (
        <h1>details mode</h1>
      )}
    </>
  );
};
export default BookingReview;
