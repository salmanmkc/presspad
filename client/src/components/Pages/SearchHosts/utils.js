import React from 'react';
/**
 * styles the dates
 */
const dateRender = ({ current, endDate, startDate }) => {
  const style = {};

  // add background to the dates in between the endDate and the startDate
  if (
    endDate &&
    startDate &&
    current.isSameOrBefore(endDate, 'day') &&
    current.isSameOrAfter(startDate, 'day')
  ) {
    return (
      <div className="ant-picker-cell ant-picker-cell-in-view ant-picker-cell-in-range">
        {current.date()}
      </div>
    );
  }

  // add a rounded border on the startDate and the endDate
  if (
    (endDate && current.isSame(endDate, 'day')) ||
    (startDate && current.isSame(startDate, 'day'))
  ) {
    style.borderRadius = '50%';
    style.border = '1px solid';
  }

  return (
    <div className="ant-picker-cell-inner" style={style}>
      {current.date()}
    </div>
  );
};

export { dateRender };
