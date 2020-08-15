import React from 'react';

import * as S from './style';

import { PBold, PXS, PXSBold } from '../../../../Common/Typography';
import { Select, Input } from '../../../../Common/Inputs';

import Allocation from './Allocation';
import Policy from './Policy';

const selectStyles = error => ({
  width: '245px',
  height: '50px',
  marginTop: '1rem',
  border: error ? '1px solid red' : '1px solid #d9d9d9',
});

const cancelReasonOptions = [
  { label: 'legitimate', key: 'legitimate', value: 'legitimate' },
  { label: 'illegitimate', value: 'illegitimate', key: 'illegitimate' },
];

const responsibleOptions = [
  { label: 'intern', value: 'intern' },
  { label: 'host', value: 'host' },
  { label: 'organisation', value: 'organisation' },
  { label: 'presspad', value: 'presspad' },
];

const AdminActions = ({
  details,
  cancelBookingState,
  setCancelBookingState,
  refundState,
  setRefundState,
  errors,
  setErrors,
}) => {
  const handleInputChange = e => {
    const {
      target: { name, value },
    } = e;
    setCancelBookingState({ ...cancelBookingState, [name]: value });
  };

  const handleSelect = (value, option, type) => {
    setCancelBookingState({ ...cancelBookingState, [type]: value });
  };

  return (
    <S.ActionsWrapper>
      <S.ActionsContainer>
        <PBold color="darkGray">ADMIN ACTIONS</PBold>
        {/* REASON SELECT */}
        <S.Row mt="2rem">
          <PBold>Reason for cancelling</PBold>
          <Select
            placeholder="Select"
            style={selectStyles(errors.cancellationReason)}
            onChange={(value, option) =>
              handleSelect(value, option, 'cancellationReason')
            }
            options={cancelReasonOptions}
          />
          <PXSBold mt={2} color="red">
            {errors.cancellationReason}
          </PXSBold>
        </S.Row>
        {/* RESPONSIBLE SELECT */}
        <S.Row>
          <PBold>Who is responsible for the cancellation?</PBold>
          <Select
            style={selectStyles(errors.responsibleParty)}
            placeholder="Select"
            onChange={(value, option) =>
              handleSelect(value, option, 'responsibleParty')
            }
            options={responsibleOptions}
          />
          <PXSBold mt={2} color="red">
            {errors.responsibleParty}
          </PXSBold>
        </S.Row>

        {/* ALLOCATION SECTION */}
        <Allocation
          details={details}
          setRefundState={setRefundState}
          refundState={refundState}
          errors={errors}
          setErrors={setErrors}
        />

        <PXSBold mt={2} color="red">
          {errors.sum}
        </PXSBold>
        {/* NOTES SECTION */}
        <S.Row>
          <S.Column>
            <PBold>PressPad Notes</PBold>
            <PXS style={{ marginTop: '1rem', width: '432px' }}>
              Add any notes that maybe useful for future reference (e.g. why you
              decided it was a legitimate / illegitimate cancellation or why
              you’ve allocated the money in this way).
            </PXS>
            <S.TextArea>
              <Input
                style={{ width: '432px', height: 'auto' }}
                textArea
                placeholder="Write your reasons here..."
                name="notes"
                onChange={handleInputChange}
                value={cancelBookingState.notes}
              />
            </S.TextArea>
          </S.Column>
        </S.Row>
      </S.ActionsContainer>
      {/* POLICY SECTION */}
      <Policy />
    </S.ActionsWrapper>
  );
};
export default AdminActions;
