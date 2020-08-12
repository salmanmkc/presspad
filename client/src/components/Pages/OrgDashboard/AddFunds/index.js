import React, { useEffect, useState, useReducer } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

import { Elements, injectStripe } from 'react-stripe-elements';

import Notification from '../../../Common/Notification';
import Button from '../../../Common/ButtonNew';
import Title from '../../../Common/Title';
import { Input, StripeInput } from '../../../Common/Inputs';
import { Row, Col } from '../../../Common/Grid';
import * as T from '../../../Common/Typography';
import * as S from './style';

import {
  API_ACCOUNT_URL,
  API_ORG_PAYMENT_URL,
} from '../../../../constants/apiRoutes';
import { DASHBOARD_URL } from '../../../../constants/navRoutes';
import { formatPrice } from '../../../../helpers';
import validationSchema from './validationSchema';

const { validate } = require('../../../../validation');
const { SERVER_ERROR } = require('../../../../constants/errorMessages');

const reducer = (state, action) => {
  switch (action.type) {
    case 'change':
      return {
        ...state,
        [action.name]: action.value,
      };
    case 'isError':
      return { ...state, errors: action.errors };
    default:
      throw new Error();
  }
};

const initialState = {
  amount: null,
  name: null,
  line1: null,
  line2: null,
  city: null,
  postcode: null,
  cardNumber: { empty: true },
  cardExpiry: { empty: true },
  cardCvc: { empty: true },
  errors: {},
};

