import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Title from '../../Common/Title';

import { Input, Select } from '../../Common/Inputs';
import { Col, Row } from '../../Common/Grid';
import * as S from './style';
import * as T from '../../Common/Typography';
import Button from '../../Common/ButtonNew';
import {
  API_MY_BURSARY,
  API_SINGLE_BURSARY,
} from '../../../constants/apiRoutes';
import Notification from '../../Common/Notification';

import types from '../../../constants/types';
import { INTERN_SIGNUP_PROFILE } from '../../../constants/navRoutes';

const { validate, internSignup } = require('../../../validation');

const getCleanData = (d = {}) => ({
  typeOfSchool: d.typeOfSchool || '',
  typeOfSchoolOther: d.typeOfSchoolOther || '',
  highestLevelOfQualifications: d.highestLevelOfQualifications || '',
  highestLevelOfQualificationsOther: d.highestLevelOfQualificationsOther || '',
  describeMainIncomeEarnerMainJob: d.describeMainIncomeEarnerMainJob || '',
  numberOfPeopleKnowBefore16: d.numberOfPeopleKnowBefore16 || '',
  typeOfUniversity: d.typeOfUniversity || '',
  eligibleForFreeSchoolMeals: d.eligibleForFreeSchoolMeals || '',
  comingFromLowerSociolEconomicBackground:
    d.comingFromLowerSociolEconomicBackground || '',
  householdMembersSpeakOtherLanguage:
    d.householdMembersSpeakOtherLanguage || '',
  householdMembersSpeakOtherLanguageYes:
    d.householdMembersSpeakOtherLanguageYes || '',
  annualHouseholdIncome: d.annualHouseholdIncome || '',
  statusOfHome: d.statusOfHome || '',
  statusOfHomeOther: d.statusOfHomeOther || '',
  anyHouseholdReceive: d.anyHouseholdReceive || '',
  benefitFromNepotism: d.benefitFromNepotism || '',
  peopleYouKnowSocially: d.peopleYouKnowSocially || '',
  accentAffectsPotentialEmployers: d.accentAffectsPotentialEmployers || '',
  parentsSupportiveOfCareer: d.parentsSupportiveOfCareer || '',
});

