import React, { useState } from 'react';
import { withTheme } from 'styled-components';
import * as S from './styled';
import Button from '../ButtonNew';
import { Col, Row } from '../Grid';

const ProgressBar = withTheme(
  ({
    theme,
    number,
    current: initialCurrent,
    color,
    handleClick,
    margin,
    endFunc,
  }) => {
    const [current, setCurrent] = useState(initialCurrent || 0);
    if (current === number) {
      // should direct the user to the correct path after get start section
      if (endFunc && typeof endFunc === 'function') {
        endFunc();
      } else {
        setCurrent(0);
      }
    }
    return (
      <Row>
        <Col w={[4, 6, 6]}>
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
        <Col w={[4, 4, 4]}>
          <Button
            type="secondary"
            onClick={() => {
              handleClick();
              setCurrent(old => old + 1);
            }}
          >
            asd
          </Button>
        </Col>
      </Row>
    );
  },
);

export default ProgressBar;
