import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Input, UploadFile, Select } from '../../../Common/Inputs';
import { Col, Row } from '../../../Common/Grid';

import * as T from '../../../Common/Typography';
import Button from '../../../Common/ButtonNew';
import {
  API_INTERN_SETTINGS_VERIFICATIONS,
  API_MY_PROFILE_URL,
} from '../../../../constants/apiRoutes';
import { SETTINGS } from '../../../../constants/navRoutes';
import {
  DBS_EXTERNAL,
  PROPERTY_CHECKS,
} from '../../../../constants/externalLinks';
import { hostWorkingArea } from '../../../../constants/types';
import Notification from '../../../Common/Notification';

import { createSingleDate } from '../../../../helpers';

const { validate, hostSettings } = require('../../../../validation');

const getCleanData = (d = {}) => ({
  jobTitle: d.jobTitle || '',
  workingArea: d.workingArea || '',
  workingAreaOther: d.workingAreaOther || '',
  organisation: d.organisation || '',
  reference1: d.reference1 || {
    name: '',
    email: '',
  },
  reference2: d.reference2 || {
    name: '',
    email: '',
  },
  photoID: d.photoID || {
    fileName: '',
  },
  pressCard: d.pressCard || {
    fileName: '',
  },
  DBSCheck: d.DBSCheck || {
    fileName: '',
    refNum: '',
  },
  houseViewingDate: d.houseViewingDate || null,
});