const Bursary = () => {
  const history = useHistory();

  const [state, setState] = useState(getCleanData({}));

  const [errors, setErrors] = useState({});
  const [mainError, setMainError] = useState();
  const [saveLoading, setSaveLoading] = useState(false);
  const [continueLoading, setContinueLoading] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [prevData, setPrevData] = useState({});
  const [fetchData, setFetchData] = useState(0);
  const [fetchingData, setFetchingData] = useState(true);
  const [lastClickOnContinue, setLastClickOnContinue] = useState({});

  useEffect(() => {
    window.scrollTo({
      left: 0,
      top: 0,
    });
  }, []);

  const _validate = async isContinue => {
    const { errors: _errors } = await validate({
      schema: internSignup.bursary(prevData, isContinue),
      data: { ...state },
    });

    return _errors;
  };

  const onInputChange = e => {
    const { value, name } = e.target;

    setErrors(_errors => ({ ..._errors, [name]: '' }));
    return setState(_state => ({ ..._state, [name]: value }));
  };

  const onSave = async isContinue => {
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

      await axios.patch(API_SINGLE_BURSARY.replace(':id', prevData.id), state);
      setFetchingData(true);
      setNotificationOpen(true);
    } catch (e) {
      setMainError(e.response.data.error);
    } finally {
      setContinueLoading(false);
      setSaveLoading(false);
    }
  };

  useEffect(() => {
    if (!state.typeOfSchool || !state.typeOfSchool.includes('Other')) {
      setState(_state => ({ ..._state, typeOfSchoolOther: '' }));
    }
  }, [state.typeOfSchool]);

  useEffect(() => {
    if (
      !state.householdMembersSpeakOtherLanguage ||
      !state.householdMembersSpeakOtherLanguage.includes('Yes')
    ) {
      setState(_state => ({
        ..._state,
        householdMembersSpeakOtherLanguageYes: '',
      }));
    }
  }, [state.householdMembersSpeakOtherLanguage]);

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
    if (!state.statusOfHome || !state.statusOfHome.includes('Other')) {
      setState(_state => ({
        ..._state,
        statusOfHomeOther: '',
      }));
    }
  }, [state.statusOfHome]);

  useEffect(() => {
    const getData = async () => {
      const { data: bursary } = await axios.get(API_MY_BURSARY);
      setFetchingData(false);

      setState(getCleanData(bursary || {}));
      setPrevData({
        ...getCleanData(bursary || {}),
        id: bursary && bursary._id,
      });
    };

    getData();
  }, [fetchData]);

  const done = () => {
    if (lastClickOnContinue) {
      history.push(INTERN_SIGNUP_PROFILE);
    } else {
      setFetchData(e => e + 1);
    }
  };

  return (
    <div style={{ marginTop: '4rem', paddingBottom: '5rem' }}>
      <Row>
        <Title withBg mb="0">
          <Col w={[4, 12, 12]}>BURSARY</Col>
        </Title>
      </Row>

      <Row>
        <Col w={[4, 8, 9.3]}>
          <T.P>
            At the moment, every time you’re hosted by PressPad, the first two
            weeks are completely free. In addition, as part of our mission to
            increase diversity in the media, we have set up the PressPad Bursary
            Scheme. If you are eligible, we could cover 50 or 100% of your
            accommodation costs so you might not have to pay a thing. It does
            mean answering a few more questions though.... FYI Our team aims to
            reviews applications within 48 hours.
          </T.P>
        </Col>
        <Col w={[4, 12, 9.3]} mt={3}>
          {/* TODO get the right link */}
          <T.Link color="lightBlue" to="/bursary">
            Learn more about the PressPad Bursary here
          </T.Link>
        </Col>
      </Row>

      <Row>
        <S.IllCareWrapper>
          <Col w={[4, 8, 5.3]} mt={4}>
            <Select
              options={types.bursaryTypes.typeOfSchool.map(e => ({
                label: e,
                value: e,
              }))}
              label="What type of school did you mainly attend between the ages of 11 and 16?"
              allowClear
              onChange={value =>
                setState(_state => ({ ..._state, typeOfSchool: value }))
              }
              value={state.typeOfSchool}
              error={errors.typeOfSchool}
            />

            {state.typeOfSchool && state.typeOfSchool.includes('Other') && (
              <Input
                onChange={onInputChange}
                value={state.typeOfSchoolOther}
                label="Please specify"
                name="typeOfSchoolOther"
                error={errors.typeOfSchoolOther}
              />
            )}
          </Col>
        </S.IllCareWrapper>
      </Row>

      <Row>
        <S.IllCareWrapper>
          <Col w={[4, 8, 5.3]} mt={4}>
            <Select
              options={types.bursaryTypes.highestLevelOfQualifications.map(
                e => ({
                  label: e,
                  value: e,
                }),
              )}
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
          </Col>
        </S.IllCareWrapper>
      </Row>

      <Row>
        <S.IllCareWrapper>
          <Col w={[4, 8, 5.3]} mt={4}>
            <Select
              options={types.bursaryTypes.describeMainIncomeEarnerMainJob.map(
                e => ({
                  label: e,
                  value: e,
                }),
              )}
              label="Thinking back to when you were aged about 14, which best describes the sort of work the main/ highest income earner in your household did in their main job?"
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
          </Col>
        </S.IllCareWrapper>
      </Row>

      <Row>
        <S.IllCareWrapper>
          <Col w={[4, 8, 5.3]} mt={4}>
            <Select
              options={types.bursaryTypes.numberOfPeopleKnowBefore16.map(e => ({
                label: e,
                value: e,
              }))}
              label="How many people did you know before the age of 16 that work in the industry you're pursuing a career in?"
              allowClear
              onChange={value =>
                setState(_state => ({
                  ..._state,
                  numberOfPeopleKnowBefore16: value,
                }))
              }
              value={state.numberOfPeopleKnowBefore16}
              error={errors.numberOfPeopleKnowBefore16}
            />
          </Col>
        </S.IllCareWrapper>
      </Row>

      <Row>
        <S.IllCareWrapper>
          <Col w={[4, 8, 5.3]} mt={4}>
            <Select
              options={types.bursaryTypes.typeOfUniversity.map(e => ({
                label: e,
                value: e,
              }))}
              label="If you attended university, what type of did you attend?"
              helperText="(select as many as you like)"
              allowClear
              onChange={value =>
                setState(_state => ({
                  ..._state,
                  typeOfUniversity: value,
                }))
              }
              multi
              height="auto"
              value={state.typeOfUniversity}
              error={errors.typeOfUniversity}
            />
          </Col>
        </S.IllCareWrapper>
      </Row>

      <Row>
        <S.IllCareWrapper>
          <Col w={[4, 8, 5.3]} mt={4}>
            <Select
              options={types.bursaryTypes.eligibleForFreeSchoolMeals.map(e => ({
                label: e,
                value: e,
              }))}
              label="If you finished school after 1980, were you eligible for Free School Meals at any point during your school years? "
              allowClear
              onChange={value =>
                setState(_state => ({
                  ..._state,
                  eligibleForFreeSchoolMeals: value,
                }))
              }
              value={state.eligibleForFreeSchoolMeals}
              error={errors.eligibleForFreeSchoolMeals}
              extraInfo="Free School Meals are a statutory benefit available to school-aged children from families who receive other qualifying benefits and who have been through the relevant registration process. It does not include those who receive meals at school through other means (e.g. boarding school)."
            />
          </Col>
        </S.IllCareWrapper>
      </Row>

      <Row>
        <S.IllCareWrapper>
          <Col w={[4, 8, 5.3]} mt={4}>
            <Select
              options={types.bursaryTypes.comingFromLowerSociolEconomicBackground.map(
                e => ({
                  label: e,
                  value: e,
                }),
              )}
              label="Compared to people in general, would you describe yourself as coming from a lower socio-economic background?"
              allowClear
              onChange={value =>
                setState(_state => ({
                  ..._state,
                  comingFromLowerSociolEconomicBackground: value,
                }))
              }
              value={state.comingFromLowerSociolEconomicBackground}
              error={errors.comingFromLowerSociolEconomicBackground}
            />
          </Col>
        </S.IllCareWrapper>
      </Row>

      <Row>
        <S.IllCareWrapper>
          <Col w={[4, 8, 5.3]} mt={4}>
            <Select
              options={types.bursaryTypes.householdMembersSpeakOtherLanguage.map(
                e => ({
                  label: e,
                  value: e,
                }),
              )}
              label="Do household members speak and/or write a language other than English?"
              allowClear
              onChange={value =>
                setState(_state => ({
                  ..._state,
                  householdMembersSpeakOtherLanguage: value,
                }))
              }
              value={state.householdMembersSpeakOtherLanguage}
              error={errors.householdMembersSpeakOtherLanguage}
            />
            {state.householdMembersSpeakOtherLanguage &&
              state.householdMembersSpeakOtherLanguage.includes('Yes') && (
                <Input
                  onChange={onInputChange}
                  value={state.householdMembersSpeakOtherLanguageYes}
                  label="Please specify"
                  name="householdMembersSpeakOtherLanguageYes"
                  error={errors.householdMembersSpeakOtherLanguageYes}
                />
              )}
          </Col>
        </S.IllCareWrapper>
      </Row>

      <Row>
        <S.IllCareWrapper>
          <Col w={[4, 8, 5.3]} mt={4}>
            <Select
              options={types.bursaryTypes.annualHouseholdIncome.map(e => ({
                label: e,
                value: e,
              }))}
              label="What is your annual household income after tax?"
              allowClear
              onChange={value =>
                setState(_state => ({
                  ..._state,
                  annualHouseholdIncome: value,
                }))
              }
              value={state.annualHouseholdIncome}
              error={errors.annualHouseholdIncome}
            />
          </Col>
        </S.IllCareWrapper>
      </Row>

      <Row>
        <S.IllCareWrapper>
          <Col w={[4, 8, 5.3]} mt={4}>
            <Select
              options={types.bursaryTypes.statusOfHome.map(e => ({
                label: e,
                value: e,
              }))}
              label="What is the status of your home?"
              allowClear
              onChange={value =>
                setState(_state => ({
                  ..._state,
                  statusOfHome: value,
                }))
              }
              value={state.statusOfHome}
              error={errors.statusOfHome}
            />
            {state.statusOfHome && state.statusOfHome.includes('Other') && (
              <Input
                onChange={onInputChange}
                value={state.statusOfHomeOther}
                label="Please specify"
                name="statusOfHomeOther"
                error={errors.statusOfHomeOther}
              />
            )}
          </Col>
        </S.IllCareWrapper>
      </Row>

      <Row>
        <S.IllCareWrapper>
          <Col w={[4, 8, 5.3]} mt={4}>
            <Select
              options={types.bursaryTypes.anyHouseholdReceive.map(e => ({
                label: e,
                value: e,
              }))}
              label="How many people in your household at present receive any of the following?"
              helperText="(select as many as you like)"
              allowClear
              onChange={value =>
                setState(_state => ({
                  ..._state,
                  anyHouseholdReceive: value,
                }))
              }
              height="auto"
              multi
              value={state.anyHouseholdReceive}
              error={errors.anyHouseholdReceive}
            />
          </Col>
        </S.IllCareWrapper>
      </Row>

      <Row>
        <S.IllCareWrapper>
          <Col w={[4, 8, 5.3]} mt={4}>
            <Select
              options={types.bursaryTypes.benefitFromNepotism.map(e => ({
                label: e,
                value: e,
              }))}
              label="Have you ever benefited from nepotism in your work life?"
              extraInfo="Nepotism is what happens when someone receives favouritism or opportunities because of a family relationship in the context of jobs, business and politics. We think it can also refer to benefits received in connection with a family friend. For example: If you get an internship at a news organisation because your Dad’s university friend works there, or you get a chance to have a coffee with a journalist because your cousin's colleague knows them. We believe nepotism refers to benefiting from any connection that you haven’t made for yourself but that was passed down to you."
              allowClear
              onChange={value =>
                setState(_state => ({
                  ..._state,
                  benefitFromNepotism: value,
                }))
              }
              value={state.benefitFromNepotism}
              error={errors.benefitFromNepotism}
            />
          </Col>
        </S.IllCareWrapper>
      </Row>

      <Row>
        <S.IllCareWrapper>
          <Col w={[4, 8, 5.3]} mt={4}>
            <Select
              options={types.bursaryTypes.peopleYouKnowSocially.map(e => ({
                label: e,
                value: e,
              }))}
              label="Which of these people do you know socially?"
              helperText="(Select all that apply)"
              allowClear
              onChange={value =>
                setState(_state => ({
                  ..._state,
                  peopleYouKnowSocially: value,
                }))
              }
              height="auto"
              multi
              value={state.peopleYouKnowSocially}
              error={errors.peopleYouKnowSocially}
            />
          </Col>
        </S.IllCareWrapper>
      </Row>

      <Row>
        <S.IllCareWrapper>
          <Col w={[4, 8, 5.3]} mt={4}>
            <Select
              options={types.bursaryTypes.accentAffectsPotentialEmployers.map(
                e => ({
                  label: e,
                  value: e,
                }),
              )}
              label="Do you feel your accent affects the way potential employers view you?"
              allowClear
              onChange={value =>
                setState(_state => ({
                  ..._state,
                  accentAffectsPotentialEmployers: value,
                }))
              }
              value={state.accentAffectsPotentialEmployers}
              error={errors.accentAffectsPotentialEmployers}
            />
          </Col>
        </S.IllCareWrapper>
      </Row>
      <Row mb={6}>
        <S.IllCareWrapper>
          <Col w={[4, 8, 5.3]} mt={4}>
            <Select
              options={types.bursaryTypes.parentsSupportiveOfCareer.map(e => ({
                label: e,
                value: e,
              }))}
              label="Do you feel your parents are supportive of your chosen career?"
              allowClear
              onChange={value =>
                setState(_state => ({
                  ..._state,
                  parentsSupportiveOfCareer: value,
                }))
              }
              value={state.parentsSupportiveOfCareer}
              error={errors.parentsSupportiveOfCareer}
            />
          </Col>
        </S.IllCareWrapper>
      </Row>
      <Row>
        <Col w={[4, 12, 12]}>
          {mainError && <T.PXS color="pink">{mainError}</T.PXS>}
        </Col>
      </Row>
      <Row>
        <Col w={[4, 8, 5.3]} mb={6} mbT={3}>
          <Button
            type="secondary"
            onClick={() => onSave()}
            loading={saveLoading}
            disabled={saveLoading || continueLoading || fetchingData}
            outline
          >
            SAVE PROGRESS
          </Button>
        </Col>
        <Col w={[4, 8, 5.3]} mb={6} mbT={3}>
          <Button
            type="secondary"
            onClick={() => onSave(true)}
            loading={continueLoading}
            disabled={saveLoading || continueLoading || fetchingData}
          >
            CONTINUE
          </Button>
        </Col>
      </Row>
      <Row style={{ textAlign: 'center' }}>
        <Col w={[4, 8, 10.6]} style={{ marginTop: '30px' }}>
          <T.Link to={INTERN_SIGNUP_PROFILE} color="pink">
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

export default Bursary;
