import React, { useState } from 'react';
import axios from 'axios';
import { CloseOutlined } from '@ant-design/icons';
import { Input } from '../../Common/Inputs';
import { Col, Row } from '../../Common/Grid';
import * as S from './Host/style';
import * as T from '../../Common/Typography';
import Button from '../../Common/ButtonNew';
import Icon from '../../Common/Icon';
import { API_INTERN_SETTINGS_MY_ACCOUNT } from '../../../constants/apiRoutes';
import Notification from '../../Common/Notification';
import { SETTINGS } from '../../../constants/navRoutes';

const {
  validate,
  internSettings,
  hostSettings,
} = require('../../../validation');

const MyAccount = ({ role, ...props }) => {
  const [state, setState] = useState({
    name: props.name,
    email: props.email,
    oldPassword: '',
    newPassword: '',
  });

  const [changePasswordActive, setChangePasswordActive] = useState(false);

  const [errors, setErrors] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const decideSettings = () => {
    switch (role) {
      case 'intern':
        return internSettings;
      case 'host':
        return hostSettings;
      default:
        return null;
    }
  };

  const _validate = async () => {
    const settings = decideSettings();

    if (settings) {
      const { errors: _errors } = await validate({
        schema: settings.myAccountSchema,
        data: { ...state, changePasswordActive },
      });

      return _errors;
    }

    return setError('Cannot find the correct settings for your account');
  };

  const onInputChange = e => {
    const { value, name } = e.target;

    setErrors(_errors => ({ ..._errors, [name]: '' }));
    return setState(_state => ({ ..._state, [name]: value }));
  };

  const onSubmit = async () => {
    setErrors({});
    try {
      const _errors = await _validate();

      setErrors(_errors || {});

      if (_errors) {
        return;
      }

      setLoading(true);
      await axios.patch(API_INTERN_SETTINGS_MY_ACCOUNT, state);
      setNotificationOpen(true);
      props.handleChangeState({ email: state.email, name: state.name });
    } catch (e) {
      setError(e.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '2rem', marginBottom: '4rem' }}>
      <Row>
        <Col w={[4, 6, 4]} mt={4}>
          <Input
            onChange={onInputChange}
            value={state.name}
            label="Name"
            name="name"
            error={errors.name}
          />
        </Col>
        <Col w={[4, 6, 4]} mt={4}>
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
            <Icon icon="key" width="25" style={{ display: 'inline' }} />
            <S.ChangePassword onClick={() => setChangePasswordActive(true)}>
              Change my password
            </S.ChangePassword>
          </Col>
        </Row>
      )}
      {changePasswordActive && (
        <Row>
          <Col w={[4, 6, 4]} mt={4}>
            <Input
              onChange={onInputChange}
              value={state.oldPassword}
              label="Old Password"
              type="password"
              name="oldPassword"
              error={errors.oldPassword}
            />
          </Col>
          <Col w={[4, 6, 4]} mt={4}>
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
          {error && <T.PXS color="pink">{error}</T.PXS>}

          <Button type="secondary" onClick={onSubmit} loading={loading}>
            SAVE CHANGES
          </Button>
        </Col>
      </Row>
      <Notification
        open={notificationOpen}
        setOpen={setNotificationOpen}
        content="Changes saved"
      />
      <S.DeleteLink>
        <T.Link to={SETTINGS.DELETE_ACCOUNT} mt={5}>
          <T.H7C mt={5} color="gray">
            <CloseOutlined /> DELETE ACCOUNT
          </T.H7C>
        </T.Link>
      </S.DeleteLink>
    </div>
  );
};

export default MyAccount;