const Verifications = props => {
  const [state, setState] = useState({
    jobTitle: '',
    organisation: '',
    workingArea: '',
    workingAreaOther: '',
    reference1: {
      name: '',
      email: '',
    },
    reference2: {
      name: '',
      email: '',
    },
    photoID: {
      fileName: '',
    },
    pressCard: {
      fileName: '',
    },
    DBSCheck: {
      fileName: '',
    },
    refNum: '',
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const [prevData, setPrevData] = useState({});
  const [fetchData, setFetchData] = useState(0);

  const history = useHistory();

  const uploadPhotoID = async () => {
    try {
      const generatedName = `${props.id}/${Date.now()}.${state.photoID.name}`;
      const {
        data: { signedUrl },
      } = await axios.get(`/api/upload/signed-url?fileName=${generatedName}`);
      const headers = {
        'Content-Type': 'application/octet-stream',
      };

      await axios.put(signedUrl, state.photoID, {
        headers,
      });

      return {
        fileName: generatedName,
        new: true,
        uploaded: true,
        preview: state.photoID.preview,
      };
    } catch (e) {
      return setError(e.message);
    }
  };

  useEffect(() => {
    if (!state.workingArea || !state.workingArea.includes('Other')) {
      setState(_state => ({ ..._state, workingAreaOther: '' }));
    }
  }, [state.workingArea]);

  const uploadpressCard = async () => {
    try {
      const generatedName = `${props.id}/${Date.now()}.${state.pressCard.name}`;
      const {
        data: { signedUrl },
      } = await axios.get(`/api/upload/signed-url?fileName=${generatedName}`);
      const headers = {
        'Content-Type': 'application/octet-stream',
      };

      await axios.put(signedUrl, state.pressCard, {
        headers,
      });

      return {
        fileName: generatedName,
        new: true,
        uploaded: true,
        preview: state.pressCard.preview,
      };
    } catch (e) {
      return setError(e.message);
    }
  };

  const uploadDBSCheck = async () => {
    try {
      const generatedName = `${props.id}/${Date.now()}.${state.DBSCheck.name}`;
      const {
        data: { signedUrl },
      } = await axios.get(`/api/upload/signed-url?fileName=${generatedName}`);
      const headers = {
        'Content-Type': 'application/octet-stream',
      };

      await axios.put(signedUrl, state.DBSCheck, {
        headers,
      });

      return {
        fileName: generatedName,
        new: true,
        uploaded: true,
        preview: state.DBSCheck.preview,
      };
    } catch (e) {
      return setError(e.message);
    }
  };

  const _validate = async () => {
    const { errors: _errors } = await validate({
      schema: hostSettings.verifications({
        jobTitle: 'sdd',
        workingArea: 'ss',
      }),
      data: { ...state },
    });
    let e = _errors;
    if (prevData.photoID && state.photoID.deleted) {
      e = e
        ? { ...e, photoID: 'identity proof is required' }
        : { photoID: 'identity proof is required' };
    }
    if (prevData.DBSCheck && state.DBSCheck.deleted) {
      e = e
        ? { ...e, DBSCheck: 'DBS file is required' }
        : { DBSCheck: 'DBS file is required' };
    }
    return e;
  };

  const onInputChange = e => {
    const { value, name } = e.target;

    setErrors(_errors => ({ ..._errors, [name]: '' }));
    return setState(_state => ({ ..._state, [name]: value }));
  };

  const update = async (_DBSCheck, _photoID, _pressCard) => {
    try {
      await axios.patch(API_INTERN_SETTINGS_VERIFICATIONS, {
        ...state,
        DBSCheck: _DBSCheck || state.DBSCheck,
        photoID: _photoID || state.photoID,
        pressCard: _pressCard || state.pressCard,
        prevPhotoIDToDelete:
          state.photoID &&
          state.photoID.new &&
          prevData.photoID &&
          prevData.photoID.fileName,
        prevDBSCheckToDelete:
          state.DBSCheck &&
          state.DBSCheck.new &&
          prevData.DBSCheck &&
          prevData.DBSCheck.fileName,
        pressCardToDelete:
          state.pressCard &&
          state.pressCard.new &&
          prevData.pressCard &&
          prevData.pressCard.fileName,
      });
    } catch (e) {
      setError(e.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    let _DBSCheck;
    let _photoID;
    let _pressCard;
    const _errors = await _validate(state);

    setErrors(_errors || {});

    if (_errors) {
      setError('Must fill all required fields');
      return;
    }
    setError();
    setLoading(true);
    if (
      (state.DBSCheck && state.DBSCheck.new && !state.DBSCheck.uploaded) ||
      (state.photoID && state.photoID.new && !state.photoID.uploaded) ||
      (state.pressCard && state.pressCard.new && !state.pressCard.uploaded)
    ) {
      const promiseArr = [];
      if (state.DBSCheck && state.DBSCheck.new) {
        promiseArr.push(
          uploadDBSCheck().catch(err =>
            setErrors(e => ({ ...e, DBSCheck: err.message })),
          ),
        );
      } else {
        promiseArr.push(Promise.resolve());
      }
      if (state.photoID && state.photoID.new) {
        promiseArr.push(
          uploadPhotoID().catch(err =>
            setErrors(e => ({ ...e, DBSCheck: err.message })),
          ),
        );
      } else {
        promiseArr.push(Promise.resolve());
      }
      if (state.pressCard && state.pressCard.new) {
        promiseArr.push(
          uploadpressCard().catch(err =>
            setErrors(e => ({ ...e, pressCard: err.message })),
          ),
        );
      } else {
        promiseArr.push(Promise.resolve());
      }

      [_DBSCheck, _photoID, _pressCard] = await Promise.all(promiseArr);
    }
    await update(_DBSCheck, _photoID, _pressCard);
    setNotificationOpen(true);
  };

  useEffect(() => {
    const getData = async () => {
      const {
        data: { profile },
      } = await axios.get(API_MY_PROFILE_URL);
      console.log('profile', profile);
      setState(getCleanData(profile));
      setPrevData(getCleanData(profile));
    };
    getData();
  }, [fetchData]);

  const done = () => {
    if (
      (prevData.DBSCheck &&
        state.refNum &&
        prevData.DBSCheck.refNum !== state.refNum) ||
      (prevData.DBSCheck &&
        prevData.DBSCheck.fileName &&
        state.DBSCheck &&
        state.DBSCheck.fileName &&
        prevData.DBSCheck.fileName !== state.DBSCheck.fileName)
    ) {
      history.push(SETTINGS.UNDER_REVIEW);
    } else {
      setFetchData(e => e + 1);
    }
  };
  return (
    <div style={{ marginTop: '2rem' }}>
      <Row mb={3}>
        <Col w={[4, 6, 4]}>
          <Input
            onChange={onInputChange}
            value={state.jobTitle}
            label="Job title"
            name="jobTitle"
            error={errors.jobTitle}
          />
        </Col>
        <Col w={[4, 6, 4]}>
          <Input
            onChange={onInputChange}
            value={state.organisation}
            label="Organisation"
            name="organisation"
            error={errors.organisation}
          />
        </Col>
      </Row>
      <Row mb={6}>
        <Col w={[4, 6, 4]}>
          <Select
            options={hostWorkingArea.map(e => ({ label: e, value: e }))}
            label="Area you work in"
            allowClear
            onChange={value =>
              setState(_state => ({ ..._state, workingArea: value || '' }))
            }
            value={state.workingArea}
            error={errors.workingArea}
          />
          {state.workingArea && state.workingArea.includes('Other') && (
            <Input
              onChange={onInputChange}
              value={state.workingAreaOther}
              label="Please specify"
              name="workingAreaOther"
              error={errors.workingAreaOther}
            />
          )}
        </Col>
      </Row>

      <Row mb={3}>
        <Col w={[4, 8, 8]}>
          <T.H5 color="blue">References</T.H5>
          <T.P color="gray3">
            Please provide one personal and one professional reference. Please
            make sure that the professional reference is from someone you've
            recently worked with.
          </T.P>
        </Col>
      </Row>

      <Row mb={3}>
        <Col w={[4, 6, 4]}>
          <Input
            onChange={e => {
              e.persist();
              setState(_state => ({
                ..._state,
                reference1: {
                  ...state.reference1,
                  name: e.target.value,
                },
              }));
            }}
            value={state.reference1 && state.reference1.name}
            label="1. Reference name"
            name="name"
            error={errors.reference1 && errors.reference1.name}
          />
        </Col>

        <Col w={[4, 6, 4]}>
          <Input
            onChange={e => {
              e.persist();
              setState(_state => ({
                ..._state,
                reference1: {
                  ...state.reference1,
                  email: e.target.value,
                },
              }));
            }}
            value={state.reference1 && state.reference1.email}
            label="Reference email"
            name="email"
            error={errors.reference1 && errors.reference1.email}
          />
        </Col>
      </Row>

      <Row mb={6}>
        <Col w={[4, 6, 4]}>
          <Input
            onChange={e => {
              e.persist();
              setState(_state => ({
                ..._state,
                reference2: {
                  ...state.reference2,
                  name: e.target.value,
                },
              }));
            }}
            value={state.reference2 && state.reference2.name}
            label="2. Reference name"
            name="name"
            error={errors.reference2 && errors.reference2.name}
          />
        </Col>

        <Col w={[4, 6, 4]}>
          <Input
            onChange={e => {
              e.persist();
              setState(_state => ({
                ..._state,
                reference2: {
                  ...state.reference2,
                  email: e.target.value,
                },
              }));
            }}
            value={state.reference2 && state.reference2.email}
            label="Reference email"
            name="email"
            error={errors.reference2 && errors.reference2.email}
          />
        </Col>
      </Row>

      <Row mb={3}>
        <Col w={[4, 8, 8]}>
          <T.H5 color="blue">Verification documents</T.H5>
        </Col>
      </Row>

      <Row mb={6}>
        <Col w={[4, 6, 4]}>
          <T.PBold color="blue">Proof of identity </T.PBold>
          <T.PXS color="gray3" mb={3}>
            e.g. a photo of your passport or driver’s licence
          </T.PXS>
          <UploadFile
            fullWidth
            mainText="Drag new photo here or click"
            secondaryText="file size max 2mb"
            type="file"
            userId={props.id}
            files={[state.photoID]}
            setFiles={([photoID]) =>
              setState(_state => ({ ..._state, photoID }))
            }
            error={errors.photoID}
          />
        </Col>

        <Col w={[4, 6, 4]}>
          <T.PBold color="blue">Proof that you work in the media </T.PBold>
          <T.PXS color="gray3" mb={3}>
            This can be a photo of your press card or of a letter/email
          </T.PXS>
          <UploadFile
            fullWidth
            mainText="Drag new photo here or click"
            secondaryText="file size max 2mb"
            type="file"
            userId={props.id}
            files={[state.pressCard]}
            setFiles={([pressCard]) =>
              setState(_state => ({ ..._state, pressCard }))
            }
            error={errors.photoID}
          />
        </Col>
      </Row>

      <Row mb={3}>
        <Col w={[4, 8, 7]}>
          <T.H5 color="blue" mt={5}>
            DBS Certificate{' '}
          </T.H5>

          <T.PXS color="gray3">
            This is the official UK criminal records check. If you don’t have
            one, please click here{' '}
            <T.Link to={DBS_EXTERNAL} isExternal color="lightBlue">
              click here
            </T.Link>{' '}
            and we will do it for you for free. It will take no longer than 5
            minutes to complete
          </T.PXS>
        </Col>
      </Row>
      <Row mb={6}>
        <Col w={[4, 6, 4]}>
          <UploadFile
            fullWidth
            mainText="Upload your profile picture here"
            secondaryText="file size max 2mb"
            type="file"
            userId={props.id}
            files={[state.DBSCheck]}
            setFiles={([DBSCheck]) =>
              setState(_state => ({
                ..._state,
                DBSCheck,
              }))
            }
            error={errors.DBSCheck}
          />
        </Col>
        <Col w={[4, 6, 4]} style={{ marginTop: '20px' }}>
          <Input
            onChange={onInputChange}
            value={state.refNum}
            label="DBS number"
            name="refNum"
            error={errors.refNum}
          />
        </Col>
      </Row>
      <Row mb={3}>
        <Col w={[4, 8, 7]}>
          <T.H5 color="blue" mb={2}>
            Book a video property check
          </T.H5>

          <T.H7C color="gray3">
            Viewing Date:{' '}
            {state.houseViewingDate
              ? createSingleDate(state.houseViewingDate)
              : 'N/A'}
          </T.H7C>
        </Col>
      </Row>
      <Row>
        <Col w={[4, 6, 7]}>
          <T.P color="gray3">
            <T.Link to={PROPERTY_CHECKS} isExternal color="lightBlue">
              Click here
            </T.Link>{' '}
            to book a time for one of our team to carry out a video check of
            your home. This check will take no longer than 30 minutes maximum.
          </T.P>
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
        cb={done}
      />
    </div>
  );
};

export default Verifications;
