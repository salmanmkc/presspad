import React from 'react';
import moment from 'moment';

import { Wrapper, PaymentLine } from './style';
import * as T from '../../../../Common/Typography';
import Icon from '../../../../Common/Icon';

import { getDueDateText } from '../../helpers';
import { formatPrice } from '../../../../../helpers';

const PaymentPlan = ({ installments }) => (
  <Wrapper>
    <T.H6C mb={4}>payment plan:</T.H6C>
    {!installments[0] ? (
      <T.P>You do not have to pay anything</T.P>
    ) : (
      installments
        .sort((a, b) => moment(a.dueDate).diff(b.dueDate, 'd'))
        .map(({ _id, key, amount, dueDate, transaction }, i) => (
          <PaymentLine key={key || _id} transaction={transaction}>
            {transaction && (
              <Icon
                icon="checkMark"
                width={20}
                height={20}
                color="lightBlue"
                customStyle={{
                  position: 'absolute',
                  transform: 'translateX(-100%)',
                  left: '-10px',
                  top: '4px',
                }}
              />
            )}
            {key ? (
              <T.P>{i === 0 ? 'Today' : getDueDateText(dueDate)}</T.P>
            ) : (
              <T.P>{getDueDateText(dueDate)}</T.P>
            )}
            <T.P>£{formatPrice(amount)}</T.P>
          </PaymentLine>
        ))
    )}
  </Wrapper>
);
export default PaymentPlan;
