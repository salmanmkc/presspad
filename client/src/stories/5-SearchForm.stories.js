import React from 'react';
import { action } from '@storybook/addon-actions';
import Form from '../components/Pages/SearchHosts/Form';
import Hero from '../components/Pages/SearchHosts/Hero';

export default {
  title: 'SearchForm',
};

export const Default = () => <Form onClick={action('button-click')} />;
export const HeroComponent = () => <Hero onClick={action('button-click')} />;
