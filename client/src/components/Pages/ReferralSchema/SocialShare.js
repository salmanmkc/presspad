import React from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

import Icon from '../../Common/Icon';
import * as S from './style';

const SocialShare = ({ shareLink, jc, jcT, jcM, ...props }) => {
  const url =
    shareLink || (typeof window !== `undefined` && window.location.href);
  return (
    <>
      <S.Container jc={jc} jcT={jcT} jcM={jcM} {...props}>
        <S.ShareWrapper>
          <TwitterShareButton url={url}>
            <Icon icon="twitter" height="32px" width="32px" color="lightBlue" />
          </TwitterShareButton>
        </S.ShareWrapper>
        <S.ShareWrapper>
          <FacebookShareButton url={url}>
            <Icon
              icon="facebook"
              height="32px"
              width="32px"
              color="lightBlue"
            />
          </FacebookShareButton>
        </S.ShareWrapper>
        <S.ShareWrapper>
          <LinkedinShareButton url={url}>
            <Icon
              icon="linkedin"
              height="32px"
              width="32px"
              color="lightBlue"
            />
          </LinkedinShareButton>
        </S.ShareWrapper>
        <S.ShareWrapper>
          <WhatsappShareButton url={url}>
            <Icon
              icon="whatsapp"
              height="32px"
              width="32px"
              color="lightBlue"
            />
          </WhatsappShareButton>
        </S.ShareWrapper>
        <S.ShareWrapper>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={`mailto:?subject=&body=${url}`}
          >
            <Icon icon="email" height="32px" width="32px" />
          </a>
        </S.ShareWrapper>
      </S.Container>
    </>
  );
};

export default SocialShare;
