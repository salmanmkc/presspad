import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Title from '../../Common/Title';

import { Input, UploadFile, Select } from '../../Common/Inputs';
import { Col, Row } from '../../Common/Grid';
import { INTERN_SIGNUP_VERIFICATIONS } from '../../../constants/navRoutes';

import * as T from '../../Common/Typography';
import Button from '../../Common/ButtonNew';
import {
  API_INTERN_SETTINGS_MY_PROFILE,
  API_MY_PROFILE_URL,
} from '../../../constants/apiRoutes';
import Notification from '../../Common/Notification';
import types from '../../../constants/types';

const { validate, internSignup } = require('../../../validation');

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

const MyProfile = props => {
  const history = useHistory();

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
  const [mainError, setMainError] = useState();
  const [saveLoading, setSaveLoading] = useState(false);
  const [continueLoading, setContinueLoading] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [startUpload, setStartUpload] = useState(false);
  const [prevData, setPrevData] = useState({});
  const [lastClickOnContinue, setLastClickOnContinue] = useState();
  const [fetchData, setFetchData] = useState(0);
  const [fetchingData, setFetchingData] = useState(true);

  // for images
  const [uploading, setUploading] = useState(false);
  const [uploadingDone, setUploadingDone] = useState(false);

  useEffect(() => {
    window.scrollTo({
      left: 0,
      top: 0,
    });
  }, []);

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
        setMainError(e.message);
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

  const _validate = async isContinue => {
    const { errors: _errors } = await validate({
      schema: internSignup.myProfile(prevData, isContinue),
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

  const update = async isContinue => {
    try {
      if (isContinue) {
        setContinueLoading(true);
      } else {
        setSaveLoading(true);
      }

      await axios.patch(API_INTERN_SETTINGS_MY_PROFILE, {
        ...state,
        prevImageFileNameToDelete:
          state.profileImage &&
          state.profileImage.new &&
          prevData.profileImage &&
          prevData.profileImage.fileName &&
          prevData.profileImage.fileName,
      });
      setFetchingData(true);
      setNotificationOpen(true);
    } catch (e) {
      setMainError(e.response.data.error);
    } finally {
      setContinueLoading(false);
      setSaveLoading(false);
      setUploadingDone(false);
    }
  };

  const onSubmit = async isContinue => {
    setErrors({});
    setMainError();
    setLastClickOnContinue(isContinue);
    const _errors = await _validate(isContinue);

    setErrors(_errors || {});

    if (_errors) {
      setMainError('Must fill all required fields');
      return;
    }
    setMainError();
    setErrors({});
    if (
      state.profileImage &&
      state.profileImage.new &&
      !state.profileImage.uploaded
    ) {
      setStartUpload(true);
    } else {
      update(isContinue);
    }
  };

  useEffect(() => {
    if (uploadingDone) {
      update(lastClickOnContinue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadingDone]);

  useEffect(() => {
    const getData = async () => {
      const {
        data: { profile },
      } = await axios.get(API_MY_PROFILE_URL);
      setFetchingData(false);
      setState(getCleanData(profile));
      setPrevData(getCleanData(profile));
    };
    getData();
  }, [fetchData]);

  const done = () => {
    if (lastClickOnContinue) {
      history.push(INTERN_SIGNUP_VERIFICATIONS);
    } else {
      setFetchData(e => e + 1);
    }
  };

  return (
    <div style={{ marginTop: '4rem', paddingBottom: '5rem' }}>
      <Row>
        <Title withBg mb="0">
          <Col w={[4, 12, 12]}>CREATE PROFILE</Col>
        </Title>
      </Row>

      <Row>
        <Col w={[4, 6, 8]} mb={4}>
          <T.H5 color="blue">
            OK, let’s create your profile so hosts know a bit about you when you
            request to stay
          </T.H5>
        </Col>
      </Row>

      <Row>
        <Col w={[4, 6, 8]}>
          <T.PBold color="blue">Photo of you</T.PBold>
        </Col>
      </Row>

      <UploadFile
        profile
        mainText="Upload photo by dragging here"
        secondaryText="file size max 2mb"
        userId={props.id}
        files={[state.profileImage]}
        setFiles={([profileImage]) =>
          setState(_state => ({ ..._state, profileImage }))
        }
        error={prevData.profileImage && 'Profile image is required'}
      />

      <Row>
        <Col w={[4, 6, 6]} mt={4}>
          <Select
            options={types.interests.map(e => ({ label: e, value: e }))}
            label="What are your areas of interest?"
            allowClear
            onChange={value =>
              setState(_state => ({ ..._state, interests: value }))
            }
            multi
            height="auto"
            value={state.interests}
            error={errors.interests}
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 10, 10.3]} mt={4}>
          <Input
            onChange={onInputChange}
            value={state.bio}
            label="About yourself"
            name="bio"
            helperText="Write a short bio about yourself so hosts can know a bit about you"
            textArea
            error={errors.bio}
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 10, 10.3]} mt={4}>
          <Input
            onChange={onInputChange}
            value={state.useReasonAnswer}
            label="Why do you want to use PressPad?"
            name="useReasonAnswer"
            textArea
            error={errors.useReasonAnswer}
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 10, 10.3]} mt={4}>
          <Input
            onChange={onInputChange}
            value={state.storyAnswer}
            label="Tell us a story about yourself that shows you have the determination and dedication to enter the media profession"
            name="storyAnswer"
            textArea
            error={errors.storyAnswer}
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 10, 10.3]} mt={4}>
          <Input
            onChange={onInputChange}
            value={state.mentorDescribeAnswer}
            label="Describe what you are looking for in a mentor as well as your long-term career ambitions"
            name="mentorDescribeAnswer"
            textArea
            error={errors.mentorDescribeAnswer}
          />
        </Col>
      </Row>

      <Row mb={6}>
        <Col w={[4, 10, 10.3]} mt={4}>
          <Input
            onChange={onInputChange}
            value={state.issueAnswer}
            label="Tell us about an issue you would like to cover from your hometown that you think would be of service to your community"
            name="issueAnswer"
            helperText="How would you do it? Why is the story important to cover? If you’re not sure, you can also tell us about a recent story you wrote or a project you have worked on that you’re proud of."
            textArea
            error={errors.issueAnswer}
          />
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
            disabled={
              saveLoading || continueLoading || uploading || fetchingData
            }
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
            disabled={
              saveLoading || continueLoading || uploading || fetchingData
            }
          >
            CONTINUE
          </Button>
        </Col>
      </Row>
      <Row style={{ textAlign: 'center' }}>
        <Col w={[4, 12, 10.6]} style={{ marginTop: '30px' }}>
          <T.Link to={INTERN_SIGNUP_VERIFICATIONS} color="pink">
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

export default MyProfile;
