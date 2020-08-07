import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Button, message, Skeleton, Alert } from 'antd';
import { injectStripe, CardElement } from 'react-stripe-elements';
import { withRouter } from 'react-router-dom';

import * as S from './style';
import { formatPrice } from '../../../helpers';

import { API_INTERN_PAYMENT_URL } from '../../../constants/apiRoutes';
import { BOOKING_VIEW_URL } from '../../../constants/navRoutes';

class PayNowModal extends Component {
  state = {
    error: '',
    isLoading: false,
    success: false,
  };

  handleServerResponse = async response => {
    const { payNow, setPayNow, fetchData } = this.props;
    const { installment: paymentInfo } = payNow;
    if (response.error) {
      this.setState({ error: response.error.message, isLoading: false });
    } else if (response.requires_action) {
      const result = await this.props.stripe.handleCardAction(
        response.payment_intent_client_secret,
      );
      if (result.error) {
        this.setState({ error: result.error.message, isLoading: false });
      } else {
        // The card action has been handled, confirm it on the server
        const { data: paymentResult } = await axios.post(
          API_INTERN_PAYMENT_URL,
          {
            paymentInfo,
            couponInfo: {},
            bookingId: paymentInfo.booking,
            paymentIntent: result.paymentIntent,
          },
        );
        await this.handleServerResponse(paymentResult);
      }
    } else {
      // payment successful
      this.setState({ isLoading: false, success: true }, () => {
        setTimeout(() => {
          setPayNow({ openModal: false, installment: {} });
          fetchData();
        }, 3000);
      });
    }
  };

  // eslint-disable-next-line consistent-return
  handleSubmit = async () => {
    try {
      const { cardElement } = this.state;
      const { payNow, stripe } = this.props;
      const { installment: paymentInfo } = payNow;
      // start payment process
      this.setState({ isLoading: true });

      const { error, paymentMethod } = await stripe.createPaymentMethod(
        'card',
        cardElement,
      );

      if (error) {
        this.setState({ error: error.message, isLoading: false });
      } else {
        const { data: paymentResult } = await axios.post(
          API_INTERN_PAYMENT_URL,
          {
            paymentInfo,
            paymentMethod,
            couponInfo: {},
            bookingId: paymentInfo.booking,
          },
        );

        await this.handleServerResponse(paymentResult);
      }
    } catch (error) {
      if (error.response && error.response.status === 402) {
        return this.setState({
          error: error.response.data.error,
          isLoading: false,
        });
      }
      message.error('something went wrong', 5);
      this.setState({
        error: 'something went wrong try again later',
        isLoading: false,
      });
    }
  };

  handleReady = element => {
    this.setState({ cardElement: element });
  };

  renderPaymentMethod = () => {
    const { error, success, isLoading } = this.state;
    const { payNow, stripe } = this.props;
    const { installment: paymentInfo } = payNow;

    if (!paymentInfo) {
      return <Alert type="error" message="Something went wrong" />;
    }
    const { amount } = paymentInfo;

    if (!stripe) {
      return (
        <Alert
          type="error"
          message="Stripejs hasn't loaded yet, refresh the page"
        />
      );
    }

    if (success) {
      return (
        <>
          <S.InfoMessage>Your payment processed successful</S.InfoMessage>
          <Button
            type="link"
            onClick={() => this.props.history.push('/dashboard')}
          >
            back to dashboard
          </Button>
        </>
      );
    }

    return (
      <>
        <S.CardWrapper>
          <CardElement
            onChange={() => this.setState({ error: '' })}
            onReady={this.handleReady}
            style={{ base: { fontSize: '17px' } }}
          />
          <Skeleton
            loading={isLoading}
            title={false}
            active
            paragraph={{ rows: 1, width: '95%' }}
          />
        </S.CardWrapper>
        {error ? <Alert type="error" message={error} /> : ''}
        <Button
          type="primary"
          style={{ margin: '2.5rem auto 0', display: 'block' }}
          onClick={this.handleSubmit}
          disabled={isLoading}
        >
          Pay £{formatPrice(amount || 0, 2)}&nbsp;now
        </Button>
      </>
    );
  };

  render() {
    const { payNow, setPayNow } = this.props;
    const { installment } = payNow;
    return (
      <Modal
        visible={payNow.openModal}
        onCancel={() => setPayNow({ openModal: false, installment: {} })}
        bodyStyle={{ minHeight: 300 }}
        footer={null}
      >
        <S.PaymentModalTitle>Complete payment</S.PaymentModalTitle>
        {this.renderPaymentMethod()}
        {installment.amount && !installment.coupon && (
          <S.AddCoupon>
            or go to{' '}
            <S.Link to={BOOKING_VIEW_URL.replace(':id', installment.booking)}>
              booking page
            </S.Link>{' '}
            to add a coupon
          </S.AddCoupon>
        )}
      </Modal>
    );
  }
}

export default injectStripe(withRouter(PayNowModal));
