import React from 'react';
import { Input, Button } from 'antd';
import moment from 'moment';

import {
  Wrapper,
  ContactWrapper,
  CopyRightsWrapper,
  SocialMediaIconsWrapper,
  NewsLetter,
  Title,
  IconWrapper,
  IconsWrapper,
} from './Footer.style';
import Icon from '../Icon';

const Footer = () => (
  <Wrapper>
    <ContactWrapper>
      <NewsLetter>
        <Title>Join our newsletter</Title>
        <div>
          <Input
            style={{ width: '245px', marginRight: '20px' }}
            size="large"
            placeholder="Enter your email address"
            disabled
          />
          <Button
            type="primary"
            ghost
            block={false}
            size="large"
            style={{ borderRadius: '0', cursor: 'not-allowed' }}
          >
            Subscribe
          </Button>
        </div>
      </NewsLetter>
      <SocialMediaIconsWrapper>
        <Title>Get in touch</Title>

        <IconsWrapper>
          <IconWrapper>
            <a href="https://twitter.com">
              <Icon icon="twitter" />
            </a>
          </IconWrapper>
          <IconWrapper>
            <a href="https://facebook.com">
              <Icon icon="facebook" />
            </a>
          </IconWrapper>
          <IconWrapper>
            <a href="https://instagram.com">
              <Icon icon="instagram" />
            </a>
          </IconWrapper>
          <IconWrapper>
            <a href="https://linkedin.com">
              <Icon icon="linkedin" />
            </a>
          </IconWrapper>
          <IconWrapper>
            <a href="https://youtube.com">
              <Icon icon="youtube" />
            </a>
          </IconWrapper>
        </IconsWrapper>
      </SocialMediaIconsWrapper>
    </ContactWrapper>
    <CopyRightsWrapper>
      Copyright © {moment().year()} PressPad
    </CopyRightsWrapper>
  </Wrapper>
);

export default Footer;
