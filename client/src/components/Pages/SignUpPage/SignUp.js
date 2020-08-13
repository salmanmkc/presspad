import React from 'react';
// import { Input, Checkbox } from 'antd';

// COMMON COMPONENTS
import Button from '../../Common/ButtonNew';

import USER_TYPES from '../../../constants/userTypes';

import Title from '../../Common/Title';

import { Row, Col } from '../../Common/Grid';
import { Input, Checkbox } from '../../Common/Inputs/index';
import * as T from '../../Common/Typography';

// STYLING
import { ErrorMsg } from './SignUpPage.style';
import { SIGNIN_URL } from '../../../constants/navRoutes';

export default props => {
  const {
    fields,
    errors,
    msg,
    agreeOnTerms,
    onInputChange,
    onFormSubmit,
    onCheckboxChange,
    userType,
    isLoading,
  } = props;
  const { email, password, name, organisation } = fields;

  return (
    <div>
      <Row>
        <Title withBg mb="0">
          <Col w={[4, 12, 12]}>SIGN UP</Col>
        </Title>
      </Row>

      <Row>
        <Col w={[4, 12, 12]} mt={6}>
          <T.H5 color="blue">
            To create your PressPad account, please fill in the details below
          </T.H5>
        </Col>
      </Row>

      <Row>
        <Col w={[4, 12, 12]} mt={6}>
          <Input
            label="Name"
            placeholder="Full name..."
            name="name"
            id="name"
            type="text"
            onChange={onInputChange}
            value={name}
            error={errors.name}
          />
        </Col>
      </Row>

      {userType === USER_TYPES.organisation && (
        <Row>
          <Col w={[4, 12, 12]} mt={6}>
            <Input
              label="Organisation name"
              placeholder="Organisation name..."
              name="organisation"
              id="organisation"
              type="text"
              onChange={onInputChange}
              value={organisation}
              error={errors.organisation}
            />
          </Col>
        </Row>
      )}

      <Row>
        <Col w={[4, 12, 12]} mt={4}>
          <Input
            label="Email"
            placeholder="Email..."
            name="email"
            id="email"
            type="text"
            onChange={onInputChange}
            value={email}
            error={errors.email}
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 12, 12]} mt={4}>
          <Input
            label="Password"
            placeholder="Enter your password"
            name="password"
            id="password"
            type="password"
            onChange={onInputChange}
            value={password}
            error={errors.password}
          />
          <T.PXS color="gray3" mt={1} ml={1}>
            Minimum 8 characters
          </T.PXS>
        </Col>
      </Row>

      <Row>
        <Col w={[4, 12, 12]} mt={5}>
          <Checkbox
            checked={agreeOnTerms}
            onChange={onCheckboxChange}
            label="I agree to the PressPad Terms of Use. By clicking Create Account I acknowledge the PressPad Privacy Policy "
          />
        </Col>
      </Row>

      <Row mb={8}>
        <Col w={[4, 12, 12]} mt={5}>
          {msg && <ErrorMsg>{msg}</ErrorMsg>}
          <Button type="secondary" onClick={onFormSubmit} loading={isLoading}>
            SIGN UP
          </Button>
          <T.P color="gray3" mt={4} style={{ textAlign: 'center' }}>
            Already signed up?{' '}
            <T.Link to={SIGNIN_URL} color="pink" style={{ fontWeight: 'bold' }}>
              Log in{' '}
            </T.Link>
          </T.P>
        </Col>
      </Row>
    </div>
  );
};
