import React, { useState } from 'react';
import { withTheme } from 'styled-components';
import * as S from './styled';
import Button from '../ButtonNew';
import { Col } from '../Grid';

const ProgressBar = withTheme(
  ({ theme, number, current: initialCurrent, color, handleClick, margin }) => {
    const [current, setCurrent] = useState(initialCurrent || 0);
    return (
      <S.Container>
        <Col w={[2, 6, 6]}>
          <S.Wrapper margin={margin}>
            {Array.from({ length: number }, (v, i) => (
              <S.Circle
                theme={theme}
                index={i}
                current={current}
                color={color}
                onClick={() => {
                  setCurrent(i);
                  handleClick(i + 1);
                }}
                clickable={handleClick}
              />
            ))}
          </S.Wrapper>
        </Col>
        <Col w={[2, 6, 6]}>
          <Button
            type="link"
            textColor="blue"
            onClick={() => {
              handleClick();
              setCurrent(current + 1);
            }}
          >
            NEXT
          </Button>
        </Col>
      </S.Container>
    );
  },
);

export default ProgressBar;
