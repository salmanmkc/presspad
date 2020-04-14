import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import { disabledStartDate, disabledEndDate } from '../../../helpers';
import { updateInternshipAndCreateBooking } from './utils';
import { API_INTERNSHIP_URL } from '../../../constants/apiRoutes';
import Form from './Form';

const { validate, internshipSchema } = require('../../../validation');

const fields = {
  organisation: '',
  internshipContact: {
    name: '',
    email: '',
    phoneNumber: '',
  },
  internshipOfficeAddress: {
    addressline1: '',
    addressline2: '',
    city: '',
    postcode: '',
  },
  internshipStartDate: null,
  internshipEndDate: null,
  offerLetter: {
    fileName: '',
    isPrivate: true,
    url: '',
  },
};

const useQuery = () => new URLSearchParams(useLocation().search);

const UpdateInternship = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({ ...fields });
  const [errors, setErrors] = useState({ ...fields, offerLetter: '' });
  const query = useQuery();

  const onInputChange = e => {
    const { value, name, dataset: { parent } = {} } = e.target;
    if (parent) {
      setErrors(_errors => ({
        ..._errors,
        [parent]: { ..._errors[parent], [name]: '' },
      }));

      return setState(_state => ({
        ..._state,
        [parent]: { ..._state[parent], [name]: value },
      }));
    }

    setErrors(_errors => ({ ..._errors, [name]: '' }));
    return setState(_state => ({ ..._state, [name]: value }));
  };

  const onUploadInternshipOffer = ({ value }) =>
    setState(_state => ({
      ..._state,
      offerLetter: { ..._state.offerLetter, fileName: value, url: '' },
    }));

  const onStartChange = value => {
    setState(_state => ({ ..._state, internshipStartDate: value }));
    setErrors(_errors => ({ ..._errors, internshipStartDate: '' }));
  };
  const onEndChange = value => {
    setState(_state => ({ ..._state, internshipEndDate: value }));
    setErrors(_errors => ({ ..._errors, internshipEndDate: '' }));
  };
  const _disabledStartDate = startDate => {
    const { internshipEndDate } = state;
    return disabledStartDate({ endDate: internshipEndDate, startDate });
  };

  const _disabledEndDate = endDate => {
    const { internshipStartDate } = state;
    return disabledEndDate({ endDate, startDate: internshipStartDate });
  };

  const fetchInternshipDetails = async () => {
    const { data } = await axios.get(API_INTERNSHIP_URL);
    setState(_state => ({ ..._state, ...data }));
  };

  useEffect(() => {
    fetchInternshipDetails(id);
    return () => {};
  }, [id]);

  const onSubmit = async e => {
    const bookingData = {
      startDate: query.get('startDate'),
      endDate: query.get('endDate'),
      host: query.get('hostId'),
      price: query.get('price'),
      listing: query.get('listing'),
    };

    e.preventDefault();
    const { errors: _errors } = await validate({
      schema: internshipSchema,
      data: state,
    });

    if (!_errors) {
      setLoading(true);
      await updateInternshipAndCreateBooking({
        internshipData: state,
        bookingData,
      });
    } else {
      setErrors(oldErrors => ({ ...oldErrors, ..._errors }));
    }
    setLoading(false);
  };

  const fileErrorHandler = ({ errorMsg }) => {
    setErrors(oldErrors => ({ ...oldErrors, offerLetter: errorMsg }));
  };

  return (
    <Form
      state={state}
      errors={errors}
      loading={loading}
      userId={id}
      onInputChange={onInputChange}
      disabledStartDate={_disabledStartDate}
      onStartChange={onStartChange}
      disabledEndDate={_disabledEndDate}
      onEndChange={onEndChange}
      onUploadInternshipOffer={onUploadInternshipOffer}
      fileErrorHandler={fileErrorHandler}
      onSubmit={onSubmit}
    />
  );
};

export default UpdateInternship;
