import React, { useEffect } from 'react';
import { Input, Checkbox } from 'antd';

import { H4, H4C, H7C, PS } from '../../../../Common/Typography';
import * as T from '../../../../Common/Typography';
import ButtonNew from '../../../../Common/ButtonNew';
import Icon from '../../../../Common/Icon';

import CodeLoading from './CodeLoading';
import PaymentPlan from '../PaymentPlan';

import {
  getRemainingPrice,
  getFirstUnpaidInstallment,
  getDueDateText,
} from '../../helpers';

import { formatPrice } from '../../../../../helpers';

import {
  Wrapper,
  PriceWrapper,
  DiscountWrapper,
  DiscountInput,
  DisCountLoadingWrapper,
  PaymentMethodWrapper,
  PreviousPriceWrapper,
  MessageContainer,
} from './MakePayment.style';

const MakePayment = ({
  handlePayNowClick,
  handleConfirmWithoutPayClick,
  handlePaymentMethod,
  handleCouponChange,
  paymentDue,
  paymentOverdue,
  data,
  isNew,
}) => {
  const {
    fullPrice,
    couponInfo,
    usedCoupon = {},
    bookingDays,
    paymentInfo = {},
    installments = [],
    updatedInstallments = [],
    upfront,
    bursaryDiscount,
  } = data;
  const {
    couponCode,
    couponDiscount,
    discountRate,
    isCouponLoading,
    error,
  } = couponInfo;

  useEffect(() => {
    if (isNew) {
      handleCouponChange({ target: { value: usedCoupon.code } });
    }
  }, [handleCouponChange, isNew, usedCoupon.code]);

  let netAmount = fullPrice - couponDiscount - bursaryDiscount;

  useEffect(() => {
    if (netAmount <= 0) {
      handlePaymentMethod(true);
    }
  }, [handlePaymentMethod, netAmount]);

  let { amount } = paymentInfo;
  if (!upfront && isNew) {
    amount = paymentInfo[0] ? paymentInfo[0].amount : 0;
  }

  const discountApplied = discountRate;

  if (isNew) {
    return (
      <Wrapper>
        <H4C>make a payment</H4C>
        {bursaryDiscount > 0 && (
          <MessageContainer>
            <Icon icon="circleTick" color="lightBlue" width="25px" />
            <T.PXSBold style={{ marginLeft: '0.5rem' }} color="lightBlue">
              PressPad Bursary Applied!
            </T.PXSBold>
          </MessageContainer>
        )}
        <PriceWrapper>
          <PS>Full price for period:</PS>

          {couponDiscount > 0 || bursaryDiscount > 0 ? (
            <PreviousPriceWrapper>
              <T.PBold>£{formatPrice(netAmount)}</T.PBold>
              <T.PXSBold
                color="gray"
                style={{
                  textDecoration: 'line-through',
                  marginLeft: '0.5rem',
                }}
              >
                £{formatPrice(fullPrice)}
              </T.PXSBold>
            </PreviousPriceWrapper>
          ) : (
            <H4 color="darkerGray">£{formatPrice(netAmount)}</H4>
          )}
        </PriceWrapper>
        <DiscountWrapper>
          <PS>
            Discount Code:{' '}
            <Icon icon="questionMark" width="16px" height="16px" color="gray" />
          </PS>
          <DiscountInput>
            <Input
              name="couponCode"
              type="text"
              id="couponCode"
              placeholder="Type code..."
              value={couponCode}
              onChange={handleCouponChange}
              autocomplete="off"
            />
          </DiscountInput>
        </DiscountWrapper>
        {error && <H7C color="pink">{error}</H7C>}
        {isCouponLoading && (
          <DisCountLoadingWrapper>
            <CodeLoading />
          </DisCountLoadingWrapper>
        )}
        {!isCouponLoading && !error && discountApplied > 0 && (
          <H7C color="pink">{discountApplied.toFixed()}% discount applied</H7C>
        )}
        <PaymentMethodWrapper>
          <Checkbox
            checked={upfront}
            onChange={() => handlePaymentMethod(true)}
          >
            <T.P as="span">Pay up front</T.P>
          </Checkbox>
          <Checkbox
            checked={!upfront}
            onChange={() => handlePaymentMethod(false)}
            disabled={bookingDays < 56 || netAmount <= 0}
          >
            <T.P disabled={bookingDays < 56 || netAmount <= 0} as="span">
              Pay in 4-week installments
            </T.P>
          </Checkbox>
        </PaymentMethodWrapper>
        {!upfront && <PaymentPlan installments={paymentInfo} />}
        {netAmount <= 0 ? (
          <ButtonNew
            outline
            type="tertiary"
            mt="6"
            mb="7"
            onClick={() => handleConfirmWithoutPayClick(true)}
          >
            Confirm now
          </ButtonNew>
        ) : (
          <ButtonNew
            outline
            type="tertiary"
            mt="6"
            mb="7"
            onClick={() => handlePayNowClick(true)}
          >
            Pay £{formatPrice(amount)} now
          </ButtonNew>
        )}
      </Wrapper>
    );
  }

  const remainingPrice = getRemainingPrice(installments);

  const firstUnpaid = getFirstUnpaidInstallment(installments);
  netAmount = remainingPrice - couponDiscount;
  return (
    <>
      {remainingPrice > 0 && !paymentDue && !paymentOverdue && (
        <T.P>
          Your next payment is due on{' '}
          <b>{getDueDateText(firstUnpaid.dueDate)}</b> You can make the payment
          below.
        </T.P>
      )}
      {paymentDue && (
        <T.P mt="5" mb="1">
          Your next payment is due! Please complete your payment below:
        </T.P>
      )}
      {paymentOverdue && (
        <T.P mt="5" mb="1">
          Your next payment is now 7 days over due! Please complete your payment
          below within the next 48 hours or your booking will be terminated.
        </T.P>
      )}
      <Wrapper>
        <H4C>make a payment</H4C>
        <PriceWrapper>
          <PS>Remaining cost for period:</PS>
          {usedCoupon.code || couponDiscount > 0 ? (
            <PreviousPriceWrapper>
              <T.PBold>£{formatPrice(netAmount)}</T.PBold>
              <T.PXSBold
                color="lightGray"
                style={{
                  textDecoration: 'line-through',
                  marginLeft: '0.5rem',
                }}
              >
                £{formatPrice(fullPrice)}
              </T.PXSBold>
            </PreviousPriceWrapper>
          ) : (
            <H4 color="darkerGray">£{formatPrice(remainingPrice)}</H4>
          )}
        </PriceWrapper>
        {(remainingPrice > 0 || usedCoupon.code) && (
          <>
            <DiscountWrapper>
              <PS>
                Discount Code:{' '}
                <Icon
                  icon="questionMark"
                  width="16px"
                  height="16px"
                  color="gray"
                />
              </PS>

              <DiscountInput>
                {usedCoupon.code ? (
                  <T.H6C style={{ color: 'black' }}>{usedCoupon.code}</T.H6C>
                ) : (
                  <Input
                    name="couponCode"
                    type="text"
                    id="couponCode"
                    placeholder="Type code..."
                    value={couponCode}
                    onChange={handleCouponChange}
                    autoComplete="off"
                  />
                )}
              </DiscountInput>
            </DiscountWrapper>
            {error && <H7C color="pink">{error}</H7C>}
            {isCouponLoading && (
              <DisCountLoadingWrapper>
                <CodeLoading />
              </DisCountLoadingWrapper>
            )}
            {!isCouponLoading &&
              !error &&
              (usedCoupon.discountRate || discountApplied > 0) && (
                <H7C color="pink">
                  {usedCoupon.code
                    ? usedCoupon.discountRate
                    : discountApplied.toFixed()}
                  % discount applied
                </H7C>
              )}
          </>
        )}
        <PaymentPlan installments={updatedInstallments} />
        {netAmount > 0 && (
          <ButtonNew
            outline
            type="tertiary"
            mt="6"
            mb="7"
            onClick={() => handlePayNowClick(true)}
          >
            Pay £{formatPrice(amount)} now
          </ButtonNew>
        )}
        {netAmount <= 0 && remainingPrice > 0 && (
          <ButtonNew
            outline
            type="tertiary"
            mt="6"
            mb="7"
            onClick={() => handleConfirmWithoutPayClick(true)}
          >
            Confirm now
          </ButtonNew>
        )}
      </Wrapper>
    </>
  );
};

export default MakePayment;
