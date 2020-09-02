import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import Title from '../../Common/Title';
import { Input, DatePicker, Select } from '../../Common/Inputs';
import { Col, Row } from '../../Common/Grid';
import * as S from '../Settings/Host/style';
import * as T from '../../Common/Typography';
import Button from '../../Common/ButtonNew';
import {
  API_HOST_SETTINGS_ABOUT_ME,
  API_MY_PROFILE_URL,
} from '../../../constants/apiRoutes';
import Notification from '../../Common/Notification';
import { CLASSES_DEFINITIONS } from '../../../constants/externalLinks';
import types from '../../../constants/types';
import { HOST_SIGNUP_LISTING } from '../../../constants/navRoutes';

const { validate, hostSettings } = require('../../../validation');

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
  typeOfSchool: d.typeOfSchool || '', // new
  typeOfSchoolOther: d.typeOfSchoolOther || '', // new
  eligibleForFreeSchoolMeals: d.eligibleForFreeSchoolMeals || '', // new
  describeMainIncomeEarnerMainJob: d.describeMainIncomeEarnerMainJob || '', // new
  highestLevelOfQualifications: d.highestLevelOfQualifications || '', // new
  highestLevelOfQualificationsOther: d.highestLevelOfQualificationsOther || '', // new
  parentsWorkInPress: d.parentsWorkInPress || '',
  belongToClass: d.belongToClass || '', // new
});

