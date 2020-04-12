import React, { useState } from 'react';
import { Input } from 'antd';
import * as T from '../../Common/Typography';
import { Row, SubRow } from './style';
import File from '../../Common/ProfileComponents/Field/File';

import Button from '../../Common/ButtonNew';

// TODO move this to antd wrappers
const Field = ({ label, mt, mb, mr, ml, ...props }) => (
  <div style={{ width: '100%' }}>
    <T.PBold as="label" mt={mt} mb={mb} mr={mr} ml={ml}>
      {label}
      <Input {...props} size="large" style={{ width: '100%' }} />
    </T.PBold>
  </div>
);
const UpdateInternship = () => {
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
    internshipStartDate: '',
    internshipEndDate: '',
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

  return (
    <div>
      <T.H3C mt="3">update internship details</T.H3C>
      <T.P mt="5">
        The dates you’ve requested to stay do not match the dates of your
        internship. We can only let you stay with hosts during and around the
        dates of your internship.
      </T.P>
      <T.P mt="6" mb="1">
        Please update your internship details below to complete this booking
        request.
      </T.P>
      <Row>
        <SubRow mt="5">
          <Field
            label="Organisation"
            placeholder="Type where your internship is..."
            name="organisation"
            value={state.organisation}
            onChange={onInputChange}
          />
        </SubRow>
      </Row>
      <T.PS mt="6">
        Please include contact details for someone from the organisation for us
        to verify your internship
      </T.PS>

      <SubRow mt="5">
        <Field
          label="Contact Name"
          placeholder="Type full name here..."
          onChange={onInputChange}
          name="name"
          value={state.internshipContact.name}
          data-parent="internshipContact"
        />
      </SubRow>

      <Row mt="5">
        <SubRow>
          <Field
            label="Contact Email"
            placeholder="Type email here..."
            onChange={onInputChange}
            name="email"
            value={state.internshipContact.email}
            data-parent="internshipContact"
          />
        </SubRow>
        <SubRow>
          <Field
            label="Contact Number"
            placeholder="Type number here..."
            onChange={onInputChange}
            name="phoneNumber"
            value={state.internshipContact.phoneNumber}
            data-parent="internshipContact"
          />
        </SubRow>
      </Row>

      <T.PS mt="5">Please include the organisation’s address</T.PS>

      <Row mt="5">
        <SubRow>
          <Field
            label="Address Line 1"
            placeholder="TODO get correct placeholder"
            onChange={onInputChange}
            name="addressline1"
            value={state.internshipOfficeAddress.addressline1}
            data-parent="internshipOfficeAddress"
          />
        </SubRow>
        <SubRow>
          <Field
            label="Address Line 2"
            placeholder="TODO get correct placeholder"
            onChange={onInputChange}
            name="addressline2"
            value={state.internshipOfficeAddress.addressline2}
            data-parent="internshipOfficeAddress"
          />
        </SubRow>
      </Row>

      <Row mt="5">
        <SubRow>
          <Field
            label="City"
            placeholder="TODO get correct placeholder"
            onChange={onInputChange}
            name="city"
            value={state.internshipOfficeAddress.city}
            data-parent="internshipOfficeAddress"
          />
        </SubRow>

        <SubRow>
          <Field
            label="Postcode"
            placeholder="TODO get correct placeholder"
            onChange={onInputChange}
            name="postcode"
            value={state.internshipOfficeAddress.postcode}
            data-parent="internshipOfficeAddress"
          />
        </SubRow>
      </Row>
      <T.PBold mt="6">Proof of internship offer</T.PBold>
      <T.PXS>
        e.g. a photo of an offer letter / email or a photo of anything else that
        can be used as proof of your internship.
      </T.PXS>
      <T.PXS>
        Please make sure you image is clear enough to read or your request may
        be automatically rejected
      </T.PXS>
      <File
        placeholder="placeholder"
        // value="value"
        handleChange={console.log}
        // error={error}
        // name={name}
        // parent={parent}
        handleError={console.log}
        // userId={userId}
        // isPrivate={isPrivate}
        // url={url}
        // readOnly={readOnly}
      />
      <Button mt="5" type="primary">
        Update and complete request
      </Button>
    </div>
  );
};

export default UpdateInternship;
