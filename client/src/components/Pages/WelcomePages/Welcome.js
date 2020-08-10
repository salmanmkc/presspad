import React from 'react';
import { withTheme } from 'styled-components';
import Title from '../../Common/Title';
import ProgressBar from '../../Common/ProgressBar';
import * as S from './styled';
import * as T from '../../Common/Typography';
import { Row, Col } from '../../Common/Grid';

const Welcome = ({
  title,
  topTitle,
  bottomTitle,
  subTitle,
  content,
  number,
  current,
  handleClick,
}) => (
  <S.PageWrapper>
    <div>
      <S.TitleWrapper>
        <S.TitleContainer>
          <Title topTitle={topTitle} bottomTitle={bottomTitle} caps>
            {title}
          </Title>
        </S.TitleContainer>
      </S.TitleWrapper>
      <Row>
        <Col w={[4, 12, 10]}>
          <S.SubTitleContainer>
            <T.H5 color="pink"> {subTitle}</T.H5>
          </S.SubTitleContainer>
          <S.ContentContainer>
            <T.P>{content}</T.P>
          </S.ContentContainer>
        </Col>
      </Row>
    </div>

    <ProgressBar
      number={number}
      current={current}
      color="pink"
      handleClick={handleClick}
    />
  </S.PageWrapper>
);

export default withTheme(Welcome);
