import React, { useState } from 'react';
import { Popover } from 'antd';
import styled from 'styled-components';
import Icon from '../Icon';
import * as T from '../Typography';

const PopContainer = styled.div`
  display: flex;
`;

const Button = styled.button`
  background: none;
  border: none;
  box-shadow: none;
  display: flex;
  cursor: pointer;
  outline: none;
`;

const LinkCopy = ({ showText, strToCopy }) => {
  const [open, setOpen] = useState(false);
  const [success, SetSuccess] = useState(null);

  const copyTextToClipboard = () => {
    try {
      const el = document.createElement('textarea');
      el.value = strToCopy;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      SetSuccess(true);
      setOpen(true);
    } catch (error) {
      SetSuccess(false);
      setOpen(false);
    }
  };

  if (open) {
    setTimeout(() => setOpen(false), 1000);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <T.H5 color="pink">{strToCopy}</T.H5>
      <Popover
        content={
          success ? (
            <PopContainer>
              <Icon icon="tick" width="20" color="green" />
              <T.PS ml={3}>copied successfully</T.PS>
            </PopContainer>
          ) : (
            <PopContainer>
              <Icon icon="alertTriangle" width="20" color="yellow" />
              <T.PS ml={3}>something wrong</T.PS>
            </PopContainer>
          )
        }
        visible={open}
        trigger="click"
        onVisibleChange={() => setOpen(!open)}
      >
        <Button type="button" onClick={() => copyTextToClipboard()}>
          {showText && <T.H5 mr={3}>Copy</T.H5>}{' '}
          <Icon icon="copy" color="blue" width="24px" height="24px" />
        </Button>
      </Popover>
    </div>
  );
};

export default LinkCopy;
