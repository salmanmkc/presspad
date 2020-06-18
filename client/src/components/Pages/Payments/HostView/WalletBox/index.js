import React from 'react';
import { Card, Popover } from 'antd';

import * as T from '../../../../Common/Typography';
import Button from '../../../../Common/ButtonNew';
import Icon from '../../../../Common/Icon';

import * as S from './style';

const WalletBox = () => (
  <Card
    hoverable
    style={{ width: 504, height: 298, cursor: 'default', borderRadius: 0 }}
    bodyStyle={{ display: 'flex', justifyContent: 'space-between' }}
  >
    <div>
      <T.H4C mt={2}>my current wallet</T.H4C>
      <S.BallanceWrapper>
        <T.PBold>Current balance: </T.PBold>
        <T.H3C color="blue">£200</T.H3C>
      </S.BallanceWrapper>
      <T.PSBold mt={1} color="gray">
        Pending: £300
      </T.PSBold>
      <S.ButtonsWrapper>
        <Button type="primary" onClick={() => console.log('lll')}>
          donate
        </Button>
        <Button type="primary" outline onClick={() => console.log('lll')}>
          withdraw
        </Button>
      </S.ButtonsWrapper>
      <Popover content="Dummy content for now ..." title="Info" trigger="click">
        <T.PXS mt={1} style={{ cursor: 'help' }}>
          ? what is this ?
        </T.PXS>
      </Popover>
    </div>
    <Icon icon="moneyBag" width={120} className="money-bag" />
  </Card>
);

export default WalletBox;
