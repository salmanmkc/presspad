import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Input } from 'antd';

import axios from 'axios';
import * as S from './style';
import * as T from '../../Common/Typography';
import Button from '../../Common/ButtonNew';
import { API_SET_PASSWORD } from '../../../constants/apiRoutes';
import { SIGNIN_URL } from '../../../constants/navRoutes';

function SetPassword() {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const history = useHistory();
  const { token } = useParams();

  const validate = () => {
    try {
      const passwordPattern = new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/g,
      );

      if (password && password.length < 8) {
        throw new Error('Password is too short.');
      } else if (!passwordPattern.test(password)) {
        throw new Error(
          'Password requires 8 characters including at least 1 uppercase character and 1 number.',
        );
      } else {
        setPasswordError('');
      }
      setError('');
    } catch (e) {
      setPasswordError(e.message);
      setError('');
      e.passwordError = true;
      throw e;
    }
  };

  const handleSubmit = async () => {
    try {
      validate();
      setLoading(true);
      await axios.post(API_SET_PASSWORD, { password, token });
      setPasswordError('');
      setError('');
      setSuccess(true);
    } catch (e) {
      if (e.response && e.response.data && e.response.data.error) {
        setError(e.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Wrapper>
      <div>
        <T.H2C color="blue">FORGOT PASSWORD?</T.H2C>
        <T.P mt={4}>
          {success
            ? 'Success! Your password has been reset. Let’s login.'
            : 'Please enter your new password:'}
        </T.P>
        {!success && (
          <>
            <S.Label htmlFor="password" error={passwordError}>
              New password
            </S.Label>
            <Input.Password
              name="password"
              id="password"
              onChange={e => setPassword(e.target.value)}
              placeholder="New password..."
              value={password}
              size="large"
              type="password"
            />
            {passwordError && <S.Error block>{passwordError}</S.Error>}
          </>
        )}
        {success ? (
          <S.ButtonWrapper>
            <Button type="secondary" onClick={() => history.push(SIGNIN_URL)}>
              LOG IN
            </Button>
          </S.ButtonWrapper>
        ) : (
          <S.ButtonWrapper>
            {error && <S.Error block>{error}</S.Error>}
            <Button type="secondary" onClick={handleSubmit} loading={loading}>
              RESET PASSWORD
            </Button>
          </S.ButtonWrapper>
        )}
      </div>
    </S.Wrapper>
  );
}

export default SetPassword;
