import React from 'react';
import * as S from './style';
import * as T from '../Typography';
import Icon from '../Icon';

import { Row, Col } from '../Grid';

import { SOCIAL } from '../../../constants/externalLinks';

const Community = () => (
  <S.Wrapper style={{ paddingBottom: '30px' }}>
    <Row mb={4}>
      <Col w={[4, 12, 12]} style={{ display: 'flex' }}>
        <S.Title>Join the PressPad Community!</S.Title>
        <S.HeartWrapper right="20px" bottom="20px" top>
          <Icon icon="hearts" width="85px" height="auto" color="pink" />
        </S.HeartWrapper>
      </Col>
    </Row>
    <Row mb={4}>
      <Col w={[4, 12, 12]}>
        <T.PXS>
          We&apos;d love for you to join the conversation on our social media:
        </T.PXS>
      </Col>
    </Row>
    <Row>
      <Col w={[4, 12, 12]}>
        {Object.entries(SOCIAL).map(link => (
          <S.SocialLink href={link[1]} target="_blank">
            <Icon icon={link[0]} width="40px" height="40px" />{' '}
          </S.SocialLink>
        ))}
      </Col>
    </Row>
    <S.HeartWrapper right="20px" bottom="20px">
      <Icon
        icon="hearts"
        width="85px"
        height="auto"
        color="pink"
        margin="0 0 0 15px"
      />
    </S.HeartWrapper>
  </S.Wrapper>
);

export default Community;
