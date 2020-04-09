import React from 'react';
import { Modal as AntdModal } from 'antd';
import { MemoryRouter } from 'react-router-dom';
import { withTheme, ThemeProvider } from 'styled-components';
import * as T from '../Typography';
import theme from '../../../theme';
// const contentWrapper = withTheme(({ content }) => <T.PS>{content}</T.PS>);

const Modal = ({ type, title, content, ...props }) => {
  console.log({ title, content });

  return AntdModal[type]({
    title,
    content: (
      <ThemeProvider theme={theme}>
        <MemoryRouter>{content}</MemoryRouter>
      </ThemeProvider>
    ),
    ...props,
  });
};

Modal.info = props => Modal({ type: 'info', ...props });
Modal.warning = props => Modal({ type: 'warning', ...props });
Modal.success = props => Modal({ type: 'success', ...props });
Modal.error = props => Modal({ type: 'error', ...props });
Modal.confirm = props => Modal({ type: 'confirm', ...props });

export default Modal;
