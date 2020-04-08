import React from 'react';
import { Form as StyledForm, Row, SubRow } from './style';
import * as T from '../../Common/Typography';
import { Select, DatePicker, Switch } from '../../Common/AntdWrappers';
import { newId } from '../../../helpers';

const Form = () => (
  <StyledForm>
    <T.H3C>FIND A PRESSPAD</T.H3C>
    <T.PXL>
      You can search for hosts by filling in the city and dates you're looking
      for. Need somewhere quickly? Then select automatic bookings.
    </T.PXL>
    <Row>
      <T.PL>I want a place to stay in</T.PL>
      <Select
        showSearch
        placeholder="Enter your city"
        name="city"
        id="city"
        autoFocus
        style={{ width: 215 }}
        // onSelect={this.onInputChange}
      >
        {/* {cities.map(city => (
          <Select.Option value={city} key={city}>
            {titleCase(city)}
          </Select.Option>
        ))} */}
        1111
      </Select>
    </Row>
    <Row>
      <SubRow>
        <T.PL>between</T.PL>
        <DatePicker
          name="startDate"
          // disabledDate={this.disabledStartDate}
          id="startDate"
          type="date"
          style={{ width: 150 }}
          // value={startDate}
          // onChange={this.onStartChange}
          format="YYYY-MM-DD"
        />
      </SubRow>
      <SubRow>
        <T.PL>and</T.PL>
        <DatePicker
          name="startDate"
          // disabledDate={this.disabledStartDate}
          id="startDate"
          type="date"
          style={{ width: 150 }}
          // value={startDate}
          // onChange={this.onStartChange}
          format="YYYY-MM-DD"
        />
      </SubRow>
    </Row>
    <Row>
      <Switch id={newId()}>Automatically accepts booking requests</Switch>
    </Row>
  </StyledForm>
);
export default Form;
