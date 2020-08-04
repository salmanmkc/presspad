import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, DatePicker, Select } from '../../Common/Inputs';
import { Col, Row } from '../../Common/Grid';
import * as S from './style';
import * as T from '../../Common/Typography';
import Button from '../../Common/ButtonNew';
import { API_SETTINGS_MY_ACCOUNT } from '../../../constants/apiRoutes';
import Notification from '../../Common/Notification';
import { CLASSES_DEFINITIONS } from '../../../constants/externalLinks';
import types from '../../../constants/types';

const { validate, settingsMyAccountSchema } = require('../../../validation');

const AboutMe = props => {
  const [state, setState] = useState({
    birthDate: null,
    phoneNumber: '',
    hometown: '',
    lastStudySubject: '', // new
    lastStudyUniversity: '', // new
    hearAboutPressPadAnswer: '',
    gender: '',
    sexualOrientation: '',
    ethnicity: '',
    religion: '', // new
    neurodivergent: '', // new
    neurodivergentYes: '', // new
    disability: '',
    disabilityYes: '', // new
    childCare: '', // new
    illCare: '', // new
    degreeLevel: '',
    class: '', // new
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const _validate = async () => {
    const { errors: _errors } = await validate({
      schema: settingsMyAccountSchema,
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
        return;
      }

      setLoading(true);
      await axios.patch(API_SETTINGS_MY_ACCOUNT, state);
      setNotificationOpen(true);
      props.handleChangeState({ email: state.email, name: state.name });
    } catch (e) {
      setError(e.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!state.neurodivergent || !state.neurodivergent.includes('Yes')) {
      setState(_state => ({ ..._state, neurodivergentYes: null }));
    }
  }, [state.neurodivergent]);

  useEffect(() => {
    if (!state.disability || !state.disability.includes('Yes')) {
      setState(_state => ({ ..._state, disabilityYes: null }));
    }
  }, [state.disability]);

  return (
    <div>
      <Row>
        <Col w={[4, 6, 4]} style={{ marginTop: '20px' }}>
          <DatePicker
            onChange={momentDate =>
              setState(_state => ({ ..._state, birthDate: momentDate }))
            }
            value={state.birthDate}
            label="Date of birth"
          />
        </Col>
        <Col w={[4, 6, 4]} style={{ marginTop: '20px' }}>
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
        <Col w={[4, 6, 4]} style={{ marginTop: '20px' }}>
          <Input
            onChange={onInputChange}
            value={state.hometown}
            label="Hometown"
            name="hometown"
            error={errors.hometown}
          />
        </Col>
        <Col w={[4, 6, 4]} style={{ marginTop: '20px' }}>
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
        <Col w={[4, 6, 4]} style={{ marginTop: '20px' }}>
          <Input
            onChange={onInputChange}
            value={state.lastStudyUniversity}
            label="Where I last studied"
            name="lastStudyUniversity"
            error={errors.lastStudyUniversity}
          />
        </Col>
        <Col w={[4, 6, 4]} style={{ marginTop: '20px' }}>
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
        <Col w={[4, 6, 4]} style={{ marginTop: '20px' }}>
          <Select
            options={types.gender.map(e => ({ label: e, value: e }))}
            label="Gender"
            allowClear
            onChange={value =>
              setState(_state => ({ ..._state, gender: value }))
            }
            value={state.gender}
          />
        </Col>
        <Col w={[4, 6, 4]} style={{ marginTop: '20px' }}>
          <Select
            options={types.sexualOrientation.map(e => ({ label: e, value: e }))}
            label="Sexual Orientation"
            allowClear
            onChange={value =>
              setState(_state => ({ ..._state, sexualOrientation: value }))
            }
            value={state.sexualOrientation}
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 6, 4]} style={{ marginTop: '20px' }}>
          <Select
            options={types.ethnicity.map(e => ({ label: e, value: e }))}
            label="Ethnicity"
            allowClear
            onChange={value =>
              setState(_state => ({ ..._state, ethnicity: value }))
            }
            value={state.ethnicity}
          />
        </Col>
        <Col w={[4, 6, 4]} style={{ marginTop: '20px' }}>
          <Select
            options={types.religion.map(e => ({ label: e, value: e }))}
            label="Religion"
            allowClear
            onChange={value =>
              setState(_state => ({ ..._state, religion: value }))
            }
            value={state.religion}
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 6, 4]} style={{ marginTop: '20px' }}>
          <Select
            options={types.disability.map(e => ({ label: e, value: e }))}
            label="Disability"
            allowClear
            onChange={value =>
              setState(_state => ({ ..._state, disability: value }))
            }
            value={state.disability}
          />

          {state.disability && state.disability.includes('Yes') && (
            <Select
              options={types.disabilityYes.map(e => ({ label: e, value: e }))}
              label="Please specify"
              allowClear
              onChange={value =>
                setState(_state => ({ ..._state, disabilityYes: value }))
              }
              value={state.disabilityYes}
            />
          )}
        </Col>

        <Col w={[4, 6, 4]} style={{ marginTop: '20px' }}>
          <Select
            options={types.neurodivergent.map(e => ({ label: e, value: e }))}
            label="Neurodivergent condition"
            allowClear
            onChange={value =>
              setState(_state => ({ ..._state, neurodivergent: value }))
            }
            value={state.neurodivergent}
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
                setState(_state => ({ ..._state, neurodivergentYes: value }))
              }
              value={state.neurodivergentYes}
            />
          )}
        </Col>
      </Row>

      <Row>
        <Col w={[4, 6, 4]} style={{ marginTop: '20px' }}>
          <Select
            options={types.childCare.map(e => ({ label: e, value: e }))}
            label="Are you a primary carer for a child or children under 18?"
            allowClear
            onChange={value =>
              setState(_state => ({ ..._state, childCare: value }))
            }
            value={state.childCare}
          />
        </Col>
      </Row>

      <Row>
        <S.IllCareWrapper>
          <Col w={[4, 6, 4]} style={{ marginTop: '20px' }}>
            <Select
              options={types.illCare.map(e => ({ label: e, value: e }))}
              label="Do you look after or care for someone with long term physical or mental ill health caused by disability or age (not in a paid capacity)?"
              allowClear
              onChange={value =>
                setState(_state => ({ ..._state, illCare: value }))
              }
              value={state.illCare}
            />
          </Col>
        </S.IllCareWrapper>
      </Row>

      <Row>
        <Col w={[4, 6, 4]} style={{ marginTop: '20px' }}>
          <Select
            options={types.class.map(e => ({ label: e, value: e }))}
            label="Degree level"
            allowClear
            onChange={value =>
              setState(_state => ({ ..._state, class: value }))
            }
            value={state.class}
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 6, 4]} style={{ marginTop: '20px' }}>
          <S.IllCareWrapper>
            <Select
              options={types.class.map(e => ({ label: e, value: e }))}
              label="Which class fo you self-identify as belonging to?"
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
                setState(_state => ({ ..._state, class: value }))
              }
              value={state.class}
            />
          </S.IllCareWrapper>
        </Col>
      </Row>

      <Row>
        <Col w={[4, 6, 4]} style={{ marginTop: '48px' }}>
          {error && <T.PXS color="pink">{error}</T.PXS>}

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
    </div>
  );
};

export default AboutMe;
