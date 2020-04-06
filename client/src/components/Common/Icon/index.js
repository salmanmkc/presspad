import React from 'react';
import styled, { css, withTheme } from 'styled-components';

import Arrow from './Arrow';

const iconStyles = props => css`
  width: ${props.width || '100%'};
  height: ${props.height || '100%'};
  color: ${props.color};
  margin: ${props.margin || '0 0 0 0'};
`;

const iconMap = {
  arrow: Arrow,
};

const styledIconMap = Object.keys(iconMap).reduce((accum, curr) => {
  const IconSvg = iconMap[curr];

  if (!IconSvg) {
    throw new Error(`Icon ${curr} not found`);
  }

  // eslint-disable-next-line no-param-reassign
  accum[curr] = styled(IconSvg)(iconStyles);
  return accum;
}, {});

const Icon = ({ color, fill, theme, ...props }) => {
  if (!iconMap[props.icon]) {
    // eslint-disable-next-line no-console
    console.warn(`<Icon /> called with invalid icon prop "${props.icon}"`);
    return null;
  }
  const StyledIcon = styledIconMap[props.icon];

  return (
    <StyledIcon
      {...props}
      color={theme.colors[color] || color || fill || 'currentColor'}
    />
  );
};

export default withTheme(Icon);
