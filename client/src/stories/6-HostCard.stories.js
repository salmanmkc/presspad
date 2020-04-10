import React from 'react';
import HostCard from '../components/Pages/SearchHosts/HostCard';

export default {
  title: 'SearchForm',
};

export const HostCardshort = () => (
  <HostCard
    city="liverpool"
    postcode="sw11"
    img="https://via.placeholder.com/380x234"
    startDate="19 FEB"
    endDate="13 MAR"
  />
);

export const HostCardLong = () => (
  <HostCard
    city="liverpool"
    postcode="sw11"
    img="https://via.placeholder.com/380x234"
    startDate="19 FEB"
    endDate="13 MAR"
    long
  />
);
