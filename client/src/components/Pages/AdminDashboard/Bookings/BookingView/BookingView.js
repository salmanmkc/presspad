import React, { useState } from 'react';

import * as S from './style';
import { PBold, PXS } from '../../../../Common/Typography';
import { Select, Input } from '../../../../Common/AntdWrappers';
import GoBackComponent from '../../../../Common/GoBack';

import ButtonNew from '../../../../Common/ButtonNew';
import BookingCancellationDetails from './BookingCancellationDetails';
import Policy from './Policy';

import { formatPrice } from '../../../../../helpers';

const { Option } = Select;

const selectStyles = {
  width: '245px',
  height: '50px',
  marginTop: '1rem',
};

const BookingReview = ({
  toggleSearchBar,
  toggleBookingView,
  details,
  reviewBooking,
  setReviewBooking,
}) => {
  // console.log('props', details);

  const { payedAmount = '', coupon = {} } = details;

  const [cancelBookingState, setCancelBookingState] = useState({
    cancellationReason: '',
    responsibleParty: '',
    notes: '',
  });

  const [refundState, setRefundState] = useState({
    hostRefund: 0,
    internRefund: 0,
    organisationRefund: 0,
    pressPadRefund: 0,
    sum: 0,
  });

  const handleInputChange = e => {
    const {
      target: { name, value },
    } = e;
    setCancelBookingState({ ...cancelBookingState, [name]: value });
  };

  const handleRefundChange = e => {
    const {
      target: { name, value },
    } = e;

    setRefundState({ ...refundState, [name]: parseInt(value, 0) });
  };

  const handleRefundBlur = () => {
    const {
      hostRefund,
      internRefund,
      organisationRefund,
      pressPadRefund,
    } = refundState;
    setRefundState({
      ...refundState,
      sum: hostRefund + internRefund + organisationRefund + pressPadRefund,
    });
    // let sum = hostRefund + internRefund + organisationRefund + pressPadRefund;
  };

  const handleSelect = (value, option) => {
    const { label } = option;
    setCancelBookingState({ ...cancelBookingState, [label]: value });
  };
  console.log(refundState.sum);
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
          <BookingCancellationDetails details={details} />

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
                  onSelect={(value, option) => handleSelect(value, option)}
                >
                  <Option
                    label="cancellationReason"
                    key="legitimate"
                    value="legitimate"
                  >
                    Legitimate
                  </Option>
                  <Option
                    label="cancellationReason"
                    value="illegitimate"
                    key="illegitimate"
                  >
                    Illegitimate
                  </Option>
                </Select>
              </S.Row>

              {/* RESPONSIBLE SELECT */}
              <S.Row>
                <PBold>Who is responsible for the cancellation?</PBold>
                <Select
                  style={selectStyles}
                  placeholder="Select"
                  onSelect={(value, option) => handleSelect(value, option)}
                >
                  <Option label="responsibleParty" value="intern">
                    Intern
                  </Option>
                  <Option label="responsibleParty" value="host">
                    Host
                  </Option>
                  <Option label="responsibleParty" value="organisation">
                    Organisation
                  </Option>
                  <Option label="responsibleParty" value="presspad">
                    PressPad
                  </Option>
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
                        name="hostRefund"
                        type="number"
                        min="0"
                        max={formatPrice(payedAmount)}
                        style={{ width: '100%' }}
                        onChange={handleRefundChange}
                        onBlur={handleRefundBlur}
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
                        name="internRefund"
                        style={{ width: '100%' }}
                        // value={state.organisation}
                        onChange={handleRefundChange}
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
                        name="organisationRefund"
                        style={{ width: '100%' }}
                        disabled={!(coupon && coupon.discountRate)}
                        // value={state.organisation}
                        onChange={handleRefundChange}
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
                        name="pressPadRefund"
                        style={{ width: '100%' }}
                        // value={state.organisation}
                        onChange={handleRefundChange}
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
                      name="notes"
                      onChange={handleInputChange}
                    />
                  </S.TextArea>
                </S.Column>
              </S.Row>
            </S.ActionsContainer>

            {/* POLICY SECTION */}
            <Policy />
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
