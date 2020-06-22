// config file for the antd table "PaymentsTable"
import React from 'react';
import { Button, Popconfirm, Tooltip } from 'antd';
import Highlighter from 'react-highlight-words';

import Icon from '../../Common/Icon';

import { colors } from '../../../theme';
import { formatPrice } from '../../../helpers';

const CheckBoxJsx = ({ paymentStatus }) => {
  switch (paymentStatus) {
    case 'transfered':
      return (
        <Icon
          icon="circleTick"
          width="20px"
          height="20px"
          color={colors.blue}
        />
      );
    case 'cancelled':
      return (
        <Icon
          icon="crossCircle"
          width="20px"
          height="20px"
          color={colors.pink}
        />
      );
    case 'rejected':
      return (
        <Icon icon="stop" width="20px" height="20px" color={colors.pink} />
      );
    default:
      return <Icon icon="cross" width="20px" color="grey" height="20px" />;
  }
};

/**
 * @param {Array} array the array of withdraw requests receied in the axios api call.
 * @return {Array} returns array of datasource objects to populate the antd table.
 */
const createDataSource = array =>
  array.map(item => {
    const dataItem = {
      key: item._id,
      host: item.user.name,
      amount: item.amount.toString(),
      paid: <CheckBoxJsx key={item._id} paymentStatus={item.status} />,
      bank: item.bankName,
      account: item.accountNumber,
      sortCode: item.bankSortCode,
    };
    return dataItem;
  });

const columns = (highlightVal, handleClick) => [
  {
    title: 'Host',
    dataIndex: 'host',
    key: 'host',
    className: 'mainCol',
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: colors.yellow, padding: 0 }}
        searchWords={[highlightVal]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: colors.yellow, padding: 0 }}
        searchWords={[highlightVal]}
        autoEscape
        textToHighlight={formatPrice(text)}
      />
    ),
  },
  {
    title: 'Paid',
    dataIndex: 'paid',
    key: 'paid',
  },
  {
    title: 'Bank Name',
    dataIndex: 'bank',
    key: 'bank',
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: colors.yellow, padding: 0 }}
        searchWords={[highlightVal]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  },
  {
    title: 'Account Number',
    dataIndex: 'account',
    key: 'account',
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: colors.yellow, padding: 0 }}
        searchWords={[highlightVal]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  },
  {
    title: 'Sort Code',
    dataIndex: 'sortCode',
    key: 'sortCode',
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: colors.yellow, padding: 0 }}
        searchWords={[highlightVal]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  },
  {
    dataIndex: 'key',
    render: (id, record) => {
      if (record.paid.props.paymentStatus !== 'pending') return null;
      return (
        <>
          <Popconfirm
            title={`Confirm transfer request to ${record.host}`}
            onConfirm={() => handleClick(id, 'transfered')}
          >
            <Tooltip placement="top" title="Transfered">
              <Button type="primary" ghost style={{ marginRight: '0.6rem' }}>
                <Icon icon="tick" width="20px" height="20px" />
              </Button>
            </Tooltip>
          </Popconfirm>
          <Popconfirm
            title={`Cancel transfer request to ${record.host}`}
            onConfirm={() => handleClick(id, 'cancelled')}
          >
            <Tooltip placement="top" title="Cancel">
              <Button type="danger" ghost>
                <Icon icon="cross" width="20px" height="20px" />
              </Button>
            </Tooltip>
          </Popconfirm>
        </>
      );
    },
  },
];

export { columns, createDataSource };
