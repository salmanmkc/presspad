import React from 'react';
import moment from 'moment';
import axios from 'axios';

import * as T from '../../Common/Typography';
import { Modal } from '../../Common/AntdWrappers';

import {
  API_SEARCH_PROFILES_URL,
  API_GET_ALL_CETIES_URL,
} from '../../../constants/apiRoutes';

import placeholder from '../../../assets/listing-placeholder.jpg';

/**
 * styles the dates in the datePickers
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

const getCities = async () => {
  // fetch all cities from the listing
  const { data } = await axios.get(API_GET_ALL_CETIES_URL);
  const cities = data
    .filter(({ address: { city } = {} }) => !!city)
    .reduce((acc, curr) => {
      acc.add(curr.address.city.toLowerCase());
      return acc;
    }, new Set());

  return cities;
};

const fetchListings = async searchFields => {
  try {
    const { data } = await axios.post(API_SEARCH_PROFILES_URL, searchFields);
    return { listings: data, error: null };
  } catch (error) {
    const searchError = 'Sorry, there was an error getting the listings';
    return { listings: [], error: searchError };
  }
};

const disabledStartDate = ({ endDate, startDate }) => {
  if (!endDate || !startDate) {
    return startDate && startDate < moment().subtract(1, 'day');
  }
  return startDate.valueOf() > endDate.valueOf();
};

const disabledEndDate = ({ endDate, startDate }) => {
  if (!startDate) {
    return endDate && endDate < moment().endOf('day');
  }

  return endDate.valueOf() <= startDate.valueOf();
};

const validateSearch = ({ city, startDate, endDate, acceptAutomatically }) => {
  let error = '';

  let searchIsValid = true;

  if (!city && !startDate && !endDate && acceptAutomatically === null) {
    searchIsValid = false;
    error = 'you must fill in at least one search field';
  }

  return { error, searchIsValid };
};
const check7And14DaysBooking = value => {
  const within7Days = value && value.isBefore(moment().add(7, 'days'));
  const within14Days = value && value.isBefore(moment().add(14, 'days'));

  return { within7Days, within14Days };
};

const show7DaysWarning = () => {
  Modal.warning({
    title: 'Sorry, it is too close to your requested stay ',
    content: (
      <>
        Booking requests must be made at least 1 week before your internship
        starts. If you do not have anywhere to stay for your upcoming internship
        and it is urgent, please email PressPad at{' '}
        <T.Link to="urgent@presspad.co.uk" color="lightBlue" fz="14">
          urgent@presspad.co.uk
        </T.Link>
      </>
    ),
    hideOkButton: true,
  });
};

const showStartDate = dates => {
  if (dates.length > 0) {
    const sortedDates = dates.sort((a, b) => b.startDate - a.startDate);

    return moment(sortedDates[0].startDate).format('DD MMM');
  }
  return moment(dates).format('DD MMM');
};

const showEndDate = dates => {
  if (dates.length > 0) {
    const sortedDates = dates.sort((a, b) => b.endDate - a.endDate);
    return moment(sortedDates[sortedDates.length - 1].endDate).format('DD MMM');
  }
  return moment(dates).format('DD MMM');
};

// checks if lisitng image exists and goes to right folder
const getListingPic = pics => {
  if (!pics || !pics.length) return placeholder;
  return pics.find(pic => !pic.isPrivate).url || placeholder;
};

export {
  dateRender,
  getCities,
  fetchListings,
  disabledStartDate,
  disabledEndDate,
  validateSearch,
  check7And14DaysBooking,
  show7DaysWarning,
  showStartDate,
  showEndDate,
  getListingPic,
};
