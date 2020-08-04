import React, { useState } from 'react';
import { Input, DatePicker, Select, Checkbox, UploadFile } from './index';

export default {
  title: 'Inputs',
};

// DATES
//
export const Dates = () => {
  const [dateVal, setDateVal] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  });

  const onChange = value => setDateVal(value);

  const onRangeChange = (date, type) => {
    setDateRange({ ...dateRange, [type]: date });
  };

  return (
    <>
      <h2>Single Date</h2>
      <div style={{ marginBottom: '30px ' }}>
        <DatePicker onChange={onChange} value={dateVal} />
        <p>STATE: {JSON.stringify(dateVal)}</p>
      </div>
      <h2>Single Date with error</h2>
      <div style={{ marginBottom: '30px ' }}>
        <DatePicker
          onChange={onChange}
          value={dateVal}
          error="This is an error"
        />
        <p>STATE: {JSON.stringify(dateVal)}</p>
      </div>
      <h2>Date with disabled past</h2>
      <div style={{ marginBottpm: '20px ' }}>
        <DatePicker onChange={onChange} value={dateVal} disablePast />
        <p>STATE: {JSON.stringify(dateVal)}</p>
      </div>
      <h2>Date with disabled future</h2>
      <div style={{ marginBottpm: '20px ' }}>
        <DatePicker onChange={onChange} value={dateVal} disableFuture />
        <p>STATE: {JSON.stringify(dateVal)}</p>
      </div>
      <h2>Date Range</h2>
      <div style={{ marginBottpm: '20px ' }}>
        <DatePicker
          onChange={onRangeChange}
          type="dateRange"
          value={dateRange}
        />
        <p>STATE: {JSON.stringify(dateRange)}</p>
      </div>
      <h2>Date Range with error</h2>
      <div style={{ marginBottpm: '20px ' }}>
        <DatePicker
          onChange={onRangeChange}
          type="dateRange"
          value={dateRange}
          error="This is an error"
        />
        <p>STATE: {JSON.stringify(dateRange)}</p>
      </div>
      <h2>Date Range with past disabled</h2>
      <div style={{ marginBottpm: '20px ' }}>
        <DatePicker
          onChange={onRangeChange}
          type="dateRange"
          value={dateRange}
          disablePast
        />
        <p>STATE: {JSON.stringify(dateRange)}</p>
      </div>
    </>
  );
};

export const MultiDates = () => {
  const [multiDateRange, setMultiDateRange] = useState([
    {
      startDate: '',
      endDate: '',
    },
  ]);

  const onRangeChange = (date, type, index) => {
    const updatedDates = multiDateRange.map((dateObj, i) => {
      if (i === index) {
        return { ...dateObj, [type]: date };
      }
      return dateObj;
    });

    setMultiDateRange(updatedDates);
  };

  const handleDelete = index => {
    const updatedDates = multiDateRange.filter((dateObj, i) => index !== i);
    setMultiDateRange(updatedDates);
  };

  const handleAdd = () => {
    setMultiDateRange([
      ...multiDateRange,
      {
        startDate: '',
        endDate: '',
      },
    ]);
  };

  return (
    <>
      <div style={{ marginBottpm: '20px ' }}>
        {multiDateRange.map((date, index) => (
          <DatePicker
            onChange={onRangeChange}
            type="dateRange"
            multi
            index={index}
            handleDelete={handleDelete}
            handleAdd={handleAdd}
            arrayLength={multiDateRange.length}
            mb={1}
            value={multiDateRange[index]}
          />
        ))}
        <p>STATE: {JSON.stringify(multiDateRange)}</p>
      </div>
    </>
  );
};

// TEXT INPUT
//
export const TextInputs = () => {
  const [val, setVal] = useState('');

  const onChange = e => setVal(e.target.value);

  return (
    <>
      <h2>Single Text Input</h2>
      <div style={{ marginBottom: '30px ' }}>
        <Input onChange={onChange} value={val} label="Label goes here" />
        <p>STATE: {val}</p>
      </div>
      <h2>Text Area</h2>
      <div style={{ marginBottom: '30px ' }}>
        <Input
          onChange={onChange}
          textArea
          value={val}
          label="Label goes here"
          helperText="Write a short bio so interns can find out a bit more about you"
        />
        <p>STATE: {val}</p>
      </div>
      <h2>Text Area (with word limit)</h2>
      <div style={{ marginBottom: '30px ' }}>
        <Input
          onChange={onChange}
          textArea
          value={val}
          label="Other info"
          helperText="Write a short bio so interns can find out a bit more about you"
          limit={250}
          placeholder="No more than 250 words..."
        />
        <p>STATE: {val}</p>
      </div>
      <h2>With error</h2>
      <div style={{ marginBottom: '30px ' }}>
        <Input
          onChange={onChange}
          value={val}
          error="This is an error"
          label="Other info"
          helperText="Write a short bio so interns can find out a bit more about you"
        />
        <p>STATE: {val}</p>
      </div>
    </>
  );
};

