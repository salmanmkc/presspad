import React, { Component } from 'react';
import { message, Modal, Spin, Alert } from 'antd';
import * as Yup from 'yup';
import axios from 'axios';

import {
  API_HOST_COMPLETE_PROFILE,
  API_MY_PROFILE_URL,
} from '../../../constants/apiRoutes';

import { DASHBOARD_URL } from '../../../constants/navRoutes';

import {
  disabledEndDate,
  disabledStartDate,
  checkSelectedRange,
  getValidDAtes,
} from './helpers';

import Content from './Content';

const rUrl = /^(?:http(s)?:\/\/)?[\w.-]+(?:.[w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/i;

const schema = Yup.object().shape({
  profileImage: Yup.object().shape({
    fileName: Yup.string().required('Required'),
    isPrivate: Yup.boolean().default(false),
  }),
  bio: Yup.string().required('Required'),
  interests: Yup.string(),
  organisationName: Yup.string().required('Required'),
  organisationWebsite: Yup.string()
    .matches(rUrl, 'Not a valid link')
    .required('Required'),
  jobTitle: Yup.string(),
  addressLine1: Yup.string().required('Required'),
  addressLine2: Yup.string(),
  addressCity: Yup.string().required('Required'),
  addressPostCode: Yup.string().required('Required'),

  offerImages1: Yup.object().shape({
    fileName: Yup.string().required('Required'),
    isPrivate: Yup.boolean().default(false),
  }),
  offerImages2: Yup.object().shape({
    fileName: Yup.string().required('Required'),
    isPrivate: Yup.boolean().default(false),
  }),
  offerImages3: Yup.object().shape({
    fileName: Yup.string().required('Required'),
    isPrivate: Yup.boolean().default(false),
  }),

  offerDescription: Yup.string().required('Required'),
  offerOtherInfo: Yup.array(),
  availableDates: Yup.mixed().test(
    'avialable-dates',
    'Must select avialable dates',
    function(availableDates) {
      const { startDate, endDate } = availableDates[0];
      if (!startDate || !endDate) {
        return false;
      }
      return true;
    },
  ),
});

class HostCreateProfile extends Component {
  state = {
    attemptedToSubmit: false,
    loading: true,
    profileImage: {
      fileName: '',
      dataUrl: '',
      loading: 0,
      isLoading: false,
    },
    bio: '',
    interests: '',
    organisationName: '',
    organisationWebsite: '',

    jobTitle: '',
    addressLine1: '',
    addressLine2: '',
    addressCity: '',
    addressPostCode: '',
    offerDescription: '',
    offerOtherInfo: [],

    availableDates: [
      {
        startDate: null,
        endDate: null,
        endOpen: false,
      },
    ],

    offerImages1: {
      loading: 0,
      isLoading: false,
      dataUrl: '',
      fileName: '',
    },
    offerImages2: {
      loading: 0,
      isLoading: false,
      dataUrl: '',
      fileName: '',
    },
    offerImages3: {
      loading: 0,
      isLoading: false,
      dataUrl: '',
      fileName: '',
    },
    errors: {},
  };

  componentDidMount() {
    axios
      .get(API_MY_PROFILE_URL)
      .then(({ data: { profile, listing } }) => {
        if (profile) {
          // this need to be refactor and add check for profile and listing then
          // add the data to new object after that assign it to the state
          // also better solution to change the state to match the db
          this.setState({
            ...this.state,
            ...profile,
            profileImage: {
              ...this.state.profileImage,
              ...profile.profileImage,
              dataUrl: (profile.profileImage && profile.profileImage.url) || '',
            },
            organisationName:
              (profile.organisation && profile.organisation.name) || '',
            organisationWebsite:
              (profile.organisation && profile.organisation.website) || '',
            addressPostCode:
              (listing && listing.address && listing.address.postcode) || '',
            addressCity:
              (listing && listing.address && listing.address.city) || '',
            addressLine1:
              (listing && listing.address && listing.address.street) || '',
            addressLine2:
              (listing && listing.address && listing.address.borough) || '',
            offerImages1: {
              ...this.state.offerImages1,
              fileName:
                (listing &&
                  listing.photos &&
                  listing.photos[0] &&
                  listing.photos[0].fileName) ||
                '',
              dataUrl:
                (listing &&
                  listing.photos &&
                  listing.photos[0] &&
                  listing.photos[0].url) ||
                '',
            },
            offerImages2: {
              ...this.state.offerImages2,
              fileName:
                (listing &&
                  listing.photos &&
                  listing.photos[1] &&
                  listing.photos[1].fileName) ||
                '',
              dataUrl:
                (listing &&
                  listing.photos &&
                  listing.photos[1] &&
                  listing.photos[1].url) ||
                '',
            },
            offerImages3: {
              ...this.state.offerImages3,
              fileName:
                (listing &&
                  listing.photos &&
                  listing.photos[2] &&
                  listing.photos[2].fileName) ||
                '',
              dataUrl:
                (listing &&
                  listing.photos &&
                  listing.photos[2] &&
                  listing.photos[2].url) ||
                '',
            },
            offerOtherInfo: (listing && listing.otherInfo) || [],
            offerDescription: (listing && listing.description) || '',
            availableDates: (listing && listing.availableDates) || [],
          });
        }
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || 'Something went wrong');
      });
  }

  handleOtherInfo = offerOtherInfo => {
    this.setState({ offerOtherInfo });
  };

  directUploadToGoogle = async e => {
    const {
      files: [image],
      name,
      dataset: { isPrivate },
    } = e.target;

    const { id: userId } = this.props;
    const { errors } = this.state;

    if (!image) {
      if (!this.state[name].name) {
        return this.setState({
          errors: { ...errors, [name]: 'please upload a file' },
        });
      }
      return;
    }

    if (image.size > 4e6) {
      return this.setState({
        errors: { ...errors, [name]: 'File too large, "max size 4MB"' },
      });
    }

    // get signed url from google
    try {
      this.setState({
        [name]: { ...this.state[name], loading: 0, isLoading: true },
      });

      const generatedName = `${userId}/${Date.now()}.${image.name}`;

      const {
        data: { signedUrl, bucketName },
      } = await axios.get(`/api/upload/signed-url?fileName=${generatedName}`);

      const headers = {
        'Content-Type': 'application/octet-stream',
      };

      let dataUrl = '';

      if (isPrivate === 'false') {
        headers['x-goog-acl'] = 'public-read';
        dataUrl = `https://storage.googleapis.com/${bucketName}/${generatedName}`;
      }
      await axios.put(signedUrl, image, {
        headers,
        onUploadProgress: progressEvent => {
          const precent = (progressEvent.loaded / progressEvent.total) * 100;
          this.setState({
            [name]: {
              loading: precent.toFixed(2),
              isLoading: true,
            },
            errors: { ...errors, [name]: '' },
          });
        },
      });

      this.setState({
        [name]: {
          dataUrl,
          fileName: generatedName,
          loading: 100,
          isLoading: false,
        },
        errors: { ...errors, [name]: '' },
      });
    } catch (error) {
      message.error('something went wrong, try again later', 5);
      this.setState({
        [name]: { ...this.state[name], loading: 0, isLoading: false },
      });
    }
  };

  deleteImageFromGoogle = async (fileNameTobeDeleted, indexToDelete) => {
    if (!fileNameTobeDeleted) return;
    try {
      await axios.patch(API_HOST_COMPLETE_PROFILE, {
        fileNameTobeDeleted,
      });

      this.setState({
        ...this.state,
        [`offerImages${indexToDelete}`]: {
          ...this.state[`offerImages${indexToDelete}`],
          fileName: '',
          dataUrl: '',
        },
      });
    } catch (err) {
      const error =
        err.response && err.response.data && err.response.data.error;
      message.error(error || 'Something went wrong');
    }
  };

  handleInputChange = ({ target }) => {
    const { value, name } = target;
    this.setState(
      { [name]: value },
      () => this.state.attemptedToSubmit && this.updateErrors(),
    );
  };

  validate = () =>
    schema
      .validate(this.state, { abortEarly: false })
      .then(res => {
        this.setState({ errors: {} });
        return res;
      })
      .catch(err => {
        const errors = {};
        err.inner.forEach(element => {
          errors[element.path.split('.')[0]] = element.message;
        });

        this.setState({ errors });
      });

  updateErrors = async () => {
    await this.validate();
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ attemptedToSubmit: true });
    this.validate().then(res => {
      if (res) {
        this.setState({ errors: {}, uploading: true });
        Modal.destroyAll();
        Modal.info({
          title: 'Uploading',
          content: (
            <Spin spinning={this.state.loading}>
              <Alert
                message="updating your info"
                description="this might take sometime"
                type="info"
              />
            </Spin>
          ),
          okButtonProps: {
            disabled: true,
          },
        });

        const {
          profileImage,
          bio,
          interests,
          organisationName,
          organisationWebsite,
          jobTitle,
          addressLine1,
          addressLine2,
          addressCity,
          addressPostCode,
          offerImages1,
          offerImages2,
          offerImages3,
          offerOtherInfo,
          offerDescription,
          availableDates,
        } = this.state;

        const formData = {
          profileImage: { fileName: profileImage.fileName, isPrivate: false },
          bio,
          organisationName,
          organisationWebsite,
          addressLine1,
          addressCity,
          addressPostCode,
          photos: [
            { fileName: offerImages1.fileName, isPrivate: false },
            { fileName: offerImages2.fileName, isPrivate: false },
            { fileName: offerImages3.fileName, isPrivate: false },
          ],
          offerOtherInfo,
          offerDescription, // your neighberhood
          availableDates: getValidDAtes(availableDates),
        };

        // add optional fields if existed
        formData.interests = interests || ' ';
        formData.jobTitle = jobTitle || ' ';
        formData.addressLine2 = addressLine2 || ' ';

        axios({
          method: 'post',
          url: API_HOST_COMPLETE_PROFILE,
          data: formData,
          headers: {
            'content-type': 'application/json',
          },
        })
          .then(({ data }) => {
            Modal.destroyAll();
            Modal.success({
              title: 'Done',
              content: (
                <Alert
                  message="Thank you"
                  description="Your info has been updated"
                  type="success"
                />
              ),

              onOk: () => {
                this.props.history.push(DASHBOARD_URL);
              },
              type: 'success',
            });
            this.setState({ loading: false, success: true });
          })
          .catch(err => {
            Modal.destroyAll();
            Modal.error({
              title: 'Error',
              content: (
                <Alert
                  message="Error"
                  description={err.response.data.error}
                  type="error"
                />
              ),
              type: 'error',
            });
            this.setState({ loading: false, erros: err.response.data });
          });
      }
    });
  };

  disabledStartDate = (index, startDate) => {
    const { availableDates } = this.state;
    return disabledStartDate(index, startDate, availableDates);
  };

  disabledEndDate = (index, endDate) => {
    const { availableDates } = this.state;
    return disabledEndDate(index, endDate, availableDates);
  };

  changeSelectedDate = (index, field, value) => {
    const { availableDates } = this.state;

    const newAvailableDates = [...availableDates];
    const obj = {
      [field]: value,
    };
    const { startDate } = newAvailableDates[index];

    let isDatePicked;
    if (field === 'startDate') {
      obj.endOpen = true;
    } else if (field === 'endDate') {
      obj.endOpen = false;

      isDatePicked = checkSelectedRange(startDate, value, newAvailableDates);
    }

    if (isDatePicked) {
      return message.warning('Cannot select intersected ranges');
    }

    newAvailableDates[index] = { ...newAvailableDates[index], ...obj };

    this.setState(
      { availableDates: newAvailableDates },
      () => this.state.attemptedToSubmit && this.updateErrors(),
    );
  };

  onStartChange = (index, value) => {
    this.changeSelectedDate(index, 'startDate', value);
  };

  onEndChange = (index, value) => {
    this.changeSelectedDate(index, 'endDate', value);
  };

  // add new available dates range
  handleAddMoreRanges = () => {
    const { availableDates } = this.state;

    const emptyRanges = availableDates.reduce((prev, curr) => {
      const { endDate, startDate } = curr;
      if (!endDate || !startDate) {
        return true;
      }
      return prev || false;
    }, false);

    if (emptyRanges && availableDates.length > 0) {
      return message.warning('fill the previous ranges');
    }

    const newAvailableDates = [...availableDates];
    newAvailableDates.push({
      startDate: null,
      endDate: null,
      endOpen: false,
    });
    this.setState({ availableDates: newAvailableDates });
  };

  // remove dates
  deleteDate = dateIndex => {
    const availableDates = this.state.availableDates.filter(
      (date, index) => index !== dateIndex,
    );
    this.setState({ availableDates });
  };

  render() {
    const { name, id } = this.props;
    return (
      <Content
        name={name}
        id={id}
        handleOtherInfo={this.handleOtherInfo}
        directUploadToGoogle={this.directUploadToGoogle}
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
        disabledStartDate={this.disabledStartDate}
        disabledEndDate={this.disabledEndDate}
        onEndChange={this.onEndChange}
        onStartChange={this.onStartChange}
        handleAddMoreRanges={this.handleAddMoreRanges}
        deleteImageFromGoogle={this.deleteImageFromGoogle}
        deleteDate={this.deleteDate}
        state={this.state}
      />
    );
  }
}

export default HostCreateProfile;
