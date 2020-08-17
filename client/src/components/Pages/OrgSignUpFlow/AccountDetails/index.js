import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Title from '../../../Common/Title';
import Button from '../../../Common/ButtonNew';
import Notification from '../../../Common/Notification';
import { Input } from '../../../Common/Inputs';
import * as T from '../../../Common/Typography';
import { Row, Col } from '../../../Common/Grid';
import { SIGNUP_ORG_CREATE_PROFILE } from '../../../../constants/navRoutes';
import { API_ORG_DETAILS } from '../../../../constants/apiRoutes';

import * as S from '../style';

const { validate, orgSignup } = require('../../../../validation');

const AccountDetails = props => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState({
    loading: false,
    isContinue: false,
  });
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');
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

      const { data } = await axios.get(API_ORG_DETAILS.replace(':id', orgId));

      if (mounted) {
        setPrevData(data.accountDetails || {});
        if (data.accountDetails) {
          setFirstName(data.accountDetails.firstName);
          setLastName(data.accountDetails.lastName);
          setPhone(data.accountDetails.phone);
          setEmail(data.accountDetails.email);
        }
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

  const onSave = async isContinue => {
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
        setSubmitLoading({ loading: true, isContinue });
        setErrors({});

        await axios.patch(API_ORG_DETAILS.replace(':id', orgId), data);

        if (isContinue) {
          setRedirectUrl(SIGNUP_ORG_CREATE_PROFILE);
          setNotificationOpen(true);
        } else {
          setRedirectUrl('');
          setFetchData(count => count + 1);
        }
      } else {
        setErrors(_errors);
      }
      setSubmitLoading({ loading: false, isContinue });
    } catch (e) {
      if (e.response && e.response.data) {
        setError(e.response.data.error);
      } else {
        setError('Something went wrong');
      }
      setSubmitLoading({ loading: false, isContinue });
    }
  };

  return (
    <>
      <Row>
        <Col w={[4, 10, 12]}>
          <Title caps withBg textColor="pink">
            account details
          </Title>
        </Col>
      </Row>

      <Row mb={6}>
        <Col w={[4, 12, 10.8]}>
          <S.SubTitle>
            To get started, we’ll need the contact details for whoever will be
            PressPad’s main point of contact. Usually this is whoever manages
            interns or apprenticeships.
          </S.SubTitle>
        </Col>
      </Row>

      <Row>
        <Col w={[4, 10, 5.4]} mb={5}>
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
        <Col w={[4, 10, 5.4]} mb={5}>
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
        <Col w={[4, 10, 5.4]} mb={5}>
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
        <Col w={[4, 10, 5.4]} mb={5}>
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
        <Col w={[4, 10, 5.4]} mb={3}>
          <Button
            type="secondary"
            outline
            onClick={() => onSave()}
            loading={submitLoading.loading && !submitLoading.isContinue}
            disabled={submitLoading.loading && submitLoading.isContinue}
          >
            save progress
          </Button>
        </Col>
        <Col w={[4, 10, 5.4]}>
          <Button
            type="secondary"
            onClick={() => onSave(true)}
            loading={submitLoading.loading && submitLoading.isContinue}
            disabled={submitLoading.loading && !submitLoading.isContinue}
          >
            continue
          </Button>
        </Col>
      </Row>
      {error && (
        <Row mb={5}>
          <S.Error>{error}</S.Error>
        </Row>
      )}
      <Row mb={5}>
        <Col w={[4, 12, 10.8]} style={{ textAlign: 'center' }}>
          <T.Link to={SIGNUP_ORG_CREATE_PROFILE} color="pink">
            I’ll finish this later
          </T.Link>
        </Col>
      </Row>
      <Notification
        open={notificationOpen}
        setOpen={setNotificationOpen}
        content="Changes saved"
        redirectUrl={redirectUrl}
      />
    </>
  );
};

export default AccountDetails;
