import React from 'react';
import { action } from '@storybook/addon-actions';
import GoBack from '../components/Common/GoBack';

export default {
  title: 'GoBack',
};

export const Default = () => <GoBack onClick={action('button-click')} />;

export const Large = () => <GoBack onClick={action('button-click')} large />;

export const BlackIcon = () => (
  <GoBack onClick={action('button-click')} iconColor="black" />
);
