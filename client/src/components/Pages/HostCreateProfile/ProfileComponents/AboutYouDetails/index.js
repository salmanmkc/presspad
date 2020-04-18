import React from 'react';
import { Row, Col } from 'antd';
import {
  SectionWrapper,
  SectionContent,
  Description,
  HelperText,
  SmallTitle,
  StyledLink,
} from '../../../../Common/ProfileComponents/ProfileComponents.style';

import Title from '../../../../Common/ProfileComponents/Title';

import Field from '../../../../Common/ProfileComponents/Field';
import fields from '../../../../../constants/fields';

import { DBS_CHECK_PAGE } from '../../../../../constants/navRoutes';

const AboutYouDetails = ({
  data = {},
  errors = {},
  handleChange,
  handleError,
  userId,
  role,
}) => (
  <SectionWrapper>
    <Description>
      None of the details you supply below will be made public and will only be
      available to PressPad for verification purposes, to improve our service
      and to monitor our impact.
    </Description>
    <Title
      title="About you"
      hint="You need to fill out this information to use PressPad"
    />
    <SectionContent>
      <Row gutter={25} type="flex">
        <Col xs={24} style={{ margin: '1rem 0' }}>
          <Field
            {...fields['photoID']}
            value={data['photoID']}
            error={errors['photoID']}
            handleChange={handleChange}
            handleError={handleError}
            userId={userId}
            role={role}
          />
        </Col>
        <Col xs={24} md={16}>
          <Field
            {...fields['hearAboutPressPadAnswer']}
            value={data['hearAboutPressPadAnswer']}
            error={errors['hearAboutPressPadAnswer']}
            handleChange={handleChange}
            handleError={handleError}
            userId={userId}
            role={role}
          />
        </Col>
      </Row>
      <Row gutter={25} type="flex">
        <Col xs={24} md={8} style={{ marginTop: '1rem' }}>
          <Field
            {...fields['phoneNumber']}
            value={data['phoneNumber']}
            error={errors['phoneNumber']}
            handleChange={handleChange}
            handleError={handleError}
            userId={userId}
            role={role}
          />
        </Col>
      </Row>
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
    </SectionContent>
  </SectionWrapper>
);

export default AboutYouDetails;
