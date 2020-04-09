import React from 'react';
import { Form as StyledForm, Row, SubRow } from './style';
import * as T from '../../Common/Typography';
import { Select, DatePicker, Switch } from '../../Common/AntdWrappers';
import Button from '../../Common/ButtonNew';
import { titleCase, newId } from '../../../helpers';

const Form = ({
  formProps: {
    cities,
    onInputChange,
    startDate,
    onStartChange,
    disabledStartDate,
    endDate,
    disabledEndDate,
    onEndChange,
    onSearchSubmit,
    acceptAutomatically,
    switchToggle,
  },
}) => (
  <StyledForm onSubmit={onSearchSubmit}>
    <T.H3C mt="2" mb="4">
      {/* <T.H3C mt="2" mb="4"> */}
      FIND A PRESSPAD
    </T.H3C>
    <T.PXL mt="1" mb="6">
      You can search for hosts by filling in the city and dates you&apos;re
      looking for. Need somewhere quickly? Then select automatic bookings.
    </T.PXL>
    <Row>
      <T.PL mb="1" mr="4">
        I want a place to stay in
      </T.PL>
      <Select
        mt="1"
        mb="1"
        showSearch
        placeholder="Enter your city"
        name="city"
        id="city"
        autoFocus
        style={{ width: 215 }}
        onSelect={onInputChange}
      >
        {cities.map(city => (
          <Select.Option value={city} key={city}>
            {titleCase(city)}
          </Select.Option>
        ))}
      </Select>
    </Row>
    <Row mt="3">
      <SubRow mr="4">
        <T.PL mb="1" mr="4">
          between
        </T.PL>
        <DatePicker
          size="large"
          mt="1"
          mb="1"
          disabledDate={disabledStartDate}
          value={startDate}
          onChange={onStartChange}
        />
      </SubRow>
      <SubRow>
        <T.PL mt="1" mb="1" mr="4">
          and
        </T.PL>
        <DatePicker
          id="endDate"
          disabledDate={disabledEndDate}
          mt="1"
          mb="1"
          value={endDate}
          onChange={onEndChange}
        />
      </SubRow>
    </Row>
    <Row mt="4">
      <Switch
        checked={acceptAutomatically}
        id={newId()}
        onChange={switchToggle}
      >
        Automatically accepts booking requests
      </Switch>
    </Row>
    <Row mt="6">
      <Button type="secondary" small>
        SEARCH
      </Button>
    </Row>
  </StyledForm>
);
export default Form;
