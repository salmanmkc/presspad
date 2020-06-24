import React from 'react';
import { BookingCards } from '../components/Common/Cards';

export default {
  title: 'Cards',
};

const startDate = '2020-05-13T11:05:20.064Z';
const endDate = '2020-07-13T11:05:20.064Z';
const price = 100;
const withUser = 'Mone Dupree';
const bookingID = '5e9adeeffeb1b565b5c3472b';
const withUserType = 'intern';
const bio =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna, , sed do eiusmod tempor incididunt ut labore et dolore magn, , sed do eiusmod tempor incididunt ut labore et dolore magn ';
const interests = ['Radio', 'Online Journalism'];
const status = 'Accepted';

export const BookingCardSmall = () => (
  <BookingCards
    type="small"
    startDate={startDate}
    endDate={endDate}
    price={price}
    withUser={withUser}
    withUserType="host"
    bookingID={bookingID}
  />
);

export const BookingCardBig = () => (
  <BookingCards
    type="big"
    startDate={startDate}
    endDate={endDate}
    price={price}
    withUser={withUser}
    bookingID={bookingID}
    withUserType={withUserType}
    bio={bio}
    interests={interests}
    status={status}
  />
);
