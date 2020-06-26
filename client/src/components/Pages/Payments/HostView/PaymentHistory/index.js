import React from 'react';
import moment from 'moment';
import { Table } from 'antd';

import PaymentStatus from './PaymentStatus';
import { formatPrice } from '../../../../../helpers';
import { BOOKING_VIEW_URL } from '../../../../../constants/navRoutes';
import * as T from '../../../../Common/Typography';
import * as S from './style';

const PaymentsHistoryTable = ({ paymentHistory }) => {
  const columns = [
    {
      title: () => <T.H7C color="gray">Dates</T.H7C>,
      key: 'startDate',
      render: (text, record) => (
        <S.DateWrapper>
          <T.PSBold color="darkerGray">
            {moment(record.startDate).format('DD MMM')}
          </T.PSBold>
          <span> - </span>
          <T.PSBold color="darkerGray">
            {moment(record.endDate).format('DD MMM')}
          </T.PSBold>
        </S.DateWrapper>
      ),
    },
    {
      title: () => <T.H7C color="gray">intern</T.H7C>,
      dataIndex: 'intern',
      key: 'intern',
      render: text => <T.PS>{text}</T.PS>,
    },
    {
      title: () => <T.H7C color="gray">earning</T.H7C>,
      render: (text, record) => {
        const {
          hostInstallmentsRatioAmount,
          hostcouponTransactionsRatioAmount,
        } = record;
        return (
          <T.PS>
            £
            {formatPrice(
              hostcouponTransactionsRatioAmount + hostInstallmentsRatioAmount,
              2,
            )}
          </T.PS>
        );
      },
    },
    {
      title: 'status',
      render: (text, record) => <PaymentStatus status={record.paymentStatus} />,
    },
    {
      render: record => (
        <S.Link to={BOOKING_VIEW_URL.replace(':id', record.bookingId)}>
          View booking &rarr;
        </S.Link>
      ),
    },
  ];

  return (
    <S.TableWrapper>
      <Table dataSource={paymentHistory} columns={columns} loading={false} />
    </S.TableWrapper>
  );
};
export default PaymentsHistoryTable;
