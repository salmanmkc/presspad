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
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100vh',
    }}
  >
    <div>
      <S.TitleWrapper>
        <S.TitleContainer>
          <Title topTitle={topTitle} topColor="blue" bottomTitle={bottomTitle}>
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

    <div style={{ marginBottom: 50 }}>
      <ProgressBar
        number={number}
        current={current}
        color="pink"
        handleClick={handleClick}
      />
    </div>
  </div>
);

export default withTheme(Welcome);