const AboutMe = () => {
  const [state, setState] = useState(getCleanData());

  const [errors, setErrors] = useState({});
  const [mainError, setMainError] = useState();
  const [saveLoading, setSaveLoading] = useState(false);
  const [continueLoading, setContinueLoading] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [prevData, setPrevData] = useState({});
  const [lastClickOnContinue, setLastClickOnContinue] = useState({});

  const history = useHistory();

  useEffect(() => {
    window.scrollTo({
      left: 0,
      top: 0,
    });
  }, []);

  const _validate = async isContinue => {
    const { errors: _errors } = await validate({
      schema: hostSettings.aboutMeSchema(prevData, isContinue),
      data: { ...state },
    });

    return _errors;
  };

  const onInputChange = e => {
    const { value, name } = e.target;

    setErrors(_errors => ({ ..._errors, [name]: '' }));
    return setState(_state => ({ ..._state, [name]: value }));
  };

  const onSubmit = async isContinue => {
    try {
      setErrors({});
      setLastClickOnContinue(isContinue);

      const _errors = await _validate(isContinue);

      setErrors(_errors || {});

      if (_errors) {
        setMainError('Must fill all required fields');
        return;
      }
      setMainError();

      if (isContinue) {
        setContinueLoading(true);
      } else {
        setSaveLoading(true);
      }

      await axios.patch(API_HOST_SETTINGS_ABOUT_ME, state);

      setNotificationOpen(true);
    } catch (e) {
      setMainError(e.response.data.error);
    } finally {
      setContinueLoading(false);
      setSaveLoading(false);
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
    if (
      !state.highestLevelOfQualifications ||
      !state.highestLevelOfQualifications.includes('Other')
    ) {
      setState(_state => ({
        ..._state,
        highestLevelOfQualificationsOther: '',
      }));
    }
  }, [state.highestLevelOfQualifications]);

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

  const done = () => {
    if (lastClickOnContinue) {
      history.push(HOST_SIGNUP_LISTING);
    }
  };

  return (
    <div style={{ marginTop: '4rem', paddingBottom: '5rem' }}>
      <Row>
        <Title withBg mb="0">
          <Col w={[4, 12, 12]}>ABOUT ME</Col>
        </Title>
      </Row>
      <Row>
        <Col w={[4, 6, 5.3]} style={{ marginTop: '20px' }}>
          <DatePicker
            onChange={momentDate =>
              setState(_state => ({ ..._state, birthDate: momentDate }))
            }
            value={state.birthDate}
            label="Date of birth"
            error={errors.birthDate}
          />
        </Col>
        <Col w={[4, 6, 5.3]} style={{ marginTop: '20px' }}>
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
        <Col w={[4, 6, 5.3]} style={{ marginTop: '20px' }}>
          <Input
            onChange={onInputChange}
            value={state.hometown}
            label="Hometown"
            name="hometown"
            error={errors.hometown}
          />
        </Col>
        <Col w={[4, 6, 5.3]} style={{ marginTop: '20px' }}>
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
        <Col w={[4, 6, 5.3]} style={{ marginTop: '20px' }}>
          <Input
            onChange={onInputChange}
            value={state.lastStudyUniversity}
            label="Where I last studied"
            name="lastStudyUniversity"
            error={errors.lastStudyUniversity}
          />
        </Col>
        <Col w={[4, 6, 6]} style={{ marginTop: '20px' }}>
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
        <Col w={[4, 12, 8]} style={{ marginTop: '20px' }}>
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
        <Col w={[4, 6, 5.3]} style={{ marginTop: '20px' }}>
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
        <Col w={[4, 6, 5.3]} style={{ marginTop: '20px' }}>
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
        <Col w={[4, 6, 5.3]} style={{ marginTop: '20px' }}>
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
        <Col w={[4, 6, 5.3]} style={{ marginTop: '20px' }}>
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
        <Col w={[4, 6, 5.3]} style={{ marginTop: '20px' }}>
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

        <Col w={[4, 6, 5.3]} style={{ marginTop: '20px' }}>
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
        <Col w={[4, 6, 5.3]} style={{ marginTop: '20px' }}>
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
          <Col w={[4, 6, 5.3]} style={{ marginTop: '20px' }}>
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
        <Col w={[4, 6, 5.3]} style={{ marginTop: '20px' }}>
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
        <Col w={[4, 6, 5.3]} style={{ marginTop: '20px' }}>
          <Select
            options={types.typeOfSchool.map(e => ({ label: e, value: e }))}
            label="Schooling type"
            allowClear
            onChange={value =>
              setState(_state => ({ ..._state, typeOfSchool: value || '' }))
            }
            value={state.typeOfSchool}
            error={errors.typeOfSchool}
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 6, 5.3]} style={{ marginTop: '20px' }}>
          <Select
            options={types.eligibleForFreeSchoolMeals.map(e => ({
              label: e,
              value: e,
            }))}
            label="Did you receive free school meals at any point during your education?"
            allowClear
            onChange={value =>
              setState(_state => ({
                ..._state,
                eligibleForFreeSchoolMeals: value,
              }))
            }
            value={state.eligibleForFreeSchoolMeals}
            error={errors.eligibleForFreeSchoolMeals}
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 6, 5.3]} style={{ marginTop: '20px' }}>
          <S.IllCareWrapper>
            <Select
              options={types.describeMainIncomeEarnerMainJob.map(e => ({
                label: e,
                value: e,
              }))}
              label="Thinking back to when you were aged about 14, which best describes the sort of work the main/highest income earner in your household did in their main job?"
              allowClear
              onChange={value =>
                setState(_state => ({
                  ..._state,
                  describeMainIncomeEarnerMainJob: value,
                }))
              }
              value={state.describeMainIncomeEarnerMainJob}
              error={errors.describeMainIncomeEarnerMainJob}
            />
          </S.IllCareWrapper>
        </Col>
      </Row>
      <Row>
        <Col w={[4, 6, 5.3]} style={{ marginTop: '20px' }}>
          <S.IllCareWrapper>
            <Select
              options={types.highestLevelOfQualifications.map(e => ({
                label: e,
                value: e,
              }))}
              label="What is the highest level of qualifications achieved by either of your parent(s) or guardian(s) by the time you were 18?"
              allowClear
              onChange={value =>
                setState(_state => ({
                  ..._state,
                  highestLevelOfQualifications: value,
                }))
              }
              value={state.highestLevelOfQualifications}
              error={errors.highestLevelOfQualifications}
            />
            {state.highestLevelOfQualifications &&
              state.highestLevelOfQualifications.includes('Other') && (
                <Input
                  onChange={onInputChange}
                  value={state.highestLevelOfQualificationsOther}
                  label="Please specify"
                  name="highestLevelOfQualificationsOther"
                  error={errors.highestLevelOfQualificationsOther}
                />
              )}
          </S.IllCareWrapper>
        </Col>
      </Row>
      <Row>
        <Col w={[4, 6, 5.3]} style={{ marginTop: '20px' }}>
          <Select
            options={types.parentsWorkInPress.map(e => ({
              label: e,
              value: e,
            }))}
            label="Did either of your parents or someone in your immediate family work in this industry?"
            allowClear
            onChange={value =>
              setState(_state => ({ ..._state, parentsWorkInPress: value }))
            }
            value={state.parentsWorkInPress}
            error={errors.parentsWorkInPress}
          />
        </Col>
      </Row>
      <Row mb={6} mbT={4}>
        <Col w={[4, 6, 5.3]} style={{ marginTop: '20px' }}>
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
        <Col w={[4, 12, 12]}>
          {mainError && <T.PXS color="pink">{mainError}</T.PXS>}
        </Col>
      </Row>
      <Row>
        <Col w={[4, 6, 5.3]} mb={6} mbT={3}>
          <Button
            type="secondary"
            onClick={() => onSubmit()}
            loading={saveLoading}
            disabled={saveLoading || continueLoading}
            outline
          >
            SAVE PROGRESS
          </Button>
        </Col>
        <Col w={[4, 6, 5.3]} mb={6} mbT={3}>
          <Button
            type="secondary"
            onClick={() => onSubmit(true)}
            loading={continueLoading}
            disabled={saveLoading || continueLoading}
          >
            CONTINUE
          </Button>
        </Col>
      </Row>
      <Row style={{ textAlign: 'center' }}>
        <Col w={[4, 12, 10.6]} style={{ marginTop: '30px' }}>
          <T.Link to={HOST_SIGNUP_LISTING} color="pink">
            I’ll finish this later
          </T.Link>
        </Col>
      </Row>

      <Notification
        open={notificationOpen}
        setOpen={setNotificationOpen}
        content="Changes saved"
        cb={done}
      />
    </div>
  );
};

export default AboutMe;
