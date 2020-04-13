import React from 'react';
import { Modal as AntdModal } from 'antd';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import theme from '../../../theme';

const disableButton = (props = { style: {} }) => ({
  ...props,
  style: { ...props.style, display: 'none' },
});

const Modal = ({
  type,
  title,
  content,
  hideOkButton,
  okButtonProps = {},
  ...props
}) =>
  AntdModal[type]({
    title,
    content: (
      <ThemeProvider theme={theme}>
        <MemoryRouter>{content}</MemoryRouter>
      </ThemeProvider>
    ),
    okButtonProps: hideOkButton ? disableButton(okButtonProps) : okButtonProps,
    maskClosable: true,
    ...props,
  });

Modal.info = props => Modal({ type: 'info', ...props });
Modal.warning = props => Modal({ type: 'warning', ...props });
Modal.success = props => Modal({ type: 'success', ...props });
Modal.error = props => Modal({ type: 'error', ...props });
Modal.confirm = props => Modal({ type: 'confirm', ...props });

export default Modal;
