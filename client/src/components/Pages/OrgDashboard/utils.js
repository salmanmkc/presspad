import moment from 'moment';

import { formatPrice, createSingleDate } from '../../../helpers';

export const createCodesTableData = arr =>
  arr.map(el => {
    const {
      code,
      startDate,
      endDate,
      usedAmount,
      reservedAmount,
      status,
      intern,
    } = el;

    return {
      code,
      startDate: createSingleDate(startDate),
      endDate: createSingleDate(endDate),
      usedAmount: formatPrice(usedAmount),
      reservedAmount: formatPrice(reservedAmount),
      status,
      id: intern._id,
      internName: intern.name,
    };
  });

export const calculateTotalCouponsValue = arr =>
  arr.map(el => el.reservedAmount).reduce((a, b) => a + b, 0);

export const getLiveCoupons = arr =>
  arr.filter(item => moment(item.endDate).valueOf() >= moment().valueOf());

export const getPreviousCoupons = arr =>
  arr.filter(
    item =>
      moment(item.endDate).valueOf() <= moment().valueOf() &&
      moment(item.startDate).valueOf() < moment().valueOf(),
  );

export const getCurrentlyHosted = arr =>
  arr.filter(item => item.status === 'At host').length;

export const getTotalInternsSupported = arr =>
  [...new Set(arr.filter(el => el.usedAmount > 0).map(el => el.intern._id))]
    .length;
