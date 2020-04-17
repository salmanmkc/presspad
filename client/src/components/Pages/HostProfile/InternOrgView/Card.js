import React from 'react';

import { Card, InfoCard } from '../Profile.style';
import * as T from '../../../Common/Typography';

export default ({ type, mobile, side, headline, text }) =>
  type === 'about' ? (
    <Card left={side === 'left'} right={side === 'right'}>
      <InfoCard>
        {mobile ? (
          <>
            <T.PBold>{headline}</T.PBold>
            <T.PS>{text}</T.PS>
          </>
        ) : (
          <>
            <T.H3>{headline}</T.H3>
            <T.P>{text}</T.P>
          </>
        )}
      </InfoCard>
    </Card>
  ) : (
    <Card left={side === 'left'} right={side === 'right'}>
      <InfoCard>
        {mobile ? (
          <>
            <T.PBold>{headline}</T.PBold>
            <T.PS>{text}</T.PS>
          </>
        ) : (
          <>
            <T.H4>{headline}</T.H4>
            <T.PS>{text}</T.PS>
          </>
        )}
      </InfoCard>
    </Card>
  );
