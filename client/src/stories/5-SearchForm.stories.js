import React from 'react';
import { action } from '@storybook/addon-actions';
import Form from '../components/Pages/SearchHosts/Form';
import Hero from '../components/Pages/SearchHosts/Hero';
import HostCard from '../components/Pages/SearchHosts/HostCard';

export default {
  title: 'SearchForm',
};

export const Default = () => <Form onClick={action('button-click')} />;
export const HeroComponent = () => <Hero onClick={action('button-click')} />;
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
