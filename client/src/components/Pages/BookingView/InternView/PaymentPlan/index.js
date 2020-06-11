import React from 'react';

import { Wrapper, PaymentLine } from './style';
import * as T from '../../../../Common/Typography';

import { getDueDateText } from '../../helpers';

const PaymentPlan = ({ installments }) => (
  <Wrapper>
    <T.H6C mb={4}>payment plan:</T.H6C>
    {!installments[0] ? (
      <T.P>You do not have to pay anything</T.P>
    ) : (
      installments.map(({ amount, dueDate, key }, i) => (
        <PaymentLine key={key}>
          <T.P>{i === 0 ? 'Today' : getDueDateText(dueDate)}</T.P>
          <T.P>£{(amount / 100).toFixed(2)}</T.P>
        </PaymentLine>
      ))
    )}
  </Wrapper>
);
export default PaymentPlan;
