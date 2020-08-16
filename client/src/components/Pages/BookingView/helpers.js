import Moment from 'moment';
import { extendMoment } from 'moment-range';

import { calculatePrice } from '../../../helpers';

const moment = extendMoment(Moment);

/**
 * Create installments array
 * @param {number} netAmount the remaining amount that the intern has to pay
 * @param {Date} startDate booking starting date
 * @param {Date} endDate booking ending date
 * @param {boolean} upfront true if pay upfront
 * @returns {Array}
 */
export const createInstallments = ({
  startDate,
  endDate,
  upfront,
  couponInfo,
  bookingDays,
}) => {
  const installments = [];
  let key = 0;
  let _bookingDays = bookingDays;
  const { couponDiscount, discountRate } = couponInfo;

  if (_bookingDays <= 14) return [];
  if (upfront || _bookingDays < 56) {
    const amount = calculatePrice(_bookingDays - 14) - couponDiscount;
    return {
      key,
      dueDate: moment().toISOString(),
      amount,
    };
  }
  if (moment().isAfter(endDate)) return [];
  // push first installment
  installments.push({
    key,
    dueDate: moment().toISOString(),
    amount:
      _bookingDays > 28
        ? (calculatePrice(14) * (100 - discountRate)) / 100
        : (calculatePrice(_bookingDays - 14) * (100 - discountRate)) / 100,
  });
  _bookingDays -= 28;
  while (_bookingDays > 0) {
    key += 1;
    installments.push({
      key,
      dueDate: moment(startDate)
        .add(28 * key, 'd')
        .toISOString(),
      amount:
        _bookingDays > 28
          ? (calculatePrice(28) * (100 - discountRate)) / 100
          : (calculatePrice(_bookingDays) * (100 - discountRate)) / 100,
    });
    _bookingDays -= 28;
  }

  return installments;
};

/**
 *
 * @param {object} obj
 * @param {array} obj.installments
 * @param {object} obj.couponInfo
 * @param {number} obj.couponInfo.discountDays
 * @param {number} obj.couponInfo.discountRate
 */
export const createUpdatedNewInstallments = ({ installments, couponInfo }) => {
  const { discountDays, discountRate } = couponInfo;
  let _discountDays = discountDays;
  return installments.map(installment => {
    if (installment.transaction || _discountDays <= 0)
      return { ...installment };
    const installmentDiscountDays = installment.amount / 2000;

    const installmentDiscount =
      _discountDays > installmentDiscountDays
        ? (installmentDiscountDays * discountRate * 2000) / 100
        : (_discountDays * discountRate * 2000) / 100;

    _discountDays -= installmentDiscountDays;
    return {
      ...installment,
      amount: installment.amount - installmentDiscount,
    };
  });
};

/**
 * get the first unpaid installment
 * @param {Array} installments
 */
export const getFirstUnpaidInstallment = installments => {
  if (!installments || !Array.isArray(installments) || !installments[0])
    return undefined;

  let firstUnpaidInstallment;
  installments.forEach(installment => {
    if (!installment.transaction) {
      if (!firstUnpaidInstallment) {
        firstUnpaidInstallment = installment;
      } else {
        const { dueDate } = installment;
        const { dueDate: firstDueDate } = firstUnpaidInstallment;
        if (moment(dueDate).isBefore(firstDueDate)) {
          firstUnpaidInstallment = installment;
        }
      }
    }
  });
  return firstUnpaidInstallment;
};

export const getDueDateText = date => moment(date).format('Do MMM');

export const getRemainingPrice = installments =>
  installments.reduce((acc, installment) => {
    if (!installment.transaction) {
      return acc + installment.amount;
    }
    return acc;
  }, 0);
