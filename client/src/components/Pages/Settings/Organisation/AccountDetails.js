import React, { useState, useEffect } from 'react';
// import axios from 'axios';

import Button from '../../../Common/ButtonNew';
import Notification from '../../../Common/Notification';
import { Input } from '../../../Common/Inputs';
import { Row, Col } from '../../../Common/Grid';
// import { SIGNUP_ORG_CREATE_PROFILE } from '../../../../constants/navRoutes';
// import { API_ORG_DETAILS } from '../../../../constants/apiRoutes';

import * as S from './style';

const { validate, orgSignup } = require('../../../../validation');

const AccountDetails = props => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [prevData, setPrevData] = useState({});
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [fetchData, setFetchData] = useState(0);

  const orgId = props.organisation;

  useEffect(() => {
    window.scroll(0, 0);
  }, [loading]);

  useEffect(() => {
    let mounted = true;
    async function getOrgDetails() {
      setLoading(true);

      // const { data } = await axios.get(API_ORG_DETAILS.replace(':id', orgId));

      if (mounted) {
        // setPrevData(data.accountDetails || {});
        // if (data.accountDetails) {
        //   setFirstName(data.accountDetails.firstName);
        //   setLastName(data.accountDetails.lastName);
        //   setPhone(data.accountDetails.phone);
        //   setEmail(data.accountDetails.email);
        // }
        setLoading(false);
        if (fetchData > 0) {
          setNotificationOpen(true);
        }
      }
    }

    getOrgDetails();
    return () => {
      mounted = false;
    };
  }, [orgId, fetchData]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    const handlers = {
      firstName: setFirstName,
      lastName: setLastName,
      contactNumber: setPhone,
      contactEmailAddress: setEmail,
    };

    handlers[name](value);
  };

  const onSave = async () => {
    const data = {
      accountDetails: {
        firstName,
        lastName,
        phone,
        email,
      },
    };

    try {
      setError('');

      const { errors: _errors } = validate({
        schema: orgSignup.accountDetails(prevData),
        data: data.accountDetails,
      });

      if (!_errors) {
        setSubmitLoading(true);
        setErrors({});

        // await axios.patch(API_ORG_DETAILS.replace(':id', orgId), data);

        setNotificationOpen(true);

        setFetchData(count => count + 1);
      } else {
        setErrors(_errors);
      }
      setSubmitLoading(false);
    } catch (e) {
      if (e.response && e.response.data) {
        setError(e.response.data.error);
      } else {
        setError('Something went wrong');
      }
      setSubmitLoading(false);
    }
  };

  return (
    <>
      <Row>
        <Col w={[4, 6, 4]} mb={5}>
          <Input
            label="First name"
            placeholder="First name..."
            name="firstName"
            value={firstName}
            onChange={handleInputChange}
            error={errors.firstName}
            disabled={loading}
          />
        </Col>
        <Col w={[4, 6, 4]} mb={5}>
          <Input
            label="Last name"
            placeholder="Last name..."
            name="lastName"
            value={lastName}
            onChange={handleInputChange}
            error={errors.lastName}
            disabled={loading}
          />
        </Col>
      </Row>
      <Row>
        <Col w={[4, 6, 4]} mb={5}>
          <Input
            label="Contact number..."
            placeholder="Contact number..."
            name="contactNumber"
            value={phone}
            onChange={handleInputChange}
            error={errors.phone}
            disabled={loading}
          />
        </Col>
        <Col w={[4, 6, 4]} mb={5}>
          <Input
            label="Contact email address..."
            placeholder="Contact email address..."
            name="contactEmailAddress"
            value={email}
            onChange={handleInputChange}
            type="email"
            error={errors.email}
            disabled={loading}
          />
        </Col>
      </Row>

      <Row mb={5}>
        <Col w={[4, 6, 4]} mb={3}>
          <Button
            type="secondary"
            onClick={() => onSave()}
            loading={submitLoading}
            disabled={loading}
          >
            save progress
          </Button>
        </Col>
      </Row>
      {error && (
        <Row mb={5}>
          <S.Error>{error}</S.Error>
        </Row>
      )}

      <Notification
        open={notificationOpen}
        setOpen={setNotificationOpen}
        content="Changes saved"
      />
    </>
  );
};

export default AccountDetails;
