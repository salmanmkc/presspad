import React, { useReducer } from 'react';
import axios from 'axios';
import { Modal, Button, Skeleton, Alert } from 'antd';
import { useHistory } from 'react-router-dom';

import * as S from './PaymentsPlan.style';
import { API_INTERN_PAYMENT_URL } from '../../../../constants/apiRoutes';

const initialState = {
  success: false,
  loading: false,
  error: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'success':
      return {
        success: true,
        loading: false,
        error: '',
      };
    case 'loading':
      return {
        ...state,
        loading: true,
        error: '',
      };
    case 'error':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      throw new Error();
  }
};

const ConfirmWithoutPay = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();

  const {
    handleConfirmWithoutPayClick,
    paymentInfo,
    couponInfo,
    bookingId,
    visible,
  } = props;
  const { loading, success, error } = state;

  const handleSubmit = async () => {
    try {
      dispatch({ type: 'loading' });

      await axios.post(API_INTERN_PAYMENT_URL, {
        paymentInfo,
        bookingId,
        couponInfo,
        withoutPay: true,
      });
      dispatch({ type: 'success' });
    } catch (err) {
      if (err.response && [400, 409, 422].includes(err.response.status)) {
        dispatch({
          type: 'error',
          error: err.response.data.error,
        });
      } else {
        dispatch({ type: 'error', error: 'Something went wrong, try later' });
      }
    }
  };

  return (
    <Modal
      visible={visible}
      onCancel={() => handleConfirmWithoutPayClick(false)}
      bodyStyle={{ minHeight: 260 }}
      footer={null}
    >
      <S.ModalContent>
        <S.PaymentModalTitle>Confirm booking</S.PaymentModalTitle>
        <Skeleton
          loading={loading}
          title={false}
          active
          paragraph={{ rows: 1, width: '95%' }}
        />
        {error && <Alert type="error" message={error} />}
        {!success ? (
          <Button
            type="primary"
            style={{ margin: '2.5rem auto 0', display: 'block' }}
            onClick={handleSubmit}
            disabled={loading}
          >
            Confirm booking now
          </Button>
        ) : (
          <>
            <S.InfoMessage>
              Your confirming proccesed was successful
            </S.InfoMessage>
            <Button type="link" onClick={() => history.push('/dashboard')}>
              back to dashboard
            </Button>
          </>
        )}
      </S.ModalContent>
    </Modal>
  );
};

export default ConfirmWithoutPay;
