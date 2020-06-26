import React, { useState, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Collapse, message, Spin } from 'antd';

import WalletBox from './WalletBox';
import InfoBox from './InfoBox';
import PaymentHistory from './PaymentHistory';
import WithdrawalRequests from './WithdrawalRequests';

import * as T from '../../../Common/Typography';
import Icon from '../../../Common/Icon';

import * as S from './style';

import { API_PAYMENTS_URL } from '../../../../constants/apiRoutes';
import { Error500 } from '../../../../constants/navRoutes';
import { SERVER_ERROR } from '../../../../constants/errorMessages';
import { reformatPaymentsHistory } from './utils';

const { Panel } = Collapse;

const reducer = (state, action) => {
  switch (action.type) {
    case 'success':
      return {
        data: action.data,
        loading: false,
        error: '',
      };
    case 'loading':
      return {
        ...state,
        loading: true,
        error: '',
      };

    default:
      throw new Error('invalid action type');
  }
};

const HostPayments = () => {
  const [paymentCollapse, setPaymentCollapse] = useState(true);
  const [withdrawalCollapse, setWithdrawalCollapse] = useState(false);
  const [state, dispatch] = useReducer(reducer, { loading: true, data: {} });
  const history = useHistory();

  const {
    account,
    internsHosted,
    paymentHistory,
    withdrawalRequests,
    pendingWithdrawn,
    pendingPayment,
    withdrawn,
  } = state.data;

  async function fetchData() {
    try {
      dispatch({ type: 'loading' });
      const { data } = await axios.get(API_PAYMENTS_URL);
      const [_pendingWithdrawn, _withdrawn] = data.withdrawalRequests.reduce(
        (acc, curr) => {
          if (curr.status === 'pending') {
            acc[0] += curr.amount;
          } else if (curr.status === 'transfered') {
            acc[1] += curr.amount;
          }
          return acc;
        },
        [0, 0],
      );
      dispatch({
        type: 'success',
        data: {
          ...data,
          pendingWithdrawn: _pendingWithdrawn,
          withdrawn: _withdrawn,
        },
      });
    } catch (error) {
      message.error(SERVER_ERROR).then(() => {
        history.push(Error500);
      });
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (state.loading) {
    return <Spin size="large" />;
  }

  return (
    <S.Wrapper>
      <T.H2C>your payments</T.H2C>
      <T.PS mt={4}>
        This is where you can view all payments received and due through your
        PressPad hosting. You can also decide whether to withdraw your earnings
        or donate to PressPad to help continue our work.
      </T.PS>
      <T.PS mt={6}>
        Please remember that payments for a booking will only be available to
        withdraw once that booking is complete.
      </T.PS>
      <S.CardsWrapper>
        <WalletBox
          currentBalance={account.currentBalance}
          pendingPayments={pendingPayment}
          pendingWithdrawn={pendingWithdrawn}
          fetchData={fetchData}
        />
        <InfoBox
          pendingPayments={pendingPayment}
          pendingWithdrawn={pendingWithdrawn}
          account={account}
          internsHosted={internsHosted.length}
          withdrawn={withdrawn}
        />
      </S.CardsWrapper>
      <S.CollapseWrapper
        bordered={false}
        defaultActiveKey={1}
        onChange={key => {
          setPaymentCollapse(!!key[0]);
        }}
      >
        <Panel
          header={
            <T.H4C>
              PAYMENT HISTORY{' '}
              <Icon
                icon="arrow"
                direction={paymentCollapse ? 'up' : 'down'}
                width={24}
                customStyle={{
                  verticalAlign: 'middle',
                  marginLeft: 15,
                  marginTop: -2,
                }}
              />
            </T.H4C>
          }
          key="1"
          showArrow={false}
        >
          <PaymentHistory
            paymentHistory={reformatPaymentsHistory(paymentHistory)}
          />
        </Panel>
      </S.CollapseWrapper>
      <S.CollapseWrapper
        bordered={false}
        onChange={key => {
          setWithdrawalCollapse(!!key[0]);
        }}
      >
        <Panel
          header={
            <T.H4C>
              WITHDRAWAL REQUESTS
              <Icon
                icon="arrow"
                direction={withdrawalCollapse ? 'up' : 'down'}
                width={24}
                customStyle={{
                  verticalAlign: 'middle',
                  marginLeft: 15,
                  marginTop: -2,
                }}
              />
            </T.H4C>
          }
          key="1"
          showArrow={false}
        >
          <S.TableWrapper>
            <WithdrawalRequests withdrawalRequests={withdrawalRequests} />
          </S.TableWrapper>
        </Panel>
      </S.CollapseWrapper>
    </S.Wrapper>
  );
};

export default HostPayments;
