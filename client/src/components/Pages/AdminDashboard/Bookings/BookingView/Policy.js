import React from 'react';

import * as S from './style';
import { PBold, PXS } from '../../../../Common/Typography';

import Icon from '../../../../Common/Icon';

const Policy = () => (
  <S.PolicyContainer>
    <S.IconWrapper>
      <Icon icon="explanationMarkCircle" width="40px" height="40px" />
    </S.IconWrapper>
    <S.PolicyContent>
      <PBold color="gray">
        Remember to check with PressPad internal policy on what makes a booking
        legitimate or illegitimate. Examples include:
      </PBold>
      <S.List>
        <S.ListItem>
          <PXS>
            - Example one. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor
          </PXS>
        </S.ListItem>
        <S.ListItem>
          <PXS>
            - Example one. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor
          </PXS>
        </S.ListItem>
        <S.ListItem>
          <PXS>
            - Example one. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor
          </PXS>
        </S.ListItem>
        <S.ListItem>
          <PXS>
            - Example one. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor
          </PXS>
        </S.ListItem>
      </S.List>
    </S.PolicyContent>
  </S.PolicyContainer>
);
export default Policy;
