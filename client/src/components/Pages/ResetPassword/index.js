import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input } from 'antd';
import * as Yup from 'yup';
import axios from 'axios';
import * as S from './style';
import * as T from '../../Common/Typography';
import Button from '../../Common/ButtonNew';
import { API_RESET_PASSWORD } from '../../../constants/apiRoutes';
import { SIGNIN_URL } from '../../../constants/navRoutes';
import SetPassword from './SetPassword';

const errMsgs = require('../../../constants/errorMessages');

const emailSchema = Yup.string()
  .email(errMsgs.EMAIL)
  .required('This field is required');

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  const validate = () => {
    try {
      emailSchema.validateSync(email);
      setEmailError('');
      setError('');
    } catch (e) {
      setEmailError(e.message);
      setError('');
      e.emailError = true;
      throw e;
    }
  };

  const handleSubmit = async () => {
    try {
      validate();
      setLoading(true);
      await axios.post(API_RESET_PASSWORD, { email });
      setEmailError('');
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
            ? 'Success! Please check your email for a reset password link.'
            : 'Please enter your email address linked to your account and we will send you a link to reset your password.'}
        </T.P>
        {!success && (
          <>
            <S.Label htmlFor="email" error={emailError}>
              Email
            </S.Label>
            <Input
              name="email"
              id="email"
              onChange={e => setEmail(e.target.value)}
              placeholder="Email..."
              value={email}
              size="large"
            />
            {emailError && <S.Error block>{emailError}</S.Error>}
          </>
        )}
        {success ? (
          <S.ButtonWrapper>
            <Button type="secondary" onClick={() => history.push(SIGNIN_URL)}>
              RETURN TO LOG IN
            </Button>
          </S.ButtonWrapper>
        ) : (
          <S.ButtonWrapper>
            {error && <S.Error block>{error}</S.Error>}
            <Button type="secondary" onClick={handleSubmit} loading={loading}>
              Send Email
            </Button>
          </S.ButtonWrapper>
        )}
      </div>
    </S.Wrapper>
  );
}

export { SetPassword };
export default ResetPassword;
