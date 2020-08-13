import React from 'react';
import { Modal as AntdModal } from 'antd';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import theme from '../../../theme';

import * as T from '../Typography';
import { Row, Col } from '../Grid';

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
  type ? (
    AntdModal[type]({
      title,
      content: (
        <ThemeProvider theme={theme}>
          <MemoryRouter>{content}</MemoryRouter>
        </ThemeProvider>
      ),
      okButtonProps: hideOkButton
        ? disableButton(okButtonProps)
        : okButtonProps,
      maskClosable: true,
      icon: false,
      ...props,
    })
  ) : (
    <AntdModal
      maskClosable
      {...props}
      okButtonProps={
        hideOkButton ? disableButton(okButtonProps) : okButtonProps
      }
    >
      {title && (
        <Row mt={4}>
          <Col w={[4, 12, 12]}>
            <T.H4 color="darkBlue">{title}</T.H4>
          </Col>
        </Row>
      )}
      {content}
    </AntdModal>
  );

Modal.info = props => Modal({ type: 'info', ...props });
Modal.warning = props => Modal({ type: 'warning', ...props });
Modal.success = props => Modal({ type: 'success', ...props });
Modal.error = props => Modal({ type: 'error', ...props });
Modal.confirm = props => Modal({ type: 'confirm', ...props });

export default Modal;
