import React from 'react';
import Icon from '../Icon';

import { Bar, Wrapper } from './ProgressBar.style';
/**
 * Progress Bar appear at the bottom of a component.
 * @param {component} children The component that should be wrapped with the progressBar.
 * @param {number} progress The presentage of the progress bar.
 */

const ProgressBar = ({ children, progress = 0, height, style, showCheck }) => (
  <Wrapper height={height} style={style}>
    {progress === 100 && showCheck && (
      <Icon
        icon="circleTick"
        style={{
          color: 'green',
          fontSize: '18px',
          position: 'absolute',
          zIndex: 1,
          top: '7px',
          right: '7px',
        }}
      />
    )}
    {children}
    <Bar progress={progress} />
  </Wrapper>
);

export default ProgressBar;
