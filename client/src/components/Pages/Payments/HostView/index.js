import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Collapse } from 'antd';

import WalletBox from './WalletBox';
import InfoBox from './InfoBox';

import * as T from '../../../Common/Typography';
import Icon from '../../../Common/Icon';

import * as S from './style';

import { API_PAYMENTS_URL } from '../../../../constants/apiRoutes';

const { Panel } = Collapse;

const HostPayments = () => {
  const [paymentCollapse, setPaymentCollapse] = useState(false);
  const [withdrawalCollapse, setWithdrawalCollapse] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await axios.get(API_PAYMENTS_URL);
      console.log(data.data);
    }
    fetchData();
  }, []);

  return (
    <S.Wrapper>
      <T.H2C>your payments</T.H2C>
      <T.PS mt={4}>
        This is where you can view all payments received and due through your
        PressPad hosting. You can also decide whether to withdraw your earnings
        or donate to PressPad to help continue our work.
      </T.PS>
      <T.PS mt={6}>
        Please remember that payments for a booking will only be available to
        withdraw once that booking is complete.
      </T.PS>
      <S.CardsWrapper>
        <WalletBox />
        <InfoBox />
      </S.CardsWrapper>
      <S.CollapseWrapper
        bordered={false}
        onChange={key => {
          setPaymentCollapse(!!key[0]);
        }}
      >
        <Panel
          forceRender
          header={
            <T.H4C>
              PAYMENT HISTORY{' '}
              <Icon
                icon="arrow"
                direction={paymentCollapse ? 'up' : 'down'}
                width={24}
                customStyle={{ verticalAlign: 'middle' }}
              />
            </T.H4C>
          }
          key="1"
          showArrow={false}
        >
          <div>some WITHDRAWAL REQUESTS table</div>
        </Panel>
      </S.CollapseWrapper>
    </S.Wrapper>
  );
};

export default HostPayments;
