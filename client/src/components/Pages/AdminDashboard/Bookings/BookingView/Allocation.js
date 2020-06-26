import React from 'react';
import { InputNumber } from 'antd';
import * as S from './style';
import { PBold, PXSBold } from '../../../../Common/Typography';
import { formatPrice } from '../../../../../helpers';

const formatter = val => {
  if (val.toString().match(/0+\d/)) {
    return `£ ${val}`
      .replace(/£ 0+/g, '£ ')
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return `£ ${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const Allocation = ({
  details,
  setRefundState,
  refundState,
  errors,
  setErrors,
}) => {
  // console.log('props', details);

  const { payedAmount = '', coupon = {} } = details;

  const handleRefundChange = (name, { value }) => {
    // only accept postive numbers
    setRefundState({ ...refundState, [name]: value > 0 ? value : 0 });
  };

  const validateRefund = () => {
    const {
      hostRefund,
      internRefund,
      organisationRefund,
      pressPadRefund,
    } = refundState;

    const total =
      hostRefund + internRefund + organisationRefund + pressPadRefund;

    const nothingLeft = total * 100 > payedAmount;

    setRefundState({
      ...refundState,
      sum: nothingLeft ? payedAmount : total * 100,
    });

    // error handling
    if (nothingLeft) {
      setErrors({
        ...errors,
        refundError: `Re-allocation must not exceed total amount (${formatPrice(
          payedAmount,
        )})`,
      });
    } else {
      setErrors({ ...errors, refundError: null });
    }
  };

  const inputStyle = {
    width: '300px',
    border: errors.refundError ? '1px solid red' : '1px solid #d9d9d9',
  };

  const {
    hostRefund,
    internRefund,
    organisationRefund,
    pressPadRefund,
    sum,
  } = refundState;

  return (
    <>
      <S.Row>
        <PBold>
          £{formatPrice(payedAmount)} has been paid so far. Please select how
          much to allocate to each user
        </PBold>
        <S.SubRow mt="2rem">
          {/* HOST AMOUNT */}
          <S.Column>
            <PBold>Host</PBold>
            <S.InputWrapper>
              <InputNumber
                step={1}
                value={hostRefund}
                size="large"
                onChange={value => handleRefundChange('hostRefund', { value })}
                onBlur={validateRefund}
                formatter={formatter}
                style={inputStyle}
              />
            </S.InputWrapper>
          </S.Column>
          {/* INTERN AMOUNT */}
          <S.Column>
            <PBold>Intern</PBold>
            <S.InputWrapper>
              <InputNumber
                step={1}
                value={internRefund}
                size="large"
                onChange={value =>
                  handleRefundChange('internRefund', { value })
                }
                onBlur={validateRefund}
                formatter={formatter}
                style={inputStyle}
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
              <InputNumber
                disabled={coupon && !coupon.discountRate}
                step={1}
                value={organisationRefund}
                size="large"
                onChange={value =>
                  handleRefundChange('organisationRefund', { value })
                }
                onBlur={validateRefund}
                formatter={formatter}
                style={inputStyle}
              />
            </S.InputWrapper>
          </S.Column>
          {/* PressPad amount */}
          <S.Column>
            <PBold>PressPad</PBold>
            <S.InputWrapper>
              <InputNumber
                step={1}
                value={pressPadRefund}
                size="large"
                onChange={value =>
                  handleRefundChange('pressPadRefund', { value })
                }
                onBlur={validateRefund}
                formatter={formatter}
                style={inputStyle}
              />
            </S.InputWrapper>
          </S.Column>
        </S.SubRow>
      </S.Row>
      <PBold style={{ marginTop: '2rem' }} color="lightBlue">
        £ {formatPrice(payedAmount - sum)} left to allocate
      </PBold>
      <PXSBold color="red">{errors.refundError}</PXSBold>
    </>
  );
};
export default Allocation;
