import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Input, UploadFile, DatePicker, Checkbox } from '../../Common/Inputs';
import { Col, Row } from '../../Common/Grid';

import Title from '../../Common/Title';

import * as T from '../../Common/Typography';
import Button from '../../Common/ButtonNew';

import {
  API_HOST_SETTINGS_MY_LISTING,
  API_MY_PROFILE_URL,
} from '../../../constants/apiRoutes';
import {
  HOST_SIGNUP_VERIFICATIONS,
  SETTINGS,
} from '../../../constants/navRoutes';

import Notification from '../../Common/Notification';
import { accommodationChecklist } from '../../../constants/types';

const { validate, hostSettings } = require('../../../validation');

const getCleanData = (d = {}) => ({
  profileImage: d.profileImage || {
    fileName: '',
    url: '',
  },
  photos: d.photos || [],
  address: d.address || {
    addressline1: '',
    addressline2: '',
    city: '',
    postcode: '',
  },
  availableDates:
    d.availableDates && d.availableDates.length
      ? d.availableDates
      : [
          {
            startDate: '',
            endDate: '',
          },
        ],
  accommodationChecklist: d.accommodationChecklist || [],
  bio: d.bio || '',
  otherInfo: d.otherInfo || '',
  hostingReasonAnswer: d.hostingReasonAnswer || '',
  mentoringExperienceAnswer: d.mentoringExperienceAnswer || '',
  industryExperienceAnswer: d.industryExperienceAnswer || '',
  backgroundAnswer: d.backgroundAnswer || '',
});

