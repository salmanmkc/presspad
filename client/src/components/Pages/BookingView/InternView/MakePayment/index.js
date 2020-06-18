import React from 'react';
import { Input } from 'antd';

import { H4, H4C, H7C, PS } from '../../../../Common/Typography';
import ButtonNew from '../../../../Common/ButtonNew';
import Icon from '../../../../Common/Icon';

import CodeLoading from './CodeLoading';

import {
  Wrapper,
  PriceWrapper,
  DiscountWrapper,
  DiscountInput,
  DisCountLoadingWrapper,
} from './MakePayment.style';

const MakePayment = ({
  handlePayNowClick,
  handleCouponChange,
  data,
  isNew,
}) => {
  const { fullPrice, couponInfo, paymentInfo } = data;
  console.log('info', data);
  const { couponCode, couponDiscount, isCouponLoading, error } = couponInfo;

  const { amount } = paymentInfo;

  const discountApplied = (couponDiscount / fullPrice) * 100;
  return (
    <Wrapper>
      <H4C>make a payment</H4C>
      <PriceWrapper>
        <PS>Full price for period:</PS>
        <H4 color="darkerGray">£{(fullPrice / 100).toFixed(2)}</H4>
      </PriceWrapper>
      {!isNew && (
        <PriceWrapper>
          <PS>Price for required payment:</PS>
          <H4 color="darkerGray">£{(amount / 100).toFixed(2)}</H4>
        </PriceWrapper>
      )}
      {isNew && (
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
