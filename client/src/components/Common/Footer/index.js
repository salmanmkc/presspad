import React from 'react';

import * as S from './Footer.style';
import * as T from '../Typography';
import Icon from '../Icon';
import { Col } from '../Grid';

import {
  TERMS_CONDITIONS,
  COOKIE_POLICY,
  PRIVACY_POLICY,
  SOCIAL,
} from '../../../constants/externalLinks';

const Footer = () => (
  <S.Wrapper>
    <Col
      w={[2, 8, 8]}
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <T.Link
        color="white"
        isExternal
        style={{ textDecoration: 'underline' }}
        to={TERMS_CONDITIONS}
        mb={1}
      >
        Terms of use
      </T.Link>
      <T.Link
        color="white"
        isExternal
        style={{ textDecoration: 'underline' }}
        to={COOKIE_POLICY}
        mb={1}
      >
        Cookie policy
      </T.Link>
      <T.Link
        color="white"
        isExternal
        style={{ textDecoration: 'underline' }}
        to={PRIVACY_POLICY}
      >
        Privacy policy
      </T.Link>
    </Col>
    <Col w={[2, 4, 4]} style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {Object.entries(SOCIAL).map(link => (
        <S.SocialLink href={link[1]} target="_blank">
          <Icon icon={link[0]} color="white" />{' '}
        </S.SocialLink>
      ))}
    </Col>
  </S.Wrapper>
);

export default Footer;
