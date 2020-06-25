import React, { useState, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Collapse, message, Spin } from 'antd';
import { Elements } from 'react-stripe-elements';

import * as T from '../../../Common/Typography';
import Icon from '../../../Common/Icon';

import PayNowModal from './PayNowModal';
import UnpaidPaymentTable from './UnpaidPaymentTable';
import PaymentHistory from './PaymentHistory';

import * as S from './style';

import { API_PAYMENTS_URL } from '../../../../constants/apiRoutes';
import { Error500, BOOKING_VIEW_URL } from '../../../../constants/navRoutes';
import { SERVER_ERROR } from '../../../../constants/errorMessages';

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
  const [payNow, setPayNow] = useState({ openModal: false, installment: {} });
  const [limit, setLimit] = useState(2);
  const [state, dispatch] = useReducer(reducer, { loading: true, data: {} });
  const history = useHistory();

  const { paymentHistory, unpaidPayments } = state.data;

  async function fetchData() {
    try {
      dispatch({ type: 'loading' });
      const { data } = await axios.get(API_PAYMENTS_URL);
      const _unpaidPayments = data.unpaidPayments.filter(
        payment => !!payment.installments[0],
      );

      dispatch({
        type: 'success',
        data: {
          ...data,
          unpaidPayments: _unpaidPayments,
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
    <>
      <Elements>
        <PayNowModal
          payNow={payNow}
          setPayNow={setPayNow}
          fetchData={fetchData}
        />
      </Elements>
      <S.Wrapper>
        <T.H2C mb={7}>your payments</T.H2C>
        {unpaidPayments.slice(0, limit).map(booking => (
          <div>
            <T.H5C color="gray">booking with {booking.host}</T.H5C>
            <S.Link to={BOOKING_VIEW_URL.replace(':id', booking.bookingId)}>
              view booking
            </S.Link>
            <UnpaidPaymentTable
              installments={booking.installments}
              setPayNow={setPayNow}
            />
          </div>
        ))}
        {limit < unpaidPayments.length && (
          <S.ShowMore onClick={() => setLimit(limit + 1)}>show more</S.ShowMore>
        )}
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
            <PaymentHistory paymentHistory={paymentHistory} />
          </Panel>
        </S.CollapseWrapper>
      </S.Wrapper>
    </>
  );
};

export default HostPayments;
