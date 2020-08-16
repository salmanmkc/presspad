import React from 'react';
import { Popover } from 'antd';
import styled from 'styled-components';
import * as T from '../Typography';
import Icon from '../Icon';
import margins from '../../../helpers/margins';
import { breakpoints } from '../../../theme';

const Wrapper = styled.div`
  ${margins};
  width: 100%;

  @media ${breakpoints.mobileL} {
    width: auto;
    max-width: ${({ maxWidth }) => maxWidth || '100%'};
  }
`;

const Figure = ({
  stats,
  title,
  statsColor,
  titleColor,
  small,
  popoverContent,
  maxWidth,
  mt,
  mb,
  mr,
  ml,
}) => (
  <Wrapper mt={mt} mb={mb} mr={mr} ml={ml} maxWidth={maxWidth}>
    <T.H1
      color={statsColor || 'pink'}
      style={{ lineHeight: 1, fontSize: small && '30px' }}
    >
      {stats}
    </T.H1>
    <T.H5 color={titleColor || 'blue'} style={{ fontSize: small && '18px' }}>
      {title}
    </T.H5>
    {popoverContent && (
      <Popover content={popoverContent}>
        <Icon icon="questionCircle" color="pink" width="20px" height="20px" />
      </Popover>
    )}
  </Wrapper>
);

export default Figure;
