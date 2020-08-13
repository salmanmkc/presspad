import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
// CONSTANTS
import {
  API_SIGNUP_URL,
  API_GET_ORGS_URL,
  DASHBOARD_URL,
} from '../../../constants/apiRoutes';

import USER_TYPES from '../../../constants/userTypes';

import {
  HOST_COMPLETE_PROFILE_URL,
  Error500,
  INTERN_SIGNUP_WELCOME,
} from '../../../constants/navRoutes';

import SignUp from './SignUp';

const SignUpPage = props => {
  const [fields, setFields] = useState({
    name: '',
    email: '',
    password: '',
    organisation: '',
  });
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState('');
  const [existingOrgs, setExistingOrgs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeOnTerms, setAgreeOnTerms] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const useQuery = () => new URLSearchParams(location.search);
  const query = useQuery();

  useEffect(() => {
    const { userType } = props;
    window.scrollTo(0, 0);

    // get all organisations for client side validation
    const getAllOrgs = async () => {
      try {
        const orgs = await axios.get(API_GET_ORGS_URL);
        if (orgs.data.length > 0) {
          const orgNames = orgs.data.map(organisation => ({
            name: organisation.name,
            email: organisation.orgDetails.email,
          }));
          setExistingOrgs(orgNames);
        }
      } catch (err) {
        history.push(Error500);
      }
    };

    if (userType === 'organisation') getAllOrgs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // check organisation already exists
  const checkOrg = () => {
    const { organisation } = fields;

    const matchedOrg = existingOrgs.filter(
      org =>
        org.name.toLowerCase().trim() === organisation.toLowerCase().trim(),
    );

    return matchedOrg;
  };

  const passwordValidation = () => {
    let _error = '';
    let formIsValid = true;

    // regex for password validation
    const pattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/g);

    if (fields.password && fields.password.length < 8) {
      _error = 'Password is too short.';
      formIsValid = false;
    } else if (!pattern.test(fields.password)) {
      _error =
        'Password requires 8 characters including at least 1 uppercase character and 1 number.';
      formIsValid = false;
    }

    setErrors(e => ({ ...e, password: _error }));
    return formIsValid;
  };

  const onCheckboxChange = e => {
    setAgreeOnTerms(e.target.checked);
  };

  useEffect(() => {
    if (fields.password) {
      passwordValidation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields.password]);

  const onInputChange = e => {
    e.persist();
    setFields(_state => ({ ..._state, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const _errors = {};
    let formIsValid = true;

    if (!fields.name) {
      formIsValid = false;
      _errors.name = 'Please enter your name.';
    }

    if (!fields.email) {
      formIsValid = false;
      _errors.email = 'Please enter your email.';
    }

    if (!fields.organisation && props.userType === USER_TYPES.organisation) {
      formIsValid = false;
      _errors.organisation = 'Please enter your organisation';
    }

    if (fields.organisation && props.userType === USER_TYPES.organisation) {
      const matchedOrg = checkOrg(fields.organisation);
      if (matchedOrg.length > 0) {
        formIsValid = false;
        _errors.organisation = `${matchedOrg[0].name} already has an account created by ${matchedOrg[0].email}`;
      }
    }

    if (typeof fields.email !== 'undefined') {
      // regular expression for email validation
      const pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
      );
      if (!pattern.test(fields.email)) {
        formIsValid = false;
        _errors.email = 'Please enter valid email.';
      }
    }

    // regex for password validation
    const passwordPattern = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/g,
    );

    if (fields.password && fields.password.length < 8) {
      _errors.password = 'Password is too short.';
      formIsValid = false;
    } else if (!passwordPattern.test(fields.password)) {
      _errors.password =
        'Password requires 8 characters including at least 1 uppercase character and 1 number.';
      formIsValid = false;
    }

    // for hosts make sure they've ticked the disclaimer
    if (
      (props.userType === 'host' || props.userType === 'intern') &&
      !agreeOnTerms
    ) {
      formIsValid = false;
      _errors.checkbox =
        'You need to agree with the Terms & Conditions and PressPad Privacy Policy in order to complete the signup';
    }

    setErrors(_errors);

    return formIsValid;
  };

  const onFormSubmit = async e => {
    const { handleChangeState } = props;

    const referralToken = query.get('referral');

    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      try {
        setIsLoading(true);

        const { data } = await axios.post(API_SIGNUP_URL, {
          ...fields,
          role: props.userType,
          referralToken,
        });

        handleChangeState({ ...data, isLoggedIn: true });
        if (['organisation'].includes(data.role)) {
          history.push(DASHBOARD_URL);
        } else if (data.role === 'intern') {
          history.push(INTERN_SIGNUP_WELCOME);
        } else if (['host', 'superhost'].includes(data.role)) {
          history.push(HOST_COMPLETE_PROFILE_URL);
        }
      } catch (err) {
        if (err.response) {
          if (
            err.response.data &&
            err.response.data.error &&
            err.response.data.error.includes('Email')
          ) {
            setErrors({ email: err.response.data.error });
          }
          setMsg(err.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <SignUp
      fields={fields}
      errors={errors}
      msg={msg}
      agreeOnTerms={agreeOnTerms}
      userType={props.userType}
      isLoading={isLoading}
      onInputChange={onInputChange}
      onFormSubmit={onFormSubmit}
      onCheckboxChange={onCheckboxChange}
    />
  );
};

export default SignUpPage;
