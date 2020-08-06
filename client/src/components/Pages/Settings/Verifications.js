import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, UploadFile, Select, DatePicker } from '../../Common/Inputs';
import { Col, Row } from '../../Common/Grid';

import * as T from '../../Common/Typography';
import Button from '../../Common/ButtonNew';
import {
  API_INTERN_SETTINGS_MY_PROFILE,
  API_MY_PROFILE_URL,
} from '../../../constants/apiRoutes';
import Notification from '../../Common/Notification';
import types from '../../../constants/types';

const { validate, internSettings } = require('../../../validation');

const getCleanData = (d = {}) => ({
  profileImage: d.profileImage || {
    fileName: '',
    url: '',
  },
  interests: d.interests || [],
  bio: d.bio || '',
  useReasonAnswer: d.useReasonAnswer || '',
  storyAnswer: d.storyAnswer || '',
  mentorDescribeAnswer: d.mentorDescribeAnswer || '',
  issueAnswer: d.issueAnswer || '',
});

const Verifications = props => {
  const [state, setState] = useState({
    profileImage: {
      fileName: '',
      url: '',
    },
    interests: [],
    bio: '',
    useReasonAnswer: '',
    storyAnswer: '',
    mentorDescribeAnswer: '',
    issueAnswer: '',
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [startUpload, setStartUpload] = useState(false);
  const [prevData, setPrevData] = useState({});

  // for images
  const [uploading, setUploading] = useState(false);
  const [uploadingDone, setUploadingDone] = useState(false);

  useEffect(() => {
    const upload = async () => {
      try {
        setUploading(true);
        const generatedName = `${props.id}/${Date.now()}.${
          state.profileImage.name
        }`;
        const {
          data: { signedUrl },
        } = await axios.get(`/api/upload/signed-url?fileName=${generatedName}`);
        const headers = {
          'Content-Type': 'application/octet-stream',
        };

        await axios.put(signedUrl, state.profileImage, {
          headers,
        });

        setState(_state => ({
          ..._state,
          profileImage: {
            fileName: generatedName,
            new: true,
            uploaded: true,
            preview: _state.profileImage.preview,
          },
        }));
        setUploadingDone(true);
      } catch (e) {
        setError(e.message);
      } finally {
        setUploading(false);
      }
    };

    if (
      startUpload &&
      state.profileImage.new &&
      !state.profileImage.uploaded &&
      !state.profileImage.deleted
    ) {
      upload();
    }
  }, [props.id, startUpload, state.profileImage]);

  const _validate = async () => {
    const { errors: _errors } = await validate({
      schema: internSettings.myProfile(prevData),
      data: { ...state },
    });

    if (prevData.profileImage && state.profileImage.deleted) {
      return _errors
        ? { ..._errors, profileImage: 'Profile image is required' }
        : { profileImage: 'Profile image is required' };
    }

    return _errors;
  };

  const onInputChange = e => {
    const { value, name } = e.target;

    setErrors(_errors => ({ ..._errors, [name]: '' }));
    return setState(_state => ({ ..._state, [name]: value }));
  };

  const update = async () => {
    try {
      setLoading(true);
      await axios.patch(API_INTERN_SETTINGS_MY_PROFILE, {
        ...state,
        prevImageFileNameToDelete:
          state.profileImage &&
          state.profileImage.new &&
          prevData.profileImage &&
          prevData.profileImage.fileName &&
          prevData.profileImage.fileName,
      });
      setNotificationOpen(true);
    } catch (e) {
      setError(e.response.data.error);
    } finally {
      setLoading(false);
      setUploadingDone(false);
    }
  };

  const onSubmit = async () => {
    const _errors = await _validate();

    setErrors(_errors || {});

    if (_errors) {
      setError('Must fill all required fields');
      return;
    }
    setError();
    if (
      state.profileImage &&
      state.profileImage.new &&
      !state.profileImage.uploaded
    ) {
      setStartUpload(true);
    } else {
      update();
    }
  };

  useEffect(() => {
    if (uploadingDone) {
      update();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadingDone]);

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
    <div>
      {/* <UploadFile
        profile
        mainText="Upload more photos by dragging new photos here"
        secondaryText="file size max 2mb"
        userId={props.id}
        files={[state.profileImage]}
        setFiles={([profileImage]) =>
          setState(_state => ({ ..._state, profileImage }))
        }
        error={
          prevData.profileImage &&
          state.profileImage.deleted &&
          'Profile image is required'
        }
      /> */}

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
                  number: e.target.value,
                },
              }));
            }}
            value={state.internshipContact && state.internshipContact.number}
            label="Contact number"
            placeholder="Contact number..."
            name="number"
            error={errors.internshipContact && errors.internshipContact.number}
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
              DBSCheck: {
                ...DBSCheck,
                refNum: _state.DBSCheck && _state.DBSCheck.refNum,
              },
            }))
          }
          error={errors.DBSCheck && errors.DBSCheck.file}
        />
      </div>
      <Row>
        <Col w={[4, 6, 6]} style={{ marginTop: '20px' }}>
          <Input
            onChange={e => {
              e.persist();
              setState(_state => ({
                ..._state,
                DBSCheck: {
                  ..._state.DBSCheck,
                  refNum: _state.DBSCheck && _state.DBSCheck.refNum,
                },
              }));
            }}
            value={state.DBSCheck && state.DBSCheck.refNum}
            label="DBS number"
            name="refNum"
            error={errors.DBSCheck && errors.DBSCheck.refNum}
          />
        </Col>
      </Row>
      <Row>
        <Col w={[4, 6, 4]} style={{ marginTop: '48px' }}>
          {error && <T.PXS color="pink">{error}</T.PXS>}

          <Button
            type="secondary"
            onClick={onSubmit}
            loading={loading || uploading}
          >
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

export default Verifications;
