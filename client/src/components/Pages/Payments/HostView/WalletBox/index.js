import React, { useState } from 'react';
import { Card, Popover } from 'antd';

import * as T from '../../../../Common/Typography';
import Button from '../../../../Common/ButtonNew';
import Icon from '../../../../Common/Icon';

import { formatPrice } from '../../../../../helpers';

import WithdrawDonateModal from '../WithdrawDonateModal';
import * as S from './style';

const WalletBox = ({
  currentBalance,
  pendingPayments,
  pendingWithdrawn,
  fetchData,
}) => {
  const [openModal, setOpenModal] = useState('');
  const accessibleFunds = currentBalance - pendingPayments - pendingWithdrawn;

  const handleCloseModals = () => {
    setOpenModal('');
  };

  return (
    <>
      <WithdrawDonateModal
        openModal={openModal}
        handleCloseModals={handleCloseModals}
        currentBalance={currentBalance}
        pendingPayments={pendingPayments}
        pendingWithdrawn={pendingWithdrawn}
        fetchData={fetchData}
      />
      <Card
        hoverable
        style={{ width: 504, height: 298, cursor: 'default', borderRadius: 0 }}
        bodyStyle={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <div>
          <T.H4C mt={2}>my current wallet</T.H4C>
          <S.BallanceWrapper>
            <T.PBold>Current balance: </T.PBold>
            <T.H3C color="blue">{formatPrice(accessibleFunds)}</T.H3C>
          </S.BallanceWrapper>
          <T.PSBold mt={1} color="gray">
            Pending: {formatPrice(pendingPayments + pendingWithdrawn)}
          </T.PSBold>
          <S.ButtonsWrapper>
            <Button
              type="primary"
              onClick={() => setOpenModal('donate')}
              disabled={accessibleFunds <= 0}
            >
              donate
            </Button>
            <Button
              type="primary"
              outline
              onClick={() => setOpenModal('withdraw')}
              disabled={accessibleFunds <= 0}
            >
              withdraw
            </Button>
          </S.ButtonsWrapper>
          <Popover
            content="Dummy content for now ..."
            title="Info"
            trigger="click"
          >
            <T.PXS mt={1} style={{ cursor: 'help' }}>
              ? what is this ?
            </T.PXS>
          </Popover>
        </div>
        <Icon icon="moneyBag" width={120} className="money-bag" />
      </Card>
    </>
  );
};

export default WalletBox;
