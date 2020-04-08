import React from 'react';
import { action } from '@storybook/addon-actions';
import Form from '../components/Pages/SearchHosts/Form';

export default {
  title: 'SearchForm',
};

export const Default = () => <Form onClick={action('button-click')} />;
