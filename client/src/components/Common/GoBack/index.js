import React from 'react';
import { withRouter } from 'react-router-dom';
import { Wrapper, IconWrapper } from './style';
import { H7C, H6C } from '../Typography';
import Icon from '../Icon';

const GoBack = ({ onClick, large, iconColor }) => {
  const back =
    onClick && onClick instanceof Function ? onClick : History.goBack;
  const Component = large ? H6C : H7C;

  return (
    <Wrapper onClick={back}>
      <IconWrapper>
        <Icon
          icon="arrow"
          color={iconColor || 'pink'}
          width="24px"
          direction="left"
        />
      </IconWrapper>
      <Component>go back</Component>
    </Wrapper>
  );
};

export default withRouter(GoBack);
