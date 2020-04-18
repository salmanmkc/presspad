import React from 'react';
import { Row, Col } from 'antd';
import { HelperText, SmallTitle, StyledLink } from './ProfileComponents.style';
import { DBS_CHECK_PAGE } from '../../../constants/navRoutes';

import Field from './Field';
import fields from '../../../constants/fields';

const DBSCheck = ({
  data,
  errors,
  handleChange,
  handleError,
  userId,
  role,
}) => (
  <>
    <SmallTitle>DBS Check</SmallTitle>
    <HelperText>
      Please enter your DBS reference number and upload a photo of your DBS
      certificate.
      <br />
      <span style={{ fontWeight: 'bold' }}>
        If you have not completed a DBS check, please{' '}
        <StyledLink to={DBS_CHECK_PAGE} target="_blank">
          click here
        </StyledLink>{' '}
        and we will help you complete one for free
      </span>
    </HelperText>
    <Row gutter={25}>
      <Col xs={24} sm={12}>
        <Field
          {...fields['DBSCheckCert']}
          value={data['DBSCheck']}
          error={errors['DBSCheck']}
          handleChange={handleChange}
          handleError={handleError}
          userId={userId}
          role={role}
        />
      </Col>
      <Col xs={24} sm={12}>
        <Field
          {...fields['DBSCheckNum']}
          value={data['DBSCheck']}
          error={errors['DBSCheck']}
          handleChange={handleChange}
          handleError={handleError}
          userId={userId}
          role={role}
        />
      </Col>
    </Row>
  </>
);

export default DBSCheck;
