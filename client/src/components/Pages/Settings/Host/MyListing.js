import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Input,
  UploadFile,
  DatePicker,
  Checkbox,
} from '../../../Common/Inputs';
import { Col, Row } from '../../../Common/Grid';

import * as T from '../../../Common/Typography';
import Button from '../../../Common/ButtonNew';
import LoadingBallPulseSync from '../../../Common/LoadingBallPulseSync';
import {
  API_INTERN_SETTINGS_MY_PROFILE,
  API_MY_PROFILE_URL,
} from '../../../../constants/apiRoutes';
import Notification from '../../../Common/Notification';
import { accommodationChecklist } from '../../../../constants/types';

const { validate, hostSettings } = require('../../../../validation');

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
  availableDates: d.availableDates || [
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
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  // const [startUpload, setStartUpload] = useState(false);
  const [prevData, setPrevData] = useState({});

  // for images
  // const [uploading, setUploading] = useState(false);
  // const [uploadingDone, setUploadingDone] = useState(false);

  const upload = async file => {
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
      setError(e.message);
    }
  };

  // useEffect(() => {

  //   if (
  //     startUpload &&
  //     state.profileImage.new &&
  //     !state.profileImage.uploaded &&
  //     !state.profileImage.deleted
  //   ) {
  //     upload();
  //   }
  // }, [props.id, startUpload, state.profileImage]);

  const _validate = async () => {
    const { errors: _errors } = await validate({
      schema: hostSettings.myListing(prevData),
      data: { ...state },
    });

    if (prevData.profileImage && state.profileImage.deleted) {
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
    const updatedDates = state.availableDates.filter(
      (dateObj, i) => index !== i,
    );
    setState(_state => ({ ..._state, availableDates: updatedDates }));
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

  const update = async (_profileImage, _photos) => {
    try {
      setLoading(true);
      await axios.patch(API_INTERN_SETTINGS_MY_PROFILE, {
        ...state,
        profileImage: _profileImage || state.profileImage,
        photos: _photos || state.photos,
        prevImageFileNameToDelete:
          state.profileImage &&
          state.profileImage.new &&
          prevData.profileImage &&
          prevData.profileImage.fileName,
        photosToDelete: _photos
          .filter(e => e.deleted && !e.new)
          .map(e => e.fileName),
      });
      setNotificationOpen(true);
    } catch (e) {
      setError(e.response.data.error);
    } finally {
      setLoading(false);
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
        const filteredFiles = state.photos.filter(
          e => e.new && !e.uploaded && !e.deleted,
        );
        filteredFiles.forEach(file => {
          promiseArr.push(
            upload(file),
            // .catch(err =>
            //   setErrors(e => ({ ...e, profileImage: err.message })),
            // ),
          );
        });
      } else {
        promiseArr.push(Promise.resolve());
      }

      [_profileImage, _photos] = await Promise.all(promiseArr);
      update(_profileImage, _photos);
    } else {
      update();
    }
  };

  // useEffect(() => {
  //   if (uploadingDone) {
  //     update();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [uploadingDone]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const {
        data: { profile, listing },
      } = await axios.get(API_MY_PROFILE_URL);

      const totalData = { ...profile, ...listing };
      console.log('total', totalData);
      setState(getCleanData(totalData));
      setPrevData(getCleanData(totalData));
      setLoading(false);
    };
    getData();
  }, []);

  if (loading)
    return (
      <div style={{ marginTop: '2rem' }}>
        <LoadingBallPulseSync />
      </div>
    );

  return (
    <div style={{ marginTop: '2rem' }}>
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
          state.profileImage.deleted &&
          'Profile image is required'
        }
      />
      {/* home images */}
      <Row>
        <Col w={[4, 12, 12]}>
          <div style={{ marginBottom: '30px' }}>
            <T.PBold color="blue">Photo of your home</T.PBold>
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
              setImageInfo={data => {
                console.log('image been uploaded to S3', data);
              }}
              mainText="Upload more photos by dragging new photos here"
              secondaryText="file size max 2mb"
              maxLimit={9}
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
        <Col w={[4, 6, 4]}>
          <Input
            onChange={onInputChange}
            name="addressLine1"
            label="Address Line 1"
            placeholder="Address line 1..."
            value={state.address.addressline1}
            error={errors.address}
          />
        </Col>
        <Col w={[4, 6, 4]}>
          <Input
            onChange={onInputChange}
            name="addressLine2"
            label="Address Line 2"
            placeholder="Address Line 2..."
            value={state.address.addressline2}
            error={errors.address}
          />
        </Col>
      </Row>
      <Row mb={5}>
        <Col w={[4, 6, 4]} mb={5}>
          <Input
            onChange={onInputChange}
            name="city"
            label="City"
            placeholder="City..."
            value={state.address.city}
            error={errors.address}
          />
        </Col>
        <Col w={[4, 6, 4]} mb={5}>
          <Input
            onChange={onInputChange}
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
        <Col w={[4, 12, 8]}>
          <T.H5 color="blue" mb={3}>
            Availability
          </T.H5>
          {errors.availableDates && (
            <T.PBold mb={3} color="pink">
              {errors.availableDates}
            </T.PBold>
          )}
          {state.availableDates.length > 0 &&
            state.availableDates.map((date, index) => (
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
            error={errors.accommodationChecklist}
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 6, 4]} style={{ marginTop: '20px' }}>
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

      <Row>
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

export default MyListing;
