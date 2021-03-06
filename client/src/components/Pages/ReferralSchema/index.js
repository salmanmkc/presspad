import React from 'react';
import { TABLET_WIDTH } from '../../../constants/screenWidths';
import * as T from '../../Common/Typography';
import { SIGNUP_HOST } from '../../../constants/navRoutes';

import * as S from './style';
import referralImage from '../../../assets/referral.png';
import SocialShare from './SocialShare';

import LinkCopy from '../../Common/LinkCopy';

function ReferralSchema({ windowWidth, referralToken }) {
  const isMobile = windowWidth < TABLET_WIDTH;

  const TitleComponent = isMobile ? T.H3 : T.H2;

  const link = `${window.location.origin}${SIGNUP_HOST}/?referral=${referralToken}`;

  return (
    <S.Wrapper>
      <S.Content>
        <TitleComponent color="blue" mb={5} mbT={4}>
          Spread the word
        </TitleComponent>
        <T.H5 color="blue" mb={3}>
          Refer other hosts with a unique invite link
        </T.H5>

        <LinkCopy strToCopy={link} />

        <T.H5 mt={4} mb={5} color="blue">
          Successfully refer 5 hosts to become celebrated as a PressPad
          Ambassador
        </T.H5>
        <SocialShare shareLink={link} />
        <T.P mb={4} mt={3} color="gray3">
          PressPad&apos;s referral scheme allows us to keep our host-mentor
          matches even safer, as we call upon pre-existing, already vetted,
          hosts to suggest others within the media community who they think
          might like to become PressPad hosts.
        </T.P>
        <T.P mb={4} color="gray3">
          All hosts are strongly encouraged to put forward the names and emails
          of 5 others so we can contact them and tell them more about what
          host-mentorship involves. The more hosts on our platform, the more
          aspiring journalists we can help.
        </T.P>
        <T.P mb={4} color="gray3">
          Referred hosts will receive an extra badge on their profile indicating
          that they are community-approved. Hosts who refer others will also get
          a badge celebrating them as a PressPad Ambassador.
        </T.P>
        <T.P mb={4} color="gray3">
          All hosts, regardless of whether they were referred, undergo rigorous
          vetting and safeguarding checks which involve DBS checks (paid for by
          PressPad), character references, proof of your involvement in the
          media industry and property checks.
        </T.P>
      </S.Content>

      <S.SideDiv />
      <S.Image src={referralImage} />
    </S.Wrapper>
  );
}

export default ReferralSchema;