// DROPDOWNS
//
export const Dropdowns = () => {
  const options = [
    { label: 'Option A', value: 'Option A' },
    { label: 'Option B', value: 'Option B' },
  ];

  const [val, setVal] = useState('');
  const [multiVals, setMultiVals] = useState([]);

  const onChange = e => setVal(e);
  const onMultiChange = e => setMultiVals(e);

  return (
    <>
      <h2>Dropdown</h2>
      <div style={{ marginBottom: '30px', padding: '50px' }}>
        <Select
          options={options}
          label="Label goes here"
          onChange={onChange}
          value={val}
        />
        <p>STATE: {val}</p>
      </div>
      <h2>Multi Dropdown</h2>
      <div style={{ marginBottom: '30px', padding: '50px' }}>
        <Select
          options={options}
          label="Label goes here"
          helperText="(select all that apply)"
          multi
          allowClear
          onChange={onMultiChange}
          value={multiVals}
        />
        <p>STATE: {multiVals}</p>
      </div>
      <h2>Multi Dropdown (with info)</h2>
      <div style={{ marginBottom: '30px', padding: '50px' }}>
        <Select
          options={options}
          label="Label goes here"
          helperText="(select all that apply)"
          multi
          allowClear
          onChange={onMultiChange}
          value={multiVals}
          extraInfo="Free School Meals are a statutory benefit available to school-aged children from families who receive other qualifying benefits and who have been through the relevant registration process. It does not include those who receive meals at school through other means (e.g. boarding school)."
        />
        <p>STATE: {val}</p>
      </div>
      <h2>With Error</h2>
      <div style={{ marginBottom: '30px', padding: '50px' }}>
        <Select
          options={options}
          label="Label goes here"
          helperText="(select all that apply)"
          multi
          allowClear
          onChange={onMultiChange}
          value={multiVals}
          error="This is an error"
          extraInfo="Free School Meals are a statutory benefit available to school-aged children from families who receive other qualifying benefits and who have been through the relevant registration process. It does not include those who receive meals at school through other means (e.g. boarding school)."
        />
        <p>STATE: {val}</p>
      </div>
    </>
  );
};

// CHECKBOXES
//
export const Checkboxes = () => {
  const [checked, setCheck] = useState(false);

  const onChange = e => setCheck(e.target.checked);

  return (
    <>
      <h2>Dropdown</h2>
      <div style={{ marginBottom: '30px', padding: '50px' }}>
        <Checkbox
          onChange={onChange}
          checked={checked}
          label="You can provide info for someone they can contact if you’re not available when they arrive (neighbour/ emergency contact/partner etc.) - this must be done once the booking is confirmed"
        />
        <p>STATE: {JSON.stringify(checked)}</p>
      </div>
      <h2>with error</h2>
      <div style={{ marginBottom: '30px', padding: '50px' }}>
        <Checkbox
          onChange={onChange}
          checked={checked}
          error="This is an error"
          label="You can provide info for someone they can contact if you’re not available when they arrive (neighbour/ emergency contact/partner etc.) - this must be done once the booking is confirmed"
        />
        <p>STATE: {JSON.stringify(checked)}</p>
      </div>
    </>
  );
};

// UPLOAD FILE
//
export const Uploads = () => (
  <>
    <div style={{ marginBottom: '30px', padding: '50px' }}>
      <h2>Multiple uploads</h2>
      <UploadFile
        multiple
        setImageInfo={data => {
          console.log('image been uploaded to S3', data);
        }}
        mainText="Upload more photos by dragging new photos here"
        secondaryText="file size max 2mb"
      />
    </div>
    <div style={{ marginBottom: '30px', padding: '50px' }}>
      <h2>Profile</h2>
      <UploadFile
        profile
        setImageInfo={data => {
          console.log('image been uploaded to S3', data);
        }}
        mainText="Upload your profile picture here"
        secondaryText="file size max 2mb"
      />
    </div>
    <div style={{ marginBottom: '30px', padding: '50px' }}>
      <h2>File</h2>
      <UploadFile
        setImageInfo={data => {
          console.log('image been uploaded to S3', data);
        }}
        mainText="Upload your profile picture here"
        secondaryText="file size max 2mb"
        type="file"
      />
    </div>
    <div style={{ marginBottom: '30px', padding: '50px' }}>
      <h2>With Error</h2>
      <UploadFile
        setImageInfo={data => {
          console.log('image been uploaded to S3', data);
        }}
        mainText="Upload your profile picture here"
        secondaryText="file size max 2mb"
        type="file"
        error="This is an error"
      />
    </div>
  </>
);