const MyListing = props => {
  const [state, setState] = useState(getCleanData());
  const [errors, setErrors] = useState({});
  const [mainError, setMainError] = useState();
  const [saveLoading, setSaveLoading] = useState(false);
  const [continueLoading, setContinueLoading] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [prevData, setPrevData] = useState({});
  const [fetchData, setFetchData] = useState(0);
  const [lastClickOnContinue, setLastClickOnContinue] = useState({});
  const [fetchingData, setFetchingData] = useState(true);

  const history = useHistory();

  useEffect(() => {
    window.scrollTo({
      left: 0,
      top: 0,
    });
  }, []);

  const upload = useCallback(
    async file => {
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
    },
    [props.id],
  );

  const _validate = async () => {
    const { errors: _errors } = await validate({
      schema: hostSettings.myListing(prevData),
      data: { ...state },
    });

    if (prevData.profileImage && !state.profileImage) {
      return _errors
        ? { ..._errors, profileImage: 'Profile image is required' }
        : { profileImage: 'Profile image is required' };
    }

    return _errors;
  };

  const onRangeChange = (date, type, index) => {
    const updatedDates = state.availableDates.map((dateObj, i) => {
      if (i === index) {
        return { ...dateObj, [type]: date };
      }
      return dateObj;
    });

    setState(_state => ({ ..._state, availableDates: updatedDates }));
  };

  const handleDateDelete = index => {
    if (state.availableDates && state.availableDates.length) {
      return setState(_state => ({
        ..._state,
        availableDates: [{ startDate: null, endDate: null }],
      }));
    }

    const updatedDates = state.availableDates.filter(
      (dateObj, i) => index !== i,
    );
    return setState(_state => ({ ..._state, availableDates: updatedDates }));
  };

  const handleDateAdd = () => {
    const { availableDates } = state;
    const updatedDates = [...availableDates, { startDate: '', endDate: '' }];
    setState(_state => ({ ..._state, availableDates: updatedDates }));
  };

  const onInputChange = e => {
    const { value, name } = e.target;

    setErrors(_errors => ({ ..._errors, [name]: '' }));
    return setState(_state => ({ ..._state, [name]: value }));
  };

  const onAddressChange = e => {
    const { value, name } = e.target;
    const isPostcode = name === 'postcode';
    const cleanedPostcode = isPostcode ? value.trim().toUpperCase() : name;
    e.persist();
    setState(_state => ({
      ..._state,
      address: {
        ...state.address,
        [name]: isPostcode ? cleanedPostcode : value,
      },
    }));
  };

  const getPhotosToDelete = () => {
    const profilePhoto =
      state?.profileImage?.new && prevData?.profileImage?.fileName;

    const oldFileNames = prevData.photos.map(e => e?.fileName).filter(e => !!e);
    const currentFileNames = state.photos
      .map(e => e?.fileName)
      .filter(e => !!e);

    const photosToDelete = oldFileNames.filter(
      e => !currentFileNames.includes(e),
    );

    if (profilePhoto) {
      photosToDelete.push(profilePhoto);
    }

    return photosToDelete;
  };

  const update = async (_profileImage, _photos = []) => {
    try {
      const oldPhotos =
        state.photos && state.photos.filter(e => e.fileName && !e.new);

      await axios.patch(API_HOST_SETTINGS_MY_LISTING, {
        ...state,
        profileImage: _profileImage || state.profileImage,
        photos: [..._photos, ...oldPhotos],
        photosToDelete: getPhotosToDelete(),
      });
      setFetchingData(true);
      setNotificationOpen(true);
    } catch (err) {
      if (err.response) {
        setMainError(err.response.data.error);
      } else {
        setMainError('Something went wrong');
      }
    } finally {
      setContinueLoading(false);
      setSaveLoading(false);
    }
  };
  const onSubmit = async isContinue => {
    const _errors = await _validate(isContinue);
    setErrors(_errors || {});
    setLastClickOnContinue(isContinue);
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

    let _profileImage;
    let _photos;
    if (
      (state.profileImage &&
        state.profileImage.new &&
        !state.profileImage.uploaded) ||
      (state.photos && state.photos.find(e => e.new && !e.uploaded))
    ) {
      const promiseArr = [];
      if (state.profileImage && state.profileImage.new) {
        promiseArr.push(
          upload(state.profileImage).catch(err =>
            setErrors(e => ({ ...e, profileImage: err.message })),
          ),
        );
      } else {
        promiseArr.push(Promise.resolve());
      }

      if (state.photos && state.photos.find(e => e.new && !e.uploaded)) {
        const filteredFiles = state.photos.filter(e => e.new && !e.uploaded);
        filteredFiles.forEach(file => {
          promiseArr.push(upload(file));
        });
      }

      [_profileImage, ..._photos] = await Promise.all(promiseArr);

      update(_profileImage, _photos);
    } else {
      update();
    }
  };

  useEffect(() => {
    const getData = async () => {
      const {
        data: { profile, listing },
      } = await axios.get(API_MY_PROFILE_URL);
      setFetchingData(false);

      const totalData = { ...profile, ...listing };
      setState(getCleanData(totalData));
      setPrevData(getCleanData(totalData));
    };
    getData();
  }, [fetchData]);

  const done = () => {
    if (lastClickOnContinue) {
      if (
        prevData.address &&
        prevData.address.postcode &&
        state.address.postcode &&
        prevData.address.postcode !== state.address.postcode
      ) {
        history.push(SETTINGS.BOOK_REVIEW);
      } else {
        history.push(HOST_SIGNUP_VERIFICATIONS);
      }
    } else {
      setFetchData(e => e + 1);
    }
  };

  return (
    <div style={{ marginTop: '4rem', paddingBottom: '5rem' }}>
      <Row>
        <Title withBg mb="0">
          <Col w={[4, 12, 12]}>CREATE LISTING</Col>
        </Title>
      </Row>

      <Row>
        <Col w={[4, 12, 12]}>
          <div style={{ marginBottom: '20px' }}>
            <T.PBold color="blue">Photo of you</T.PBold>
          </div>
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
        error={
          prevData.profileImage &&
          !state.profileImage &&
          'Profile image is required'
        }
      />
      {/* home images */}
      <Row mt={5} mtT={6}>
        <Col w={[4, 12, 12]}>
          <div style={{ marginBottom: '30px' }}>
            <T.PBold color="blue">Photos of your home</T.PBold>
            <T.PXS color="blue" mb={2}>
              {' '}
              Min. 3 photos (up to 9 photos)
            </T.PXS>
            <UploadFile
              files={state.photos}
              setFiles={photos => {
                setState(_state => ({ ..._state, photos }));
              }}
              multiple
              mainText="Upload more photos by dragging new photos here"
              secondaryText="file size max 2mb"
              maxLimit={9}
              col={6}
              error={errors.photos}
            />
          </div>
        </Col>
      </Row>
      {/* address */}
      <Row mb={3}>
        <Col w={[4, 12, 12]}>
          <T.H5 color="blue">Address</T.H5>
        </Col>
      </Row>
      <Row mb={4}>
        <Col w={[4, 6, 5.3]}>
          <Input
            onChange={onAddressChange}
            name="addressline1"
            label="Address Line 1"
            placeholder="Address line 1..."
            value={state.address.addressline1}
            error={errors.address}
          />
        </Col>
        <Col w={[4, 6, 5.3]}>
          <Input
            onChange={onAddressChange}
            name="addressline2"
            label="Address Line 2"
            placeholder="Address Line 2..."
            value={state.address.addressline2}
            error={errors.address}
          />
        </Col>
      </Row>
      <Row mb={5}>
        <Col w={[4, 6, 5.3]} mb={5}>
          <Input
            onChange={onAddressChange}
            name="city"
            label="City"
            placeholder="City..."
            value={state.address.city}
            error={errors.address}
          />
        </Col>
        <Col w={[4, 6, 5.3]} mb={5}>
          <Input
            onChange={onAddressChange}
            name="postcode"
            label="Postcode"
            placeholder="Postcode..."
            value={state.address.postcode}
            error={errors.address}
          />
        </Col>
      </Row>

      {/* Dates */}
      <Row mb={5} mt={5}>
        <Col w={[4, 12, 12]}>
          <T.H5 color="blue" mb={3}>
            Availability
          </T.H5>
          {errors.availableDates && typeof errors.availableDates === 'string' && (
            <T.PBold mb={3} color="pink">
              {errors.availableDates}
            </T.PBold>
          )}
          {state.availableDates.map((date, index) => (
            <DatePicker
              onChange={onRangeChange}
              type="dateRange"
              multi
              index={index}
              handleDelete={handleDateDelete}
              handleAdd={handleDateAdd}
              arrayLength={state.availableDates.length}
              mb={3}
              value={date}
              disabledDate={d => !d || d.isBefore(new Date())}
              error={errors[`availableDates[${index}]`]}
            />
          ))}
        </Col>
      </Row>
      {/* about your home  */}
      <Row mb={5}>
        <Col w={[4, 12, 8]} mb={3}>
          <T.H5 color="blue">About your home</T.H5>
        </Col>
        <Col w={[4, 12, 7]}>
          <Checkbox
            isMulti
            items={accommodationChecklist}
            checkedValues={state.accommodationChecklist}
            onChange={checkedValues =>
              setState(_state => ({
                ..._state,
                accommodationChecklist: checkedValues,
              }))
            }
            value={state.accommodationChecklist}
            error={errors.accommodationChecklist}
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 6, 5.3]} style={{ marginTop: '20px' }}>
          <T.H5 color="blue" mb={3}>
            About you
          </T.H5>
        </Col>
      </Row>

      <Row>
        <Col w={[4, 10, 8]} style={{ marginTop: '10px' }}>
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
        <Col w={[4, 10, 8]} style={{ marginTop: '20px' }}>
          <Input
            onChange={onInputChange}
            value={state.otherInfo}
            label="Other info"
            helperText="Include any information not yet covered above- do you have pets or plants that need watering? Are you vegetarian? Do you observe certain religious festivals? House rules are important for potential guests to know in advance to avoid any misunderstandings or conflict e.g. no eating upstairs, no shoes on inside the house, guests (i.e. boyfriend/girlfriend) are welcome/not welcome on occasion etc. "
            name="otherInfo"
            textArea
            error={errors.otherInfo}
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 10, 8]} style={{ marginTop: '20px' }}>
          <Input
            onChange={onInputChange}
            value={state.hostingReasonAnswer}
            label="Why do you want to be a PressPad host?"
            name="hostingReasonAnswer"
            textArea
            error={errors.hostingReasonAnswer}
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 10, 8]} style={{ marginTop: '20px' }}>
          <Input
            onChange={onInputChange}
            value={state.mentoringExperienceAnswer}
            label="What experience do you have of mentoring?"
            name="mentoringExperienceAnswer"
            textArea
            error={errors.mentoringExperienceAnswer}
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 10, 8]} style={{ marginTop: '20px' }}>
          <Input
            onChange={onInputChange}
            value={state.industryExperienceAnswer}
            label="How was your own experience getting into the industry?"
            name="industryExperienceAnswer"
            textArea
            error={errors.industryExperienceAnswer}
          />
        </Col>
      </Row>

      <Row mb={6} mbT={4}>
        <Col w={[4, 10, 8]} style={{ marginTop: '20px' }}>
          <Input
            onChange={onInputChange}
            value={state.backgroundAnswer}
            label="Is there anything about you that would be helpful for an intern to know or any preferences you might have regarding those you'd most like to host?"
            name="backgroundAnswer"
            helperText="e.g. class, gender, hometown, LGBTQ+, ethnicity, religion. (Unlike the extra demographic questions, these will be visible to members searching for a place to stay)."
            textArea
            error={errors.backgroundAnswer}
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
            disabled={saveLoading || continueLoading || fetchingData}
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
            disabled={saveLoading || continueLoading || fetchingData}
          >
            CONTINUE
          </Button>
        </Col>
      </Row>
      <Row style={{ textAlign: 'center' }}>
        <Col w={[4, 12, 10.6]} style={{ marginTop: '30px' }}>
          <T.Link to={HOST_SIGNUP_VERIFICATIONS} color="pink">
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

export default MyListing;
