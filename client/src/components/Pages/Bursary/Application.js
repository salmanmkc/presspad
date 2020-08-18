import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Input, UploadFile, DatePicker, Select } from '../../Common/Inputs';
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
import { BURSARY_SUCCESS } from '../../../constants/navRoutes';

const { validate, internBursary } = require('../../../validation');

const getCleanData = (d = {}) => ({
  // bursary data
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

  // profile data
  organisation: d.organisation || '',
  internshipContact: d.internshipContact || {
    name: '',
    email: '',
    phoneNumber: '',
  },
  internshipStartDate: d.internshipStartDate || null,
  internshipEndDate: d.internshipEndDate || null,
  internshipOfficeAddress: d.internshipOfficeAddress || {
    addressline1: '',
    addressline2: '',
    city: '',
    postcode: '',
  },
  offerLetter: d.offerLetter || {
    fileName: '',
  },
});

const Bursary = props => {
  const history = useHistory();

  const [state, setState] = useState(getCleanData({}));

  const [errors, setErrors] = useState({});
  const [mainError, setMainError] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [prevData, setPrevData] = useState({});
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    window.scrollTo({
      left: 0,
      top: 0,
    });
  }, []);

  const _validate = async () => {
    const { errors: _errors } = await validate({
      schema: internBursary,
      data: { ...state },
    });

    let e = _errors;

    if (
      (prevData.offerLetter && state.offerLetter.deleted) ||
      !state.offerLetter
    ) {
      e = e
        ? { ...e, offerLetter: 'Proof of internship file is required' }
        : { offerLetter: 'Proof of internship file is required' };
    }

    return e;
  };

  const onInputChange = e => {
    const { value, name } = e.target;

    setErrors(_errors => ({ ..._errors, [name]: '' }));
    return setState(_state => ({ ..._state, [name]: value }));
  };

  const uploadFile = async (file = {}) => {
    try {
      const generatedName = `${props.id}/${Date.now()}.${file.name}`;
      const {
        data: { signedUrl },
      } = await axios.get(`/api/upload/signed-url?fileName=${generatedName}`);
      const headers = {
        'Content-Type': 'application/octet-stream',
      };

      await axios.put(signedUrl, file, {
        headers,
      });

      return {
        fileName: generatedName,
        new: true,
        uploaded: true,
        preview: file.preview,
      };
    } catch (e) {
      return setMainError(e.message);
    }
  };

  const onSave = async () => {
    try {
      let _offerLetter;

      setErrors({});

      const _errors = await _validate();

      setErrors(_errors || {});

      if (_errors) {
        setMainError('Must fill all required fields');
        return;
      }
      setMainError();

      setLoading(true);

      if (
        state.offerLetter &&
        state.offerLetter.new &&
        !state.offerLetter.uploaded
      ) {
        const promiseArr = [];

        if (state.offerLetter && state.offerLetter.new) {
          promiseArr.push(
            uploadFile(state.offerLetter).catch(err =>
              setErrors(e => ({ ...e, offerLetter: err.message })),
            ),
          );
        } else {
          promiseArr.push(Promise.resolve());
        }

        [_offerLetter] = await Promise.all(promiseArr);
      }

      await axios.patch(
        `${API_SINGLE_BURSARY.replace(':id', prevData.id)}?profile=true`,
        {
          ...state,
          offerLetter: _offerLetter || state.offerLetter,
          prevOfferLetterToDelete:
            state.offerLetter &&
            state.offerLetter.new &&
            prevData.offerLetter &&
            prevData.offerLetter.fileName &&
            prevData.offerLetter.fileName,
        },
      );
      setFetchingData(true);
      setNotificationOpen(true);
    } catch (e) {
      setMainError(e.response.data.error);
    } finally {
      setLoading(false);
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
      const { data: bursary } = await axios.get(
        `${API_MY_BURSARY}?profile=true`,
      );
      setFetchingData(false);

      setState(getCleanData(bursary || {}));
      setPrevData({
        ...getCleanData(bursary || {}),
        id: bursary && bursary._id,
      });
    };

    getData();
  }, []);

  const done = () => {
    history.push(BURSARY_SUCCESS);
  };

  return (
    <div style={{ marginTop: '4rem', paddingBottom: '5rem' }}>
      <Row>
        <Col w={[4, 12, 6]}>
          <T.H2 color="blue" mb={6}>
            Bursary
          </T.H2>
          <T.H5 color="pink" mb={3}>
            Please double check and update any relevant details below and then
            click submit.
          </T.H5>
        </Col>
      </Row>

      <Row>
        <Col w={[4, 8, 8]} mt={6}>
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
      </Row>

      <Row>
        <S.IllCareWrapper width="150%">
          <Col w={[4, 8, 8]} mt={6}>
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
        <S.IllCareWrapper width="150%">
          <Col w={[4, 8, 8]} mt={6}>
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
        <S.IllCareWrapper width="150%">
          <Col w={[4, 8, 8]} mt={6}>
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
        <S.IllCareWrapper width="150%">
          <Col w={[4, 8, 8]} mt={6}>
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
        <S.IllCareWrapper width="150%">
          <Col w={[4, 8, 8]} mt={6}>
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
        <S.IllCareWrapper width="150%">
          <Col w={[4, 8, 8]} mt={6}>
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
        <S.IllCareWrapper width="150%">
          <Col w={[4, 8, 8]} mt={6}>
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
        <S.IllCareWrapper width="150%">
          <Col w={[4, 8, 8]} mt={6}>
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
        <S.IllCareWrapper width="150%">
          <Col w={[4, 8, 8]} mt={6}>
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
        <S.IllCareWrapper width="150%">
          <Col w={[4, 8, 8]} mt={6}>
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
        <S.IllCareWrapper width="150%">
          <Col w={[4, 8, 8]} mt={6}>
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
        <S.IllCareWrapper width="150%">
          <Col w={[4, 8, 8]} mt={6}>
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
        <S.IllCareWrapper width="150%">
          <Col w={[4, 8, 8]} mt={6}>
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
        <S.IllCareWrapper width="150%">
          <Col w={[4, 8, 8]} mt={6}>
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
        <Col w={[4, 8, 8]}>
          <T.H5 color="blue" mt={6}>
            Placement Details
          </T.H5>
          <T.P color="gray3" mt={2}>
            In order to apply for a bursary, you nee dot have an internship,
            work placements or contract lined up. Please check that the below
            internship details are still correct.
          </T.P>
        </Col>
      </Row>

      <Row>
        <Col w={[4, 6, 6]} mt={6}>
          <Input
            onChange={onInputChange}
            value={state.organisation}
            label="Name of organisation"
            name="organisation"
            error={errors.organisation}
          />
        </Col>

        <Col w={[4, 6, 6]} mt={6}>
          <Input
            onChange={e => {
              e.persist();
              setState(_state => ({
                ..._state,
                internshipContact: {
                  ...state.internshipContact,
                  name: e.target.value,
                },
              }));
            }}
            value={state.internshipContact && state.internshipContact.name}
            label="Contact name"
            placeholder="Contact name..."
            name="name"
            error={errors.internshipContact && errors.internshipContact.name}
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 6, 6]} mt={6}>
          <Input
            onChange={e => {
              e.persist();
              setState(_state => ({
                ..._state,
                internshipContact: {
                  ...state.internshipContact,
                  email: e.target.value,
                },
              }));
            }}
            value={state.internshipContact && state.internshipContact.email}
            label="Contact email"
            placeholder="Contact email..."
            name="email"
            error={errors.internshipContact && errors.internshipContact.email}
          />
        </Col>
        <Col w={[4, 6, 6]} mt={6}>
          <Input
            onChange={e => {
              e.persist();
              setState(_state => ({
                ..._state,
                internshipContact: {
                  ...state.internshipContact,
                  phoneNumber: e.target.value,
                },
              }));
            }}
            value={
              state.internshipContact && state.internshipContact.phoneNumber
            }
            label="Contact number"
            placeholder="Contact number..."
            name="phoneNumber"
            error={
              errors.internshipContact && errors.internshipContact.phoneNumber
            }
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 6, 6]} mt={6}>
          <DatePicker
            onChange={momentDate =>
              setState(_state => ({
                ..._state,
                internshipStartDate: momentDate,
              }))
            }
            value={state.internshipStartDate}
            label="Start date"
            error={errors.internshipStartDate}
          />
        </Col>

        <Col w={[4, 6, 6]} mt={6}>
          <DatePicker
            onChange={momentDate =>
              setState(_state => ({
                ..._state,
                internshipEndDate: momentDate,
              }))
            }
            value={state.internshipEndDate}
            label="End date"
            error={errors.internshipEndDate}
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 6, 6]} mt={6}>
          <Input
            onChange={e => {
              e.persist();
              setState(_state => ({
                ..._state,
                internshipOfficeAddress: {
                  ...state.internshipOfficeAddress,
                  addressline1: e.target.value,
                },
              }));
            }}
            value={
              state.internshipOfficeAddress &&
              state.internshipOfficeAddress.addressline1
            }
            label="Address Line 1"
            name="addressline1"
            error={
              errors.internshipOfficeAddress &&
              errors.internshipOfficeAddress.addressline1
            }
          />
        </Col>

        <Col w={[4, 6, 6]} mt={6}>
          <Input
            onChange={e => {
              e.persist();
              setState(_state => ({
                ..._state,
                internshipOfficeAddress: {
                  ...state.internshipOfficeAddress,
                  addressline2: e.target.value,
                },
              }));
            }}
            value={
              state.internshipOfficeAddress &&
              state.internshipOfficeAddress.addressline2
            }
            label="Address Line 2"
            name="addressline2"
            error={
              errors.internshipOfficeAddress &&
              errors.internshipOfficeAddress.addressline2
            }
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 6, 6]} mt={6}>
          <Input
            onChange={e => {
              e.persist();
              setState(_state => ({
                ..._state,
                internshipOfficeAddress: {
                  ...state.internshipOfficeAddress,
                  city: e.target.value,
                },
              }));
            }}
            value={
              state.internshipOfficeAddress &&
              state.internshipOfficeAddress.city
            }
            label="City"
            name="city"
            error={
              errors.internshipOfficeAddress &&
              errors.internshipOfficeAddress.city
            }
          />
        </Col>

        <Col w={[4, 6, 6]} mt={6}>
          <Input
            onChange={e => {
              e.persist();

              setState(_state => ({
                ..._state,
                internshipOfficeAddress: {
                  ...state.internshipOfficeAddress,
                  postcode: e.target.value,
                },
              }));
            }}
            value={
              state.internshipOfficeAddress &&
              state.internshipOfficeAddress.postcode
            }
            label="Postcode"
            name="postcode"
            error={
              errors.internshipOfficeAddress &&
              errors.internshipOfficeAddress.postcode
            }
          />
        </Col>
      </Row>

      <Row mt={6}>
        <Col w={[4, 8, 8]}>
          <T.H5 color="blue" mt={4}>
            Proof of internship
          </T.H5>
          <T.P color="gray3">
            e.g. an offer letter or something similar that can be used as proof
            of your internship
          </T.P>
        </Col>
      </Row>

      <UploadFile
        mainText="Upload file by dragging here"
        secondaryText="file size max 2mb"
        type="file"
        userId={props.id}
        files={[state.offerLetter]}
        setFiles={([offerLetter]) =>
          setState(_state => ({
            ..._state,
            offerLetter,
          }))
        }
        error={errors.offerLetter}
      />

      <Row mt={6}>
        <Col w={[6, 12, 12]}>
          {mainError && <T.PXS color="pink">{mainError}</T.PXS>}
        </Col>
      </Row>
      <Row>
        <Col w={[4, 8, 8]} mb={6} mbT={3}>
          <Button
            type="secondary"
            onClick={onSave}
            loading={loading}
            disabled={loading || fetchingData}
          >
            Submit
          </Button>
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
