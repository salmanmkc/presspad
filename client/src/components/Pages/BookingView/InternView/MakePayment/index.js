import React from 'react';
import { Input, Checkbox } from 'antd';

import { H4, H4C, H7C, PS } from '../../../../Common/Typography';
import * as T from '../../../../Common/Typography';
import ButtonNew from '../../../../Common/ButtonNew';
import Icon from '../../../../Common/Icon';

import CodeLoading from './CodeLoading';
import PaymentPlan from '../PaymentPlan';

import {
  Wrapper,
  PriceWrapper,
  DiscountWrapper,
  DiscountInput,
  DisCountLoadingWrapper,
  PaymentMethodWrapper,
  PreviousPriceWrapper,
} from './MakePayment.style';

const MakePayment = ({
  handlePayNowClick,
  handlePaymentMethod,
  handleCouponChange,
  data,
  isNew,
}) => {
  const { fullPrice, couponInfo, bookingDays, paymentInfo, upfront } = data;
  const { couponCode, couponDiscount, isCouponLoading, error } = couponInfo;

  let { amount } = paymentInfo;
  if (!upfront) {
    amount = paymentInfo[0] ? paymentInfo[0].amount : 0;
  }

  const discountApplied = (couponDiscount / fullPrice) * 100;
  const netAmount = fullPrice - couponDiscount;
  // console.log({ couponInfo });

  return (
    <Wrapper>
      <H4C>make a payment</H4C>
      <PriceWrapper>
        <PS>Full price for period:</PS>
        {couponDiscount > 0 ? (
          <PreviousPriceWrapper>
            <T.PBold>£{(netAmount / 100).toFixed(2)}</T.PBold>
            <T.PXSBold
              color="gray"
              style={{
                textDecoration: 'line-through',
                marginLeft: '0.5rem',
              }}
            >
              £{(fullPrice / 100).toFixed(2)}
            </T.PXSBold>
          </PreviousPriceWrapper>
        ) : (
          <H4 color="darkerGray">£{(netAmount / 100).toFixed(2)}</H4>
        )}
      </PriceWrapper>
      {!isNew ? (
        <PriceWrapper>
          <PS>Price for required payment:</PS>
          <H4 color="darkerGray">£{(amount / 100).toFixed(2)}</H4>
        </PriceWrapper>
      ) : (
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
          {!isCouponLoading && !error && (
            <H7C color="gray">
              {discountApplied.toFixed()}% discount applied
            </H7C>
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
              disabled={bookingDays < 56}
            >
              <T.P disabled={bookingDays < 56} as="span">
                Pay in 4-week installments
              </T.P>
            </Checkbox>
          </PaymentMethodWrapper>
          {!upfront && <PaymentPlan installments={paymentInfo} />}
        </>
      )}
      <ButtonNew
        outline
        type="tertiary"
        mt="6"
        mb="7"
        onClick={() => handlePayNowClick(true)}
      >
        Pay £{(amount / 100).toFixed(2)} now
      </ButtonNew>
    </Wrapper>
  );
};

export default MakePayment;
