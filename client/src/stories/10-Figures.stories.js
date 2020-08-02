import React from 'react';
import Figure from '../components/Common/Figure';

export default {
  title: 'Figures',
};

export const FigureComponent = () => (
  <div
    style={{
      display: 'flex',
      width: 500,
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Figure stats="442" title="interns" />
  </div>
);
