import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { disabledStartDate, disabledEndDate } from '../../../helpers';

import { API_INTERNSHIP_URL } from '../../../constants/apiRoutes';
import Form from './Form';

const UpdateInternship = ({ id }) => {
  const [state, setState] = useState({
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
  });

  const onInputChange = e => {
    const { value, name, dataset: { parent } = {} } = e.target;
    if (parent)
      return setState(_state => ({
        ..._state,
        [parent]: { ..._state[parent], [name]: value },
      }));
    return setState(_state => ({ ..._state, [name]: value }));
  };

  const onUploadInternshipOffer = ({ value }) =>
    setState(_state => ({
      ..._state,
      offerLetter: { ..._state.offerLetter, fileName: value },
    }));

  const onStartChange = value =>
    setState(_state => ({ ..._state, internshipStartDate: value }));

  const onEndChange = value =>
    setState(_state => ({ ..._state, internshipEndDate: value }));

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
    console.log({ data });
    setState(_state => ({ ..._state, ...data }));
  };

  useEffect(() => {
    fetchInternshipDetails(id);
    return () => {};
  }, [id]);

  return (
    <Form
      state={state}
      userId={id}
      onInputChange={onInputChange}
      disabledStartDate={_disabledStartDate}
      onStartChange={onStartChange}
      disabledEndDate={_disabledEndDate}
      onEndChange={onEndChange}
      onUploadInternshipOffer={onUploadInternshipOffer}
    />
  );
};

export default UpdateInternship;
