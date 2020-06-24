import React, { useState, useReducer } from 'react';
import axios from 'axios';
import { Modal, InputNumber, Input, Col, Row, message } from 'antd';

import Button from '../../../../Common/ButtonNew';

import { formatPrice } from '../../../../../helpers';
import {
  API_DONATION_URL,
  API_WITHDRAW_REQUEST_URL,
} from '../../../../../constants/apiRoutes';

import * as S from './style';
import { withdrawSchema, donateSchema } from './schemas';

const initialState = {
  donateValue: 0,
  donateValuePennies: 0, // * 100
  withdrawValue: 0,
  withdrawValuePennies: 0, // * 100
  bankName: '',
  bankSortCode: '',
  accountNumber: '',
  errors: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'change':
      return {
        ...state,
        [action.name]: action.value,
      };
    case 'changeNum':
      return {
        ...state,
        [action.name]: action.value,
        [`${action.name}Pennies`]: action.valuePennies,
      };
    case 'error':
      return {
        ...state,
        errors: action.errors,
      };
    case 'deleteErrors':
      return {
        ...state,
        errors: {},
      };
    default:
      throw new Error('invalid action type');
  }
};

const WithdrawDonateModal = ({
  openModal,
  handleCloseModals,
  currentBalance,
  pendingPayments,
  pendingWithdrawn,
  // refetchData,
}) => {
  const donateModalOpen = openModal === 'donate';
  const withdrawModalOpen = openModal === 'withdraw';

  const [attemptedToSubmit, setAttemptedToSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const canBeWithdraw = currentBalance - pendingPayments - pendingWithdrawn;
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    donateValue,
    donateValuePennies,
    withdrawValue,
    withdrawValuePennies,
    bankName,
    bankSortCode,
    accountNumber,
    errors,
  } = state;

  const validate = schema =>
    schema(canBeWithdraw)
      .validate(state, { abortEarly: false })
      .then(res => {
        dispatch({ type: 'deleteErrors' });
        return res;
      })
      .catch(err => {
        const _errors = {};
        err.inner.forEach(element => {
          _errors[element.path.split('.')[0]] = element.message;
        });
        dispatch({ type: 'error', errors: _errors });
      });

  const handleNumberChange = (name, value) => {
    const valuePennies = value * 100;

    dispatch({ type: 'changeNum', name, value, valuePennies });

    if (attemptedToSubmit) {
      if (withdrawModalOpen) {
        validate(withdrawSchema);
      } else {
        validate(donateSchema);
      }
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    dispatch({ type: 'change', name, value });

    if (attemptedToSubmit) {
      validate(withdrawSchema);
    }
  };

  const handleSubmitDonate = () => {
    setAttemptedToSubmit(true);

    validate(donateSchema).then(async res => {
      if (res) {
        setLoading(true);

        try {
          await axios.post(API_DONATION_URL, { amount: donateValuePennies });
          setLoading(false);
          message
            .success(
              `Done!, You have successfully donated by £${donateValue}`,
              4,
            )
            .then(() => {
              handleCloseModals();
              // refetchData();
            });
        } catch (error) {
          message.error(`Error!, something went wrong`);
          setLoading(false);
        }
      }
    });
  };

  const handleSubmitWithdrawRequest = () => {
    setAttemptedToSubmit(true);

    validate(withdrawSchema).then(async res => {
      if (res) {
        setLoading(true);
        try {
          await axios.post(API_WITHDRAW_REQUEST_URL, {
            amount: withdrawValuePennies,
            bankName,
            bankSortCode,
            accountNumber,
          });
          setLoading(false);
          message
            .success(
              `Done!, You have requested to withdraw £${withdrawValue}`,
              4,
            )
            .then(() => {
              handleCloseModals();
              // refetchData();
            });
        } catch (error) {
          message.error(`Error!, something went wrong`);
          setLoading(false);
        }
      }
    });
  };

  return (
    <>
      <Modal
        footer={false}
        visible={donateModalOpen}
        onCancel={handleCloseModals}
      >
        <S.ModalContentWrapper>
          <S.ModalTitle>Donate funds</S.ModalTitle>
          <S.ModalDescription>
            How much would you like to donate to the PressPad fund?
          </S.ModalDescription>
          <div>
            <S.ModalDescription bold>Remaining Funds: </S.ModalDescription>
            <S.ModalDescription
              bold
              error={canBeWithdraw - donateValuePennies < 0}
            >
              £{formatPrice(canBeWithdraw - donateValuePennies)}
            </S.ModalDescription>
          </div>
          <S.ErrorWrapper>
            <InputNumber
              min={0}
              size="large"
              style={{
                width: '140px',
                border: errors.donateValuePennies
                  ? '1px solid red'
                  : '1px solid #d9d9d9',
              }}
              formatter={value => {
                if (value.toString().match(/0+\d/)) {
                  return `£ ${value}`
                    .replace(/£ 0+/g, '£ ')
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                }
                return `£ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              }}
              parser={value => value.replace(/£\s?|(,*)/g, '')}
              value={donateValue}
              onChange={value => handleNumberChange('donateValue', value)}
            />
            <S.Error>{errors.donateValuePennies}</S.Error>
          </S.ErrorWrapper>
          <S.ButtonsWrapper>
            <Button
              label="Donate funds"
              type="secondary"
              onClick={handleSubmitDonate}
              loading={loading}
            />
            <Button label="Cancel" type="cancel" onClick={handleCloseModals} />
          </S.ButtonsWrapper>
        </S.ModalContentWrapper>
      </Modal>
      <Modal
        visible={withdrawModalOpen}
        footer={false}
        onCancel={handleCloseModals}
      >
        <S.ModalContentWrapper>
          <S.ModalTitle>Withdraw funds</S.ModalTitle>
          <S.ModalDescription>
            Please input your bank details and the amount you’d like to withdraw{' '}
          </S.ModalDescription>
          <div>
            <S.ModalDescription bold>Remaining Funds: </S.ModalDescription>
            <S.ModalDescription
              bold
              error={canBeWithdraw - withdrawValuePennies < 0}
            >
              £{formatPrice(canBeWithdraw)}
            </S.ModalDescription>
          </div>

          <Row
            gutter={8}
            type="flex"
            justify="center"
            align="middle"
            style={{
              width: '100%',
              marginBottom: errors.bankName ? '20px' : 0,
            }}
          >
            <Col span={10}>
              <S.Label>Bank name</S.Label>
            </Col>
            <Col span={12}>
              <S.ErrorWrapper error={errors.bankName}>
                <Input
                  size="large"
                  name="bankName"
                  value={bankName}
                  onChange={handleInputChange}
                />
                <S.Error>{errors.bankName}</S.Error>
              </S.ErrorWrapper>
            </Col>
          </Row>
          <Row
            gutter={8}
            type="flex"
            justify="center"
            align="middle"
            style={{
              width: '100%',
              marginBottom: errors.bankSortCode ? '20px' : 0,
            }}
          >
            <Col span={10}>
              <S.Label>Account sort code</S.Label>
            </Col>
            <Col span={12}>
              <S.ErrorWrapper error={errors.bankSortCode}>
                <Input
                  size="large"
                  name="bankSortCode"
                  value={bankSortCode}
                  onChange={handleInputChange}
                />
                <S.Error>{errors.bankSortCode}</S.Error>
              </S.ErrorWrapper>
            </Col>
          </Row>
          <Row
            gutter={8}
            type="flex"
            justify="center"
            align="middle"
            style={{
              width: '100%',
              marginBottom: errors.accountNumber ? '20px' : 0,
            }}
          >
            <Col span={10}>
              <S.Label>Account number</S.Label>
            </Col>
            <Col span={12}>
              <S.ErrorWrapper error={errors.accountNumber}>
                <Input
                  size="large"
                  name="accountNumber"
                  value={accountNumber}
                  onChange={handleInputChange}
                />
                <S.Error>{errors.accountNumber}</S.Error>
              </S.ErrorWrapper>
            </Col>
          </Row>

          <Row
            gutter={8}
            type="flex"
            justify="center"
            align="middle"
            style={{
              width: '100%',
              marginBottom: errors.withdrawValue ? '20px' : 0,
            }}
          >
            <Col span={10}>
              <S.Label>Amount</S.Label>
            </Col>
            <Col span={12}>
              <S.ErrorWrapper>
                <InputNumber
                  min={0}
                  size="large"
                  style={{
                    width: '140px',
                    border: errors.withdrawValue
                      ? '1px solid red'
                      : '1px solid #d9d9d9',
                  }}
                  formatter={value => {
                    if (value.toString().match(/0+\d/)) {
                      return `£ ${value}`
                        .replace(/£ 0+/g, '£ ')
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    }
                    return `£ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                  }}
                  value={withdrawValue}
                  parser={value => value.replace(/£\s?|(,*)/g, '')}
                  onChange={value => handleNumberChange('withdrawValue', value)}
                />
                <S.Error>{errors.withdrawValuePennies}</S.Error>
              </S.ErrorWrapper>
            </Col>
          </Row>
          <S.ButtonsWrapper>
            <Button
              label="withdraw funds"
              type="secondary"
              onClick={handleSubmitWithdrawRequest}
              loading={loading}
            />
            <Button label="Cancel" type="cancel" onClick={handleCloseModals} />
          </S.ButtonsWrapper>
        </S.ModalContentWrapper>
      </Modal>
    </>
  );
};

export default WithdrawDonateModal;
