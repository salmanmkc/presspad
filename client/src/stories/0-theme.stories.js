import React from 'react';
import ThemeTest from '../components/Pages/ThemeTest';

export default {
  title: 'ThemeTest',
  component: ThemeTest,
};

export const ToStorybook = () => <ThemeTest />;

ToStorybook.story = {
  name: 'to Storybook',
};
