import React from 'react';
import { withTheme } from 'styled-components';
import Title from '../../Common/Title';
import ProgressBar from '../../Common/ProgressBar';
import * as S from './styled';
import * as T from '../../Common/Typography';

const Welcome = ({
  title,
  subTitle,
  content,
  number,
  current,
  handleClick,
  endFunc,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <S.TitleContainer>
      <Title>{title}</Title>
    </S.TitleContainer>
    <S.SubTitleContainer>
      <T.H5 color="pink"> {subTitle}</T.H5>
    </S.SubTitleContainer>
    <T.P>{content}</T.P>
    <div style={{ marginTop: 100 }}>
      <ProgressBar
        number={number}
        current={current}
        color="pink"
        handleClick={handleClick}
        endFunc={endFunc}
      />
    </div>
  </div>
);

export default withTheme(Welcome);
