import React from 'react';
import { addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';
import theme from '../src/theme';
import 'antd/dist/antd.css';

addDecorator(storyFn => (
  <ThemeProvider theme={theme}>
    <MemoryRouter>
      <div style={{margin: "0 auto"}}>
        {storyFn()}
      </div>
    </MemoryRouter>
  </ThemeProvider>
));