function AddFunds({ stripe, elements }) {
  const [balance, setBalance] = useState(0);
  const [balanceLoading, setBalanceLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [error, setError] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);

  const history = useHistory();
  const location = useLocation();

  const signUp = location.state && location.state.signUp;

  const {
    amount,
    name,
    line1,
    line2,
    city,
    postcode,
    cardNumber,
    cardExpiry,
    cardCvc,
    errors,
  } = state;

  useEffect(() => {
    let mounted = true;
    async function getAccount() {
      setBalanceLoading(true);
      const { data } = await axios.get(API_ACCOUNT_URL);

      if (mounted) {
        setBalance(data.currentBalance);
        setBalanceLoading(false);
      }
    }

    getAccount();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (submitted) {
      const { errors: validationErrors } = validate({
        schema: validationSchema,
        data: {
          amount,
          name,
          line1,
          line2,
          city,
          postcode,
          cardNumber,
          cardExpiry,
          cardCvc,
        },
      });

      if (validationErrors) {
        dispatch({ type: 'isError', errors: validationErrors });
      } else {
        dispatch({ type: 'isError', errors: {} });
      }
    }
  }, [
    amount,
    name,
    line1,
    line2,
    city,
    postcode,
    submitted,
    cardNumber,
    cardExpiry,
    cardCvc,
  ]);

  const handleServerResponse = async response => {
    if (response.error) {
      setError(response.error.message);
      setPaymentLoading(false);
    } else if (response.requires_action) {
      const result = await stripe.handleCardAction(
        response.payment_intent_client_secret,
      );

      if (result.error) {
        setError(result.error.message);
        setPaymentLoading(false);
      } else {
        // The card action has been handled, confirm it on the server
        const penniesAmount = Math.floor(amount * 100);

        const { data: paymentResult } = await axios.post(API_ORG_PAYMENT_URL, {
          amount: penniesAmount,
          paymentIntent: result.paymentIntent,
        });

        await handleServerResponse(paymentResult);
      }
    } else {
      // payment successful
      setOpenNotification(true);
      setPaymentLoading(false);
      setTimeout(() => {
        history.push(DASHBOARD_URL);
      }, 1000);
    }
  };

  // eslint-disable-next-line consistent-return
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { errors: validationErrors } = validate({
        schema: validationSchema,
        data: state,
      });

      if (!validationErrors) {
        const cardElement = elements.getElement('cardNumber');

        // start payment process
        setPaymentLoading(true);
        setError('');

        const {
          paymentError,
          paymentMethod,
        } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            address: {
              city,
              line1,
              line2,
              postal_code: postcode,
            },
            name,
          },
        });

        if (paymentError) {
          setError(paymentError);
          setPaymentLoading(false);
        } else {
          const penniesAmount = Math.floor(amount * 100);
          const { data: paymentResult } = await axios.post(
            API_ORG_PAYMENT_URL,
            {
              paymentMethod,
              amount: penniesAmount,
            },
          );

          await handleServerResponse(paymentResult);
        }
      } else {
        // validation errors
        setSubmitted(true);
        dispatch({ type: 'isError', errors: validationErrors });
      }
    } catch (err) {
      if (err.response && err.response.status === 402) {
        return setError(err.response.data.error);
      }
      setError({
        error: SERVER_ERROR,
      });
    }
  };

  const handleChange = e => {
    const { name: _name, value } = e.target;
    dispatch({ type: 'change', name: _name, value });
  };

  const handleStripeChange = el => {
    const { elementType } = el;
    dispatch({ type: 'change', name: elementType, value: el });
  };

  if (!stripe) {
    return <div>loading ....</div>;
  }

  return (
    <>
      <Notification
        open={openNotification}
        setOpen={setOpenNotification}
        content="Successful payment, will redirect to dashboard soon ..."
      />
      <Row>
        <Title withBg caps>
          <Col w={[4, 12, 12]}>add funds</Col>
        </Title>
      </Row>
      {!signUp && (
        <Row>
          <Col w={[4, 12, 12]}>
            <T.H4 color="gray" mb={6}>
              Current Balance:{' '}
              <S.Amount>
                £{balanceLoading ? '...' : formatPrice(balance)}
              </S.Amount>
            </T.H4>
          </Col>
        </Row>
      )}
      {signUp && (
        <Row>
          <Col w={[4, 12, 12]}>
            <T.H5 color="blue" mb={5}>
              Nearly there! So you can start supporting your interns straight
              away, you’ll need to add some funds to your account.
            </T.H5>
          </Col>
        </Row>
      )}
      <Row>
        <Col w={[4, 12, 12]}>
          <T.H5 color={signUp ? 'pink' : 'blue'} mb={5}>
            Add Funds
          </T.H5>
        </Col>
      </Row>
      <form onSubmit={handleSubmit}>
        <Row mb={5}>
          <Col w={[4, 12, 5.4]}>
            <Input
              onChange={handleChange}
              name="amount"
              label="Amount"
              placeholder="£..."
              type="number"
              value={amount}
              error={errors.amount}
            />
          </Col>
        </Row>
        <Row mb={5}>
          <Col w={[4, 6, 5.4]} mb={5}>
            <StripeInput
              label="Card details"
              placeholder="Card number"
              type="cardNumber"
              onChange={handleStripeChange}
              validate={cardNumber}
              error={errors.cardNumber}
              iconColor="gray"
            />
          </Col>
          <Col w={[2, 3, 2.7]} mb={5}>
            <StripeInput
              label="Expiry date"
              placeholder="Expiry date..."
              type="cardExpiry"
              onChange={handleStripeChange}
              validate={cardExpiry}
              error={errors.cardExpiry}
            />
          </Col>
          <Col w={[2, 3, 2.7]} mb={5}>
            <StripeInput
              label="CVC"
              placeholder="CVC"
              type="cardCvc"
              onChange={handleStripeChange}
              validate={cardCvc}
              error={errors.cardCvc}
            />
          </Col>
        </Row>
        <Row mb={5}>
          <Col w={[4, 6, 5.4]}>
            <Input
              onChange={handleChange}
              name="name"
              label="Cardholder name"
              placeholder="Cardholder name..."
              value={name}
              error={errors.name}
            />
          </Col>
        </Row>
        <Row mb={4}>
          <Col w={[4, 12, 12]}>
            <T.PSBold color="blue">Billing Address</T.PSBold>
          </Col>
        </Row>
        <Row mb={5}>
          <Col w={[4, 6, 5.4]} mb={5}>
            <Input
              onChange={handleChange}
              name="line1"
              label="Address Line 1"
              placeholder="Address line 1..."
              value={line1}
              error={errors.line1}
            />
          </Col>
          <Col w={[4, 6, 5.4]} mb={5}>
            <Input
              onChange={handleChange}
              name="line2"
              label="Address Line 2"
              placeholder="Address Line 2..."
              value={line2}
              error={errors.line2}
            />
          </Col>
        </Row>
        <Row mb={5}>
          <Col w={[4, 6, 5.4]} mb={5}>
            <Input
              onChange={handleChange}
              name="city"
              label="City"
              placeholder="City..."
              value={city}
              error={errors.city}
            />
          </Col>
          <Col w={[4, 6, 5.4]} mb={5}>
            <Input
              onChange={handleChange}
              name="postcode"
              label="Postcode"
              placeholder="Postcode..."
              value={postcode}
              error={errors.postcode}
            />
          </Col>
        </Row>
        <Row mb={5}>
          <Col w={[4, 6, 5.4]} mb={5}>
            <Button type="secondary" bgColor="pink" loading={paymentLoading}>
              pay £{amount || 0} NOW
            </Button>
          </Col>
          <Col w={[4, 6, 5.4]}>
            <S.CancelLink
              to={DASHBOARD_URL}
              disabled={paymentLoading}
              signUp={signUp}
            >
              {signUp ? 'Skip for now, I’ll do this later' : 'Cancel'}
            </S.CancelLink>
          </Col>
        </Row>
        {error && <S.Error>{error}</S.Error>}
      </form>
    </>
  );
}

const InjectedAddFunds = injectStripe(AddFunds);

export default function AddFundsWrapper() {
  return (
    <Elements>
      <InjectedAddFunds />
    </Elements>
  );
}
