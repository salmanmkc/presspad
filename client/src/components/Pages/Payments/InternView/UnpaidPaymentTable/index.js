import React from 'react';
import moment from 'moment';
import { Table } from 'antd';

import PaymentStatus from '../PaymentStatus';
import { formatPrice } from '../../../../../helpers';

import Button from '../../../../Common/ButtonNew';
import * as T from '../../../../Common/Typography';
import * as S from './style';

const UnpaidPaymentTable = ({ installments, setPayNow }) => {
  const columns = [
    {
      title: () => <T.H7C color="gray">dates</T.H7C>,
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: text => (
        <T.PSBold color="darkerGray">
          {moment(text)
            .format('DD MMM')
            .toUpperCase()}
        </T.PSBold>
      ),
    },
    {
      title: () => <T.H7C color="gray">amount</T.H7C>,
      dataIndex: 'amount',
      key: 'amount',
      render: text => <T.PS>£{formatPrice(text, 2)}</T.PS>,
    },
    {
      title: () => <T.H7C color="gray">payment status</T.H7C>,
      render: (text, record) => <PaymentStatus dueDate={record.dueDate} />,
    },
    {
      title: () => <T.H7C color="gray">actions</T.H7C>,
      render: record => (
        <Button
          type="primary"
          onClick={() => setPayNow({ openModal: true, installment: record })}
        >
          pay
        </Button>
      ),
    },
  ];

  return (
    <S.TableWrapper>
      <Table dataSource={installments} columns={columns} pagination={false} />
    </S.TableWrapper>
  );
};
export default UnpaidPaymentTable;
