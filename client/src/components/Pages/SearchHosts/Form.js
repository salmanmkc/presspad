import React from 'react';
import { Form as StyledForm, Row, SubRow, ErrorMessage } from './style';
import * as T from '../../Common/Typography';
import { Select, DatePicker, Switch } from '../../Common/Inputs';
import Button from '../../Common/ButtonNew';
import { titleCase, newId, dateRender } from '../../../helpers';

const Form = ({
  formProps: {
    cities,
    onInputCityChange,
    startDate,
    onStartChange,
    disabledStartDate,
    endDate,
    disabledEndDate,
    onEndChange,
    onSearchSubmit,
    acceptAutomatically,
    acceptAutomaticallyDisabled,
    switchToggle,
    within7Days,
    loading,
    error,
  },
}) => (
  <StyledForm onSubmit={onSearchSubmit}>
    <T.H3C mt="2" mb="4">
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
        autoComplete="off"
        autoFocus
        style={{ width: 215 }}
        onChange={onInputCityChange}
        disabled={within7Days}
        options={cities.map(city => ({
          value: city,
          key: city,
          label: titleCase(city),
        }))}
      />
    </Row>
    <Row mt="3">
      <SubRow mr="4">
        <T.PL mb="1" mr="4">
          between
        </T.PL>
        <div style={{ width: '215px' }}>
          <DatePicker
            mt="1"
            mb="1"
            disabledDate={disabledStartDate}
            value={startDate}
            onChange={onStartChange}
            dateRender={current => dateRender({ current, startDate, endDate })}
          />
        </div>
      </SubRow>
      <SubRow>
        <T.PL mt="1" mb="1" mr="4">
          and
        </T.PL>
        <div style={{ width: '215px' }}>
          <DatePicker
            disabledDate={disabledEndDate}
            mt="1"
            mb="1"
            value={endDate}
            onChange={onEndChange}
            disabled={within7Days}
            dateRender={current => dateRender({ current, startDate, endDate })}
          />
        </div>
      </SubRow>
    </Row>
    <Row mt="4">
      <Switch
        checked={acceptAutomatically}
        id={newId()}
        onChange={switchToggle}
        disabled={acceptAutomaticallyDisabled}
      >
        Automatically accepts booking requests
      </Switch>
    </Row>
    <Row mt="6">
      <Button type="secondary" small disabled={within7Days} loading={loading}>
        SEARCH
      </Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Row>
  </StyledForm>
);
export default Form;
