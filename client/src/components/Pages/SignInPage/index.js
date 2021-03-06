import React, { Component } from 'react';
import axios from 'axios';

// CONSTANTS
import { API_LOGIN_URL } from '../../../constants/apiRoutes';
import {
  DASHBOARD_URL,
  ADMIN_DASHBOARD_URL,
  RESET_PASSWORD,
  SIGNUP_URL,
} from '../../../constants/navRoutes';

// STYLING
import * as S from './SignInPage.style';

// COMMON COMPONENTS
import Button from '../../Common/ButtonNew';
import Title from '../../Common/Title';
import { Row, Col } from '../../Common/Grid';
import { Input } from '../../Common/Inputs/index';
import * as T from '../../Common/Typography';

export default class SignInPage extends Component {
  state = {
    fields: {},
    errors: {},
    msg: null,
  };

  onInputChange = e => {
    const { fields } = this.state;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields,
    });
  };

  validateForm = () => {
    const { fields } = this.state;
    const errors = {};
    let formIsValid = true;
    if (!fields.email) {
      formIsValid = false;
      errors.emailError = '* Please enter your email';
    }

    if (typeof fields.email !== 'undefined') {
      // regular expression for email validation
      const pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
      );
      if (!pattern.test(fields.email)) {
        formIsValid = false;
        errors.emailError = '* Please enter valid email';
      }
    }

    if (!fields.password) {
      formIsValid = false;
      errors.passwordError = '* Please enter your password';
    } else if (fields.password.length < 6) {
      formIsValid = false;
      errors.passwordError = '* Password must be 6 characters or longer';
    }

    this.setState({
      errors,
    });
    return formIsValid;
  };

  onFormSubmit = e => {
    const { fields } = this.state;
    e.preventDefault();
    const isValid = this.validateForm();
    if (isValid) {
      const { email, password } = fields;
      const loginData = { email, password };
      axios
        .post(API_LOGIN_URL, loginData)
        .then(({ data }) => {
          const { history, handleChangeState } = this.props;

          handleChangeState({ ...data, isLoggedIn: true });

          const { role } = data;
          if (role === 'admin') history.push(ADMIN_DASHBOARD_URL);
          else history.push(DASHBOARD_URL);
        })
        .catch(loginError => {
          const { response } = loginError;
          if (response) {
            const {
              status,
              data: { error },
            } = response;
            if (status === 401)
              this.setState({ msg: 'Please check your email or password' });
            else if (status === 500)
              this.setState({ msg: 'Something went wrong, try again later' });
            else this.setState({ msg: error });
          } else this.setState({ msg: 'Please check your wifi connection' });
        });
    }
  };

  render() {
    const { fields, errors, msg } = this.state;
    const { email, password } = fields;
    const { emailError, passwordError } = errors;
    const { onInputChange, onFormSubmit } = this;
    return (
      <form onSubmit={onFormSubmit}>
        <Row>
          <Title withBg mb="0" caps>
            <Col w={[4, 12, 12]}>log in</Col>
          </Title>
          <Col w={[4, 12, 8]}>
            <Input
              label="Email"
              placeholder="Enter your email"
              name="email"
              id="email"
              type="text"
              onChange={onInputChange}
              value={email}
              error={emailError}
              mt={6}
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              name="password"
              id="password"
              type="password"
              onChange={onInputChange}
              value={password}
              error={passwordError}
              mt={4}
            />
            <p style={{ marginTop: 10, marginLeft: 5 }}>
              <T.Link
                to={RESET_PASSWORD}
                color="gray3"
                style={{ textDecoration: 'underline', fontWeight: 'bold' }}
              >
                Forgot password?
              </T.Link>
            </p>
            <S.HiddenInput type="submit" />
            {msg && <S.ErrorMsg>{msg}</S.ErrorMsg>}
            <Button type="secondary" onClick={onFormSubmit} mt={5}>
              Log in
            </Button>
            <T.P color="gray3" mt={4} style={{ textAlign: 'center' }}>
              {"Don't have an account? "}
              <S.signupLink to={SIGNUP_URL} style={{ fontWeight: 'bold' }}>
                Sign up
              </S.signupLink>
            </T.P>
          </Col>
        </Row>
      </form>
    );
  }
}
