import React from 'react';

import * as T from '../../Common/Typography';
import * as S from './style';

import Icon from '../../Common/Icon';

const OrganisationSteps = ({ position }) => (
  <>
    <S.ColouredSideDiv position={position} color="blue">
      <S.BlueDiv>
        <S.Title>Get started in 3 steps</S.Title>
        <S.Row>
          <Icon icon="user2" width="30px" height="30px" color="white" />
          <T.PLBold color="white" ml={2} mr={1}>
            01
          </T.PLBold>
          <T.P color="white">Set up account</T.P>
        </S.Row>
        <S.Line />

        <S.Row>
          <Icon icon="artboard" width="30px" height="30px" color="white" />
          <T.PLBold color="white" ml={2} mr={1}>
            02
          </T.PLBold>
          <T.P color="white">Create a profile</T.P>
        </S.Row>
        <S.Line />

        <S.Row>
          <Icon icon="money" width="30px" height="30px" color="white" />
          <T.PLBold color="white" ml={2} mr={1}>
            03
          </T.PLBold>
          <T.P color="white">Add funds</T.P>
        </S.Row>
      </S.BlueDiv>
    </S.ColouredSideDiv>
  </>
);

export default OrganisationSteps;
