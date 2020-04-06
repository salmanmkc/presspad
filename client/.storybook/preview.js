import React from 'react';
import { addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';
import theme from '../src/theme';

addDecorator(storyFn => (
  <ThemeProvider theme={theme}>
    <MemoryRouter>
      {storyFn()}
    </MemoryRouter>
  </ThemeProvider>
));
