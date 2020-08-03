import React, { useState } from 'react';
import axios from 'axios';
import { Input } from '../../Common/Inputs';
import { Col, Row } from '../../Common/Grid';
import * as S from './style';
import Button from '../../Common/ButtonNew';
import { SETTINGS_MY_ACCOUNT } from '../../../constants/apiRoutes';

const { validate, settingsMyAccountSchema } = require('../../../validation');

const MyAccount = () => {
  const [state, setState] = useState({
    name: '',
    email: '',
    oldPassword: '',
    newPassword: '',
  });

  const [changePasswordActive, setChangePasswordActive] = useState(false);

  const [errors, setErrors] = useState({});
  const [error, setError] = useState();

  const _validate = async () => {
    const { errors: _errors } = await validate({
      schema: settingsMyAccountSchema,
      data: { ...state, changePasswordActive },
    });

    return _errors;
  };

  const onInputChange = e => {
    const { value, name } = e.target;

    setErrors(_errors => ({ ..._errors, [name]: '' }));
    return setState(_state => ({ ..._state, [name]: value }));
  };

  const onSubmit = async () => {
    try {
      const _errors = await _validate();

      setErrors(_errors || {});

      if (_errors) {
        return;
      }
      await axios.patch(SETTINGS_MY_ACCOUNT, state);
    } catch (e) {
      setError({
        error: e.response.data.error,
        isLoading: false,
      });
    }
  };

  return (
    <div>
      <Row>
        <Col w={[4, 6, 4]} style={{ marginTop: '20px' }}>
          <Input
            onChange={onInputChange}
            value={state.name}
            label="Name"
            name="name"
            error={errors.name}
          />
        </Col>
        <Col w={[4, 6, 4]} style={{ marginTop: '20px' }}>
          <Input
            onChange={onInputChange}
            value={state.email}
            label="Email"
            type="email"
            name="email"
            error={errors.email}
          />
        </Col>
      </Row>
      {!changePasswordActive && (
        <Row>
          <Col w={[4, 6, 4]} style={{ marginTop: '20px' }}>
            <S.ChangePassword onClick={() => setChangePasswordActive(true)}>
              Change my password
            </S.ChangePassword>
          </Col>
        </Row>
      )}
      {changePasswordActive && (
        <Row>
          <Col w={[4, 6, 4]} style={{ marginTop: '20px' }}>
            <Input
              onChange={onInputChange}
              value={state.oldPassword}
              label="Old Password"
              type="password"
              name="oldPassword"
              error={errors.oldPassword}
            />
          </Col>
          <Col w={[4, 6, 4]} style={{ marginTop: '20px' }}>
            <Input
              onChange={onInputChange}
              value={state.newPassword}
              label="New Password"
              type="password"
              name="newPassword"
              error={errors.newPassword}
            />
          </Col>
        </Row>
      )}
      <Row>
        <Col w={[4, 6, 4]} style={{ marginTop: '48px' }}>
          <Button type="secondary" onClick={onSubmit}>
            SAVE CHANGES
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default MyAccount;
