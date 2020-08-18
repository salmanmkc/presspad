import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Notification from '../../../Common/Notification';
import Title from '../../../Common/Title';
import Button from '../../../Common/ButtonNew';
import { Input } from '../../../Common/Inputs';
import * as T from '../../../Common/Typography';
import { Row, Col } from '../../../Common/Grid';
import { SIGNUP_ORG_ADD_FUNDS } from '../../../../constants/navRoutes';
import { API_ORG_DETAILS } from '../../../../constants/apiRoutes';

import * as S from '../style';

const { validate, orgSignup } = require('../../../../validation');

const CreateProfile = props => {
  const [description, setDescription] = useState('');
  const [internshipOpportunities, setOpportunities] = useState([
    { key: 0, details: '', opportunity: '', link: '' },
  ]);
  const [contactDetails, setContactDetails] = useState({});
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
        setPrevData(data || {});
        if (data.description) setDescription(data.description);
        if (data.internshipOpportunities.length)
          setOpportunities(data.internshipOpportunities);
        if (data.contactDetails) setContactDetails(data.contactDetails);

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
    const { value } = e.target;

    setDescription(value);
  };

  const handleOpportunitiesChange = e => {
    const { name, value } = e.target;
    const [_name, key] = name.split('.');
    setOpportunities(state => {
      const prevState = [...state];
      prevState[key] = { ...prevState[key], [_name]: value };
      return prevState;
    });
  };

  const handleContactChange = e => {
    const { name, value } = e.target;
    const _name = name.split('.')[1];
    setContactDetails(state => ({ ...state, [_name]: value }));
  };

  const addMoreOpportunities = () => {
    setOpportunities(prevState => {
      const state = [...prevState];
      state.push({
        key: state[state.length - 1].key + 1,
        details: '',
        opportunity: '',
        link: '',
      });
      return state;
    });
  };

  const onSave = async isContinue => {
    const _internshipOpportunities = internshipOpportunities.filter(
      ({ opportunity, link, details }) => opportunity && link && details,
    );

    const data = {
      description,
      internshipOpportunities: _internshipOpportunities,
      contactDetails,
    };

    try {
      setError('');

      const { errors: _errors } = validate({
        schema: orgSignup.createProfile(prevData),
        data,
      });

      if (!_errors) {
        setSubmitLoading({ loading: true, isContinue });
        setErrors({});

        await axios.patch(API_ORG_DETAILS.replace(':id', orgId), data);

        if (isContinue) {
          setRedirectUrl(SIGNUP_ORG_ADD_FUNDS);
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
    <div>
      <Row>
        <Col w={[4, 10, 12]}>
          <Title caps withBg textColor="pink">
            create profile
          </Title>
        </Col>
      </Row>

      <Row mb={6}>
        <Col w={[4, 12, 10.8]}>
          <T.H5 as="p" color="blue">
            OK, we love making a noise about our partners and connecting them
            with our diverse community of talented professionals looking for
            opportunities at organisations like yours.
          </T.H5>
        </Col>
      </Row>
      <Row mb={6}>
        <Col w={[4, 12, 10.8]}>
          <T.H5 as="p" color="blue">
            Create a profile to make it easier for them to find you and your
            opportunities
          </T.H5>
        </Col>
      </Row>
      <Row mb={6}>
        <Col w={[4, 12, 10.8]}>
          <Input
            onChange={handleInputChange}
            label="Description"
            name="description"
            helperText="Provide a short bio for your organisation"
            placeholder="No more than 250 words.."
            textArea
            value={description}
            error={errors.description}
            disabled={loading}
          />
        </Col>
      </Row>
      <Row mb={2}>
        <Col w={[4, 12, 10.8]}>
          <T.H5 color="blue">Internship Opportunities</T.H5>
        </Col>
      </Row>
      <Row mb={6}>
        <Col w={[4, 12, 10.8]}>
          <T.PS color="gray">
            Add information about any of your internship or entry level
            opportunities below
          </T.PS>
        </Col>
      </Row>
      {internshipOpportunities.map(({ opportunity, link, details, key }) => (
        <S.Opportunities key={key}>
          <Row>
            <Col w={[4, 10, 5.4]} mb={4}>
              <Input
                label="Opportunity"
                placeholder="Opportunity name"
                name={`opportunity.${key}`}
                value={opportunity}
                onChange={handleOpportunitiesChange}
                error={
                  errors[`internshipOpportunities[${key}]`] &&
                  errors[`internshipOpportunities[${key}]`].opportunity
                }
                disabled={loading}
              />
            </Col>
            <Col w={[4, 10, 5.4]} mb={4}>
              <Input
                label="Link"
                placeholder="Link..."
                name={`link.${key}`}
                value={link}
                onChange={handleOpportunitiesChange}
                error={
                  errors[`internshipOpportunities[${key}]`] &&
                  errors[`internshipOpportunities[${key}]`].link
                }
                disabled={loading}
              />
            </Col>
          </Row>
          <Row mb={4}>
            <Col w={[4, 12, 10.8]}>
              <Input
                onChange={handleOpportunitiesChange}
                label="Details"
                name={`details.${key}`}
                placeholder="No more than 250 words.."
                textArea
                value={details}
                error={
                  errors[`internshipOpportunities[${key}]`] &&
                  errors[`internshipOpportunities[${key}]`].details
                }
                disabled={loading}
              />
            </Col>
          </Row>
        </S.Opportunities>
      ))}
      <Row mb={7}>
        <Col w={[4, 12, 10.8]}>
          <S.Link color="pink" onClick={addMoreOpportunities}>
            + Add another internship opportunity
          </S.Link>
        </Col>
      </Row>
      <Row mb={2}>
        <Col w={[4, 12, 10.8]}>
          <T.H5 color="blue">Contact Details</T.H5>
        </Col>
      </Row>
      <Row mb={6}>
        <Col w={[4, 12, 10.8]}>
          <T.P color="gray">
            If there a main point of contact or email address applicants should
            reach out to find out more? Enter any useful contact details you’d
            like to provide below
          </T.P>
        </Col>
      </Row>
      <Row>
        <Col w={[4, 10, 5.4]} mb={4}>
          <Input
            label="Contact name"
            placeholder="Contact name..."
            name="contact.name"
            value={contactDetails.name}
            onChange={handleContactChange}
            error={errors.contactDetails && errors.contactDetails.name}
            disabled={loading}
          />
        </Col>
        <Col w={[4, 10, 5.4]} mb={4}>
          <Input
            label="Contact email"
            placeholder="Contact email..."
            name="contact.email"
            value={contactDetails.email}
            onChange={handleContactChange}
            error={errors.contactDetails && errors.contactDetails.email}
            disabled={loading}
          />
        </Col>
      </Row>
      <Row>
        <Col w={[4, 10, 5.4]} mb={6}>
          <Input
            label="Contact number"
            placeholder="Contact number..."
            name="contact.phone"
            value={contactDetails.phone}
            onChange={handleContactChange}
            error={errors.contactDetails && errors.contactDetails.phone}
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
          <T.Link to={SIGNUP_ORG_ADD_FUNDS} color="pink">
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
    </div>
  );
};

export default CreateProfile;
