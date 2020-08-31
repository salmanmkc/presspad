import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CloseOutlined } from '@ant-design/icons';
import { Input, DatePicker, Select } from '../../../Common/Inputs';
import { Col, Row } from '../../../Common/Grid';
import * as S from './style';
import * as T from '../../../Common/Typography';
import Button from '../../../Common/ButtonNew';
import {
  API_INTERN_SETTINGS_ABOUT_ME,
  API_MY_PROFILE_URL,
} from '../../../../constants/apiRoutes';
import Notification from '../../../Common/Notification';
import { CLASSES_DEFINITIONS } from '../../../../constants/externalLinks';
import types from '../../../../constants/types';
import { SETTINGS } from '../../../../constants/navRoutes';

const { validate, internSettings } = require('../../../../validation');

const getCleanData = (d = {}) => ({
  birthDate: d.birthDate || null,
  phoneNumber: d.phoneNumber || '',
  hometown: d.hometown || '',
  lastStudySubject: d.lastStudySubject || '', // new
  lastStudyUniversity: d.lastStudyUniversity || '', // new
  hearAboutPressPadAnswer: d.hearAboutPressPadAnswer || '',
  gender: d.gender || '',
  genderOther: d.genderOther || '',
  sexualOrientation: d.sexualOrientation || '',
  ethnicity: d.ethnicity || '',
  ethnicityOther: d.ethnicityOther || '',
  religion: d.religion || '', // new
  neurodivergent: d.neurodivergent || '', // new
  neurodivergentYes: d.neurodivergentYes || '', // new
  disability: d.disability || '',
  disabilityYes: d.disabilityYes || '', // new
  disabilityYesOther: d.disabilityYesOther || '', // new
  childCare: d.childCare || '', // new
  illCare: d.illCare || '', // new
  degreeLevel: d.degreeLevel || '',
  belongToClass: d.belongToClass || '', // new
});

