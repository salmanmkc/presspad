/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { API_COUPON_URL } from '../../../constants/apiRoutes';

export const handleCoupons = async code => {
  // make request to validate code
  try {
    const {
      data: {
        data: [couponInfo],
      },
    } = await axios.get(`${API_COUPON_URL}?code=${code}`);

    const {
      startDate: couponStart,
      endDate: couponEnd,
      discountRate,
      usedDays,
      usedAmount,
      reservedAmount,
    } = couponInfo;

    // get user booking request details
    const bookingdates =
      dates.length > 1 && createStartEndDate(dates[0], dates[1]);
    const startDate = bookingdates[0];
    const endDate = bookingdates[1];

    // calculate discount days
    const { discountDays } = getDiscountDays({
      bookingStart: startDate,
      bookingEnd: endDate,
      couponStart,
      couponEnd,
      usedDays,
    });

    // calculate discounted percentage
    let couponDiscount = (calculatePrice(discountDays) * discountRate) / 100;

    // get remaining amount
    const availableAmount = reservedAmount - usedAmount;

    if (availableAmount < couponDiscount) {
      couponDiscount = availableAmount;
    }
  } catch (error) {}
};
