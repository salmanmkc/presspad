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

const Details = ({
  data = {},
  errors = {},
  handleChange,
  handleError,
  userId,
  role,
  isAdmin,
  name,
}) => {
  const props = {
    userId,
    role,
    readOnly: isAdmin,
    handleChange,
    handleError,
  };

  return (
    <SectionWrapper>
      {!isAdmin && (
        <Description>
          None of the details you supply below will be made public and will only
          be available to PressPad for verification purposes, to improve our
          service and to monitor our impact.
        </Description>
      )}
      <Title
        title={isAdmin ? name : 'About you'}
        hint={
          !isAdmin && 'You need to fill out this information to use PressPad'
        }
      />
      <SectionContent>
        <Row gutter={0}>
          <Col xs={24} md={12}>
            <Field
              {...fields['photoID']}
              value={data['photoID']}
              error={errors['photoID']}
              {...props}
            />
          </Col>
        </Row>
        <Row gutter={0}>
          <Col xs={24} md={20}>
            <Field
              {...fields['hearAboutPressPadAnswer']}
              value={data['hearAboutPressPadAnswer']}
              error={errors['hearAboutPressPadAnswer']}
              {...props}
            />
          </Col>
        </Row>

        <Row gutter={0}>
          <Col xs={24} md={12} lg={8}>
            <Field
              {...fields['phoneNumber']}
              value={data['phoneNumber']}
              error={errors['phoneNumber']}
              {...props}
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
};

export default Details;