const AboutMe = () => {
  const [state, setState] = useState(getCleanData());

  const [errors, setErrors] = useState({});
  const [mainError, setMainError] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [prevData, setPrevData] = useState({});

  const _validate = async () => {
    const { errors: _errors } = await validate({
      schema: internSettings.aboutMeSchema(prevData),
      data: { ...state },
    });

    return _errors;
  };

  const onInputChange = e => {
    const { value, name } = e.target;

    setErrors(_errors => ({ ..._errors, [name]: '' }));
    return setState(_state => ({ ..._state, [name]: value }));
  };

  const onSubmit = async () => {
    try {
      const _errors = await _validate();

      setErrors(_errors || {});

      if (_errors) {
        setMainError('Must fill all required fields');
        return;
      }
      setMainError();

      setLoading(true);
      await axios.patch(API_INTERN_SETTINGS_ABOUT_ME, state);
      setNotificationOpen(true);
    } catch (e) {
      setMainError(e.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!state.neurodivergent || !state.neurodivergent.includes('Yes')) {
      setState(_state => ({ ..._state, neurodivergentYes: '' }));
    }
  }, [state.neurodivergent]);

  useEffect(() => {
    if (!state.disability || !state.disability.includes('Yes')) {
      setState(_state => ({
        ..._state,
        disabilityYes: '',
        disabilityYesOther: '',
      }));
    }
  }, [state.disability]);

  useEffect(() => {
    if (!state.disabilityYes || !state.disabilityYes.includes('Other')) {
      setState(_state => ({
        ..._state,
        disabilityYesOther: '',
      }));
    }
  }, [state.disabilityYes]);

  useEffect(() => {
    if (!state.gender || !state.gender.includes('Other')) {
      setState(_state => ({ ..._state, genderOther: '' }));
    }
  }, [state.gender]);

  useEffect(() => {
    if (!state.ethnicity || !state.ethnicity.includes('Other')) {
      setState(_state => ({ ..._state, ethnicityOther: '' }));
    }
  }, [state.ethnicity]);

  useEffect(() => {
    const getData = async () => {
      const {
        data: { profile },
      } = await axios.get(API_MY_PROFILE_URL);
      setState(getCleanData(profile));
      setPrevData(getCleanData(profile));
    };
    getData();
  }, []);

  return (
    <div style={{ marginTop: '2rem' }}>
      <Row>
        <Col w={[4, 6, 4]} mt={4}>
          <DatePicker
            onChange={momentDate =>
              setState(_state => ({ ..._state, birthDate: momentDate }))
            }
            value={state.birthDate}
            label="Date of birth"
            error={errors.birthDate}
          />
        </Col>
        <Col w={[4, 6, 4]} mt={4}>
          <Input
            onChange={onInputChange}
            value={state.phoneNumber}
            label="Phone number"
            name="phoneNumber"
            error={errors.phoneNumber}
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 6, 4]} mt={4}>
          <Input
            onChange={onInputChange}
            value={state.hometown}
            label="Hometown"
            name="hometown"
            error={errors.hometown}
          />
        </Col>
        <Col w={[4, 6, 4]} mt={4}>
          <Input
            onChange={onInputChange}
            value={state.lastStudySubject}
            label="What I last studied"
            name="lastStudySubject"
            error={errors.lastStudySubject}
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 6, 4]} mt={4}>
          <Input
            onChange={onInputChange}
            value={state.lastStudyUniversity}
            label="Where I last studied"
            name="lastStudyUniversity"
            error={errors.lastStudyUniversity}
          />
        </Col>
        <Col w={[4, 6, 4]} mt={4}>
          <Input
            onChange={onInputChange}
            value={state.hearAboutPressPadAnswer}
            label="How did you hear about PressPad?"
            name="hearAboutPressPadAnswer"
            textArea
            error={errors.hearAboutPressPadAnswer}
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 12, 8]} mt={4}>
          <T.H5 color="pink" mt={7}>
            Extra demographic questions
          </T.H5>
          <T.P color="gray3" mt={2}>
            Your answers to these questions will be private and are used for
            PressPad’s reporting purposes and to help us match the hosts and
            interns to ensure the most positive experience.
          </T.P>
          <T.P color="gray3" mt={2}>
            For any of the questions, if you do not wish to disclose, please
            select ‘I’d prefer not to say’
          </T.P>
        </Col>
      </Row>

      <Row>
        <Col w={[4, 6, 4]} mt={4}>
          <Select
            options={types.gender.map(e => ({ label: e, value: e }))}
            label="Gender"
            allowClear
            onChange={value =>
              setState(_state => ({ ..._state, gender: value || '' }))
            }
            value={state.gender}
            error={errors.gender}
          />

          {state.gender && state.gender.includes('Other') && (
            <Input
              onChange={onInputChange}
              value={state.genderOther}
              label="Please specify"
              name="genderOther"
              error={errors.genderOther}
            />
          )}
        </Col>
        <Col w={[4, 6, 4]} mt={4}>
          <Select
            options={types.sexualOrientation.map(e => ({ label: e, value: e }))}
            label="Sexual Orientation"
            allowClear
            onChange={value =>
              setState(_state => ({ ..._state, sexualOrientation: value }))
            }
            value={state.sexualOrientation}
            error={errors.sexualOrientation}
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 6, 4]} mt={4}>
          <Select
            options={types.ethnicity.map(e => ({ label: e, value: e }))}
            label="Ethnicity"
            allowClear
            onChange={value =>
              setState(_state => ({ ..._state, ethnicity: value }))
            }
            value={state.ethnicity}
            error={errors.ethnicity}
          />

          {state.ethnicity && state.ethnicity.includes('Other') && (
            <Input
              onChange={onInputChange}
              value={state.ethnicityOther}
              label="Please specify"
              name="ethnicityOther"
              error={errors.ethnicityOther}
            />
          )}
        </Col>
        <Col w={[4, 6, 4]} mt={4}>
          <Select
            options={types.religion.map(e => ({ label: e, value: e }))}
            label="Religion"
            allowClear
            onChange={value =>
              setState(_state => ({ ..._state, religion: value || '' }))
            }
            value={state.religion}
            error={errors.religion}
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 6, 4]} mt={4}>
          <Select
            options={types.disability.map(e => ({ label: e, value: e }))}
            label="Disability"
            allowClear
            onChange={value =>
              setState(_state => ({ ..._state, disability: value || '' }))
            }
            value={state.disability}
            error={errors.disability}
          />

          {state.disability && state.disability.includes('Yes') && (
            <Select
              options={types.disabilityYes.map(e => ({ label: e, value: e }))}
              label="Please specify"
              allowClear
              onChange={value =>
                setState(_state => ({ ..._state, disabilityYes: value || '' }))
              }
              value={state.disabilityYes}
              error={errors.disabilityYes}
            />
          )}

          {state.disabilityYes && state.disabilityYes.includes('Other') && (
            <Input
              onChange={onInputChange}
              value={state.disabilityYesOther}
              label="Please specify"
              name="disabilityYesOther"
              error={errors.disabilityYesOther}
            />
          )}
        </Col>

        <Col w={[4, 6, 4]} mt={4}>
          <Select
            options={types.neurodivergent.map(e => ({ label: e, value: e }))}
            label="Neurodivergent condition"
            allowClear
            onChange={value =>
              setState(_state => ({ ..._state, neurodivergent: value || '' }))
            }
            value={state.neurodivergent}
            error={errors.neurodivergent}
          />

          {state.neurodivergent && state.neurodivergent.includes('Yes') && (
            <Select
              options={types.neurodivergentYes.map(e => ({
                label: e,
                value: e,
              }))}
              label="Please specify"
              allowClear
              onChange={value =>
                setState(_state => ({
                  ..._state,
                  neurodivergentYes: value || '',
                }))
              }
              value={state.neurodivergentYes}
              error={errors.neurodivergentYes}
            />
          )}
        </Col>
      </Row>

      <Row>
        <Col w={[4, 6, 4]} mt={4}>
          <Select
            options={types.childCare.map(e => ({ label: e, value: e }))}
            label="Are you a primary carer for a child or children under 18?"
            allowClear
            onChange={value =>
              setState(_state => ({ ..._state, childCare: value || '' }))
            }
            value={state.childCare}
            error={errors.childCare}
          />
        </Col>
      </Row>

      <Row>
        <S.IllCareWrapper>
          <Col w={[4, 6, 4]} mt={4}>
            <Select
              options={types.illCare.map(e => ({ label: e, value: e }))}
              label="Do you look after or care for someone with long term physical or mental ill health caused by disability or age (not in a paid capacity)?"
              allowClear
              onChange={value =>
                setState(_state => ({ ..._state, illCare: value || '' }))
              }
              value={state.illCare}
              error={errors.illCare}
            />
          </Col>
        </S.IllCareWrapper>
      </Row>

      <Row>
        <Col w={[4, 6, 4]} mt={4}>
          <Select
            options={types.degreeLevel.map(e => ({ label: e, value: e }))}
            label="Degree level"
            allowClear
            onChange={value =>
              setState(_state => ({ ..._state, degreeLevel: value }))
            }
            value={state.degreeLevel}
            error={errors.degreeLevel}
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 6, 4]} mt={4}>
          <S.IllCareWrapper>
            <Select
              options={types.belongToClass.map(e => ({ label: e, value: e }))}
              label="Which class do you self-identify as belonging to?"
              helperText={
                <span>
                  Refer to{' '}
                  <T.Link isExternal to={CLASSES_DEFINITIONS} color="lightBlue">
                    this document
                  </T.Link>{' '}
                  if you would like more details on the definitions below
                </span>
              }
              allowClear
              onChange={value =>
                setState(_state => ({ ..._state, belongToClass: value || '' }))
              }
              value={state.belongToClass}
              error={errors.belongToClass}
            />
          </S.IllCareWrapper>
        </Col>
      </Row>

      <Row>
        <Col w={[4, 6, 4]} style={{ marginTop: '48px' }}>
          {mainError && <T.PXS color="pink">{mainError}</T.PXS>}

          <Button type="secondary" onClick={onSubmit} loading={loading}>
            SAVE CHANGES
          </Button>
        </Col>
      </Row>
      <Notification
        open={notificationOpen}
        setOpen={setNotificationOpen}
        content="Changes saved"
      />
      <S.DeleteLink position="static">
        <T.Link to={SETTINGS.DELETE_ACCOUNT} mt={5}>
          <T.H7C mt={5} color="gray">
            <CloseOutlined /> DELETE ACCOUNT
          </T.H7C>
        </T.Link>
      </S.DeleteLink>
    </div>
  );
};

export default AboutMe;
