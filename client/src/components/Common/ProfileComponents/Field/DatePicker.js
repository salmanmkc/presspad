import React, { Component } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { ErrorWrapper, Error } from '../ProfileComponents.style';

class DatePickerComponent extends Component {
  onChange = change => {
    const { handleChange, parent, name } = this.props;
    handleChange({ value: change, key: name, parent });
  };

  disabledDate = date => {
    const { openDate } = this.props;

    if (openDate) return false;

    return date && date > moment().subtract(16, 'years');
  };

  render() {
    const { placeholder, value, error, name, readOnly, openDate } = this.props;

    return (
      <>
        <ErrorWrapper error={error} marginBottom="12px">
          <DatePicker
            style={{ width: '100%' }}
            onChange={this.onChange}
            placeholder={placeholder}
            value={value ? moment(value) : undefined}
            name={name}
            disabled={readOnly}
            disabledDate={this.disabledDate}
            defaultPickerValue={
              openDate ? undefined : moment().subtract(16, 'years')
            }
          />
        </ErrorWrapper>
        {error && <Error block>{error}</Error>}
      </>
    );
  }
}

export default DatePickerComponent;
