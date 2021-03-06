import React, { Component } from 'react';

import axios from 'axios';
import { Modal, Alert, message } from 'antd';
import Content from './Content';
import {
  API_INTERN_COMPLETE_PROFILE,
  API_MY_PROFILE_URL,
} from '../../../constants/apiRoutes';
import { WELCOME_PAGES } from '../../../constants/navRoutes';
import { profileSchema, detailsSchema } from './Schema';

const INITIAL_STATE = {
  birthDate: '',
  hometown: '',
  gender: '',
  school: '',
  profileImage: {
    fileName: '',
    isPrivate: false,
  },
  interests: '',
  bio: '',
  organisation: '',
  useReasonAnswer: '',
  issueAnswer: '',
  mentorDescribeAnswer: '',
  photoID: {
    fileName: '',
    isPrivate: true,
    url: '',
  },
  hearAboutPressPadAnswer: '',
  phoneNumber: '',
  reference1: {
    name: '',
    email: '',
  },
  reference2: {
    name: '',
    email: '',
  },
  offerLetter: {
    fileName: '',
    isPrivate: true,
  },
  internshipOfficeAddress: {
    addressline1: '',
    addressline2: '',
    city: '',
    postcode: '',
  },
  internshipContact: {
    name: '',
    email: '',
    phoneNumber: '',
  },
  emergencyContact: {
    name: '',
    phoneNumber: '',
    email: '',
  },
  DBSCheck: {
    fileName: '',
    refNum: '',
    isPrivate: true,
  },
  sexualOrientation: '',
  degreeLevel: '',
  ethnicity: '',
  parentProfession: '',
  disability: '',
  parentsWorkInPress: '',
  caringResponsibilities: '',
  allergies: '',
  backgroundAnswer: '',
  consentedOnPressPadTerms: '',
};
const Tabs = ['Profile', 'Details'];

export default class InternCreateProfile extends Component {
  state = {
    activeKey: 0,
    data: INITIAL_STATE,
    errors: INITIAL_STATE,
  };

  componentDidMount() {
    axios
      .get(API_MY_PROFILE_URL)
      .then(({ data: { profile } }) => {
        if (profile) {
          this.setState(prevState => ({
            data: {
              ...prevState.data,
              ...profile,
            },
          }));
        }
      })
      .catch(() => message.error('internal server error'));
  }

  handleChange = ({ value, key, parent }) => {
    if (parent) {
      this.setState(({ data, errors }) => ({
        data: {
          ...data,
          [parent]: { ...data[parent], [key]: value },
        },
        errors: { ...errors, [parent]: { ...errors[parent], [key]: null } },
      }));
    } else {
      this.setState(({ data, errors }) => ({
        data: {
          ...data,
          [key]: value,
        },
        errors: { ...errors, [key]: null },
      }));
    }
  };

  handleError = ({ errorMsg, key, parent }) => {
    if (parent) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [parent]: { ...prevState.errors[parent], [key]: errorMsg },
        },
      }));
    } else {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [key]: errorMsg,
        },
      }));
    }
  };

  handleValidationError = ({ inner }) => {
    const newErrors = {};
    if (inner)
      inner.forEach(({ path, message: errorMessage }) => {
        if (path.includes('.')) {
          const [parent, childrenPath] = path.split('.');
          newErrors[path] = newErrors[path] || {};
          newErrors[parent] = {
            ...newErrors[parent],
            [childrenPath]: errorMessage,
          };
        } else {
          newErrors[path] = errorMessage;
        }
      });
    return newErrors;
  };

  onChangeTabs = async () => {
    const { activeKey, data } = this.state;
    window.scroll(0, 0);
    if (!activeKey)
      try {
        const validData = await profileSchema.validate(
          { ...data },
          {
            abortEarly: false,
          },
        );
        this.setState(({ data: newData }) => ({
          data: { ...newData, ...validData },
        }));
      } catch (e) {
        this.setState({ loading: false });
        this.setState(({ errors }) => ({
          errors: { ...errors, ...this.handleValidationError(e) },
        }));
        return;
      }
    this.setState(({ activeKey: currTab }) => ({
      activeKey: +!currTab,
    }));
  };

  handleSubmit = async () => {
    const { data } = this.state;

    this.setState({ loading: true });
    try {
      const validData = await detailsSchema.validate(
        { ...data },
        { abortEarly: false },
      );
      this.setState(({ data: newData }) => ({
        data: { ...newData, ...validData },
      }));
    } catch (e) {
      this.setState(({ errors }) => ({
        errors: { ...errors, ...this.handleValidationError(e) },
      }));
      this.setState(() => ({ loading: false }));
      return;
    }
    try {
      await axios.post(API_INTERN_COMPLETE_PROFILE, { ...this.state.data });
      Modal.destroyAll();
      Modal.success({
        title: 'Done',
        content: (
          <Alert
            message="Thank you"
            description="Your profile has been saved"
            type="success"
          />
        ),
        onOk: () => {
          this.props.history.push(WELCOME_PAGES.replace(':id', 1));
        },
        type: 'success',
      });
    } catch (err) {
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
    }
    this.setState(() => ({ loading: false }));
    window.scroll(0, 0);
  };

  render() {
    const { name, id, role } = this.props;
    const { errors, data, activeKey, loading } = this.state;
    const {
      profileImage: { url: profilePhotoUrl },
    } = data;
    return (
      <Content
        name={name}
        errors={errors}
        data={data}
        handleChange={this.handleChange}
        handleError={this.handleError}
        userId={id}
        onChangeTabs={this.onChangeTabs}
        activeKey={Tabs[activeKey]}
        handleSubmit={this.handleSubmit}
        profilePhotoUrl={profilePhotoUrl}
        role={role}
        loading={loading}
      />
    );
  }
}
