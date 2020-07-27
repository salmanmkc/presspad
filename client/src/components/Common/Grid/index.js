import React from 'react';

import * as S from './style';

const Col = ({ w = [], children, ...props }) => (
  <S.Col c1={w[0]} c2={w[1]} c3={w[2]} {...props}>
    {children}
  </S.Col>
);

const Row = ({ jc, jcT, jcM, children, inner, ...props }) => (
  <div>
    <S.Row jc={jc} jcT={jcT} jcM={jcM} inner={inner} {...props}>
      {children}
    </S.Row>
  </div>
);

export { Row, Col };
