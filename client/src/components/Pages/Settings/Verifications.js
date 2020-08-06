import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, UploadFile, DatePicker } from '../../Common/Inputs';
import { Col, Row } from '../../Common/Grid';

import * as T from '../../Common/Typography';
import Button from '../../Common/ButtonNew';
import {
  API_INTERN_SETTINGS_VERIFICATIONS,
  API_MY_PROFILE_URL,
} from '../../../constants/apiRoutes';
import Notification from '../../Common/Notification';

const { validate, internSettings } = require('../../../validation');

const getCleanData = (d = {}) => ({
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
  DBSCheck: d.DBSCheck || {
    fileName: '',
  },
  refNum: d.refNum || (d.DBSCheck && d.DBSCheck.refNum) || '',
});

const Verifications = props => {
  const [state, setState] = useState({
    organisation: '',
    internshipContact: {
      name: '',
      email: '',
      phoneNumber: '',
    },
    internshipStartDate: null,
    internshipEndDate: null,
    internshipOfficeAddress: {
      addressline1: '',
      addressline2: '',
      city: '',
      postcode: '',
    },
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

  // for images

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
      schema: internSettings.verifications(prevData),
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

  const update = async (_DBSCheck, _photoID) => {
    try {
      await axios.patch(API_INTERN_SETTINGS_VERIFICATIONS, {
        ...state,
        DBSCheck: _DBSCheck || state.DBSCheck,
        photoID: _photoID || state.photoID,
        prevPhotoIDToDelete:
          state.photoID &&
          state.photoID.new &&
          prevData.photoID &&
          prevData.photoID.fileName &&
          prevData.photoID.fileName,
        prevDBSCheckToDelete:
          state.DBSCheck &&
          state.DBSCheck.new &&
          prevData.DBSCheck &&
          prevData.DBSCheck.fileName &&
          prevData.DBSCheck.fileName,
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
    const _errors = await _validate();

    setErrors(_errors || {});

    if (_errors) {
      setError('Must fill all required fields');
      return;
    }
    setError();
    if (
      (state.DBSCheck && state.DBSCheck.new && !state.DBSCheck.uploaded) ||
      (state.photoID && state.photoID.new && !state.photoID.uploaded)
    ) {
      setLoading(true);

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

      [_DBSCheck, _photoID] = await Promise.all(promiseArr);
    }
    await update(_DBSCheck, _photoID);
    setNotificationOpen(true);
  };

  useEffect(() => {
    const getData = async () => {
      const {
        data: { profile },
      } = await axios.get(API_MY_PROFILE_URL);

      setState(getCleanData(profile));
      setPrevData(getCleanData(profile));
    };
    getData();
  }, [fetchData]);

  return (
    <div>
      <Row>
        <Col w={[4, 4, 4]}>
          <T.H5 color="blue">Internship Details</T.H5>
        </Col>
      </Row>

      <Row>
        <Col w={[4, 6, 6]} style={{ marginTop: '20px' }}>
          <Input
            onChange={onInputChange}
            value={state.organisation}
            label="Name of organisation"
            name="organisation"
            error={errors.organisation}
          />
        </Col>

        <Col w={[4, 6, 6]} style={{ marginTop: '20px' }}>
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
        <Col w={[4, 6, 6]} style={{ marginTop: '20px' }}>
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
        <Col w={[4, 6, 6]} style={{ marginTop: '20px' }}>
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
        <Col w={[4, 6, 6]} style={{ marginTop: '20px' }}>
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

        <Col w={[4, 6, 6]} style={{ marginTop: '20px' }}>
          <DatePicker
            onChange={momentDate =>
              setState(_state => ({ ..._state, internshipEndDate: momentDate }))
            }
            value={state.internshipEndDate}
            label="End date"
            error={errors.internshipEndDate}
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 6, 6]} style={{ marginTop: '20px' }}>
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

        <Col w={[4, 6, 6]} style={{ marginTop: '20px' }}>
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
        <Col w={[4, 6, 6]} style={{ marginTop: '20px' }}>
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

        <Col w={[4, 6, 6]} style={{ marginTop: '20px' }}>
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

      <Row>
        <Col w={[4, 8, 8]}>
          <T.H5 color="blue" mt={8}>
            Internship Details
          </T.H5>
          <T.P color="gray3">
            This can be any professional you have worked with during your career
            or a teacher / lecturer / tutor
          </T.P>
        </Col>
      </Row>

      <Row>
        <Col w={[4, 6, 6]} style={{ marginTop: '20px' }}>
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

        <Col w={[4, 6, 6]} style={{ marginTop: '20px' }}>
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

      <Row>
        <Col w={[4, 6, 6]} style={{ marginTop: '20px' }}>
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

        <Col w={[4, 6, 6]} style={{ marginTop: '20px' }}>
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

      <Row>
        <Col w={[4, 8, 8]}>
          <T.H5 color="blue" mt={8}>
            Verification documents
          </T.H5>
          <T.PBold color="blue">Proof of identity </T.PBold>
          <T.PXS color="gray3">
            This can be any professional you have worked with during your career
            or a teacher / lecturer / tutor
          </T.PXS>
        </Col>
      </Row>

      <Row>
        <Col w={[4, 12, 12]}>
          <UploadFile
            mainText="Upload your profile picture here"
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
      </Row>

      <Row>
        <Col w={[4, 8, 8]}>
          <T.H5 color="blue" mt={8}>
            DBS Certificate{' '}
          </T.H5>

          <T.PXS color="gray3">
            This is the official UK criminal records check. If you don’t have
            one, please click here and we will do it for you for free. It will
            take no longer than 5 minutes to complete
          </T.PXS>
        </Col>
      </Row>

      <div w={[4, 6, 6]}>
        <UploadFile
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
      </div>
      <Row>
        <Col w={[4, 6, 6]} style={{ marginTop: '20px' }}>
          <Input
            onChange={onInputChange}
            value={state.refNum}
            label="DBS number"
            name="refNum"
            error={errors.refNum}
          />
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
        cb={() => setFetchData(e => e + 1)}
      />
    </div>
  );
};

export default Verifications;
