import React from 'react';
import Title from '../../Common/Title';
import * as S from './style';
import * as T from '../../Common/Typography';

const Success = () => (
  <S.SuccessWrapper>
    <S.TitleContainer>
      <Title>Welcome to the PressPad Movement!</Title>
    </S.TitleContainer>
    <T.PLBold color="pink" mt={4}>
      That’s it! You’ve successfully signed up.
    </T.PLBold>
    <T.P color="gray3" mt={2}>
      As soon as our team has approved your account you’ll be ready to book your
      first host and prepare for your stay! It’s an exciting and maybe
      nerve-wracking time but don’t worry, we’ve got your back. And not just
      when it comes to finding a place to stay, we’ve got tonnes of advice and
      support available too.
    </T.P>
  </S.SuccessWrapper>
);

export default Success;
