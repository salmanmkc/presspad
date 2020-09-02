import React from 'react';

import * as T from '../../Common/Typography';
import * as S from './style';

import Icon from '../../Common/Icon';

const HostSteps = ({ position }) => (
  <>
    <S.ColouredSideDiv position={position}>
      <S.BlueDiv>
        <S.Title>Get started in 4 steps</S.Title>
        <S.Row>
          <Icon icon="user2" width="30px" height="30px" color="white" />
          <T.PLBold color="white" ml={2} mr={1}>
            01
          </T.PLBold>
          <T.P color="white">About Me</T.P>
        </S.Row>
        <S.Line />

        <S.Row>
          <Icon icon="artboard" width="30px" height="30px" color="white" />
          <T.PLBold color="white" ml={2} mr={1}>
            02
          </T.PLBold>
          <T.P color="white">Create listing</T.P>
        </S.Row>
        <S.Line />

        <S.Row>
          <Icon icon="verified" width="30px" height="30px" color="white" />
          <T.PLBold color="white" ml={2} mr={1}>
            03
          </T.PLBold>
          <T.P color="white">Get verified</T.P>
        </S.Row>
        <S.Line />
        <S.Row>
          <Icon icon="tick" width="20px" height="20px" color="white" />
          <T.PLBold color="white" ml={2} mr={1}>
            04
          </T.PLBold>
          <T.P color="white">Confirmation and listing live!</T.P>
        </S.Row>
      </S.BlueDiv>

      <S.DarkBlueDiv>
        <S.Title>Things you’ll need</S.Title>
        <S.Row
          marginBottom
          style={{
            alignItems: 'flex-start',
          }}
        >
          <Icon icon="tick" width="20px" height="20px" color="white" />
          <T.P color="white" ml={2}>
            DBS number
            <br /> (Psst...don&apos;t worry if you don&apos;t know what this
            is...we&apos;ll help you)
          </T.P>
        </S.Row>
        <S.Row marginBottom>
          <Icon icon="tick" width="20px" height="20px" color="white" />
          <T.P color="white" ml={2}>
            Photo of yourself
          </T.P>
        </S.Row>
        <S.Row marginBottom>
          <Icon icon="tick" width="20px" height="20px" color="white" />
          <T.P color="white" ml={2}>
            Two referees and their emails
          </T.P>
        </S.Row>
        <S.Row marginBottom>
          <Icon icon="tick" width="20px" height="20px" color="white" />
          <T.P color="white" ml={2} mt={5}>
            Photos of your home
          </T.P>
        </S.Row>

        <S.Row
          marginBottom
          style={{
            alignItems: 'flex-start',
          }}
        >
          <Icon icon="tick" width="20px" height="20px" color="white" />
          <T.P color="white" ml={2}>
            Proof of identity
            <br /> Proof you work in the media (i.e. press card or letter from
            an editor)
          </T.P>
        </S.Row>

        <S.Row marginBottom>
          <Icon icon="tick" width="20px" height="20px" color="white" />
          <T.P color="white" ml={2}>
            Proof of address
          </T.P>
        </S.Row>
      </S.DarkBlueDiv>
    </S.ColouredSideDiv>
  </>
);

export default HostSteps;
