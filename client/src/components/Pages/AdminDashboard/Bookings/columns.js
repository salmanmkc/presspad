import React from 'react';
import moment from 'moment';
import { Tag } from 'antd';

import Highlighter from 'react-highlight-words';
import { PXS, PS } from '../../../Common/Typography';
import { colors } from '../../../../theme';
import * as S from '../AdminDashboard.style';
import { tidyStatusTextAdmin } from '../../../../helpers/tidyStatusText';

//  set colours for tags in the table
const tagColors = {
  'awaiting admin': colors.pink,
  'awaiting cancellation': colors.pink,
  pending: colors.darkGray,
  accepted: colors.lightBlue,
  confirmed: colors.yellow,
  rejected: colors.pink,
  'rejected by admin': colors.black,
  cancelled: colors.gray,
  completed: colors.blue,
};

const columns = (
  getColumnSearchProps,
  highlightVal,
  triggerHostView,
  triggerInternView,
  renderActions,
  lengthOfStay,
) => [
  {
    title: 'Intern',
    dataIndex: 'intern',
    key: 'intern',
    className: 'nameCol',
    ...getColumnSearchProps('intern'),
    sorter: (a, b) => a.intern.name.localeCompare(b.intern.name),
    render: (text, record) => (
      <span
        style={{ cursor: 'pointer' }}
        onClick={triggerInternView.bind(null, record.intern._id)}
        role="button"
        tabIndex={0}
      >
        <Highlighter
          highlightStyle={{
            backgroundColor: colors.yellow,
            padding: 0,
          }}
          searchWords={[highlightVal]}
          autoEscape
          textToHighlight={record.intern.name}
        />
      </span>
    ),
  },
  {
    title: 'Host',
    dataIndex: 'host',
    key: 'host',
    className: 'nameCol',
    ...getColumnSearchProps('host'),
    sorter: (a, b) => (a.host.name || '').localeCompare(b.host.name || ''),
    render: (text, record) => (
      <span
        style={{ cursor: 'pointer' }}
        onClick={triggerHostView.bind(
          null,
          record.host._id,
          record.host.name,
          record.host.email,
        )}
        role="button"
        tabIndex={0}
      >
        <Highlighter
          highlightStyle={{ backgroundColor: colors.yellow, padding: 0 }}
          searchWords={[highlightVal]}
          autoEscape
          textToHighlight={record.host.name}
        />
      </span>
    ),
  },
  {
    title: 'Start Date of Stay',
    dataIndex: 'startDate',
    key: 'startDate',
    ...getColumnSearchProps('startDate'),
    sorter: (a, b) =>
      moment(a.startDate || 0).valueOf() - moment(b.startDate || 0).valueOf(),
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: colors.yellow, padding: 0 }}
        searchWords={[highlightVal]}
        autoEscape
        textToHighlight={moment(text).format('DD/MM/YYYY')}
      />
    ),
  },
  {
    title: 'Length of Stay',
    dataIndex: 'lengthOfStay',
    key: 'lengthOfStay',
    ...getColumnSearchProps('lengthOfStay'),
    sorter: (a, b) =>
      lengthOfStay(a.startDate, a.endDate) -
      lengthOfStay(b.startDate, b.endDate),
    //   sorter: (a, b) =>
    //     moment(a.startDate || 0).valueOf() - moment(b.startDate || 0).valueOf(),
    render: (text, record) => (
      // <Highlighter
      //   highlightStyle={{ backgroundColor: colors.yellow, padding: 0 }}
      //   searchWords={[highlightVal]}
      //   autoEscape
      //   textToHighlight={moment(text).format('DD/MM/YYYY')}
      // />
      <>{lengthOfStay(record.startDate, record.endDate)} days</>
    ),
  },
  {
    title: 'Paid by Organisation',
    dataIndex: 'coupon',
    key: 'coupon',
    ...getColumnSearchProps('coupon'),
    render: coupon =>
      coupon ? (
        <S.Discount>
          <PS>{coupon.discountRate}%</PS>
          <PXS>{coupon.Organisation}</PXS>
        </S.Discount>
      ) : (
        <div>N/A</div>
      ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    ...getColumnSearchProps('status'),
    render: status => (
      <Tag color={tagColors[status]} key={status}>
        <Highlighter
          highlightStyle={{ backgroundColor: colors.yellow, padding: 0 }}
          searchWords={[highlightVal]}
          autoEscape
          textToHighlight={
            status ? tidyStatusTextAdmin(status).toUpperCase() : ''
          }
        />
      </Tag>
    ),
    filters: [
      {
        text: 'pending',
        value: 'pending',
      },
      {
        text: 'accepted',
        value: 'accepted',
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
  },
  {
    title: 'Actions',
    dataIndex: 'action',
    key: 'actions',
    render: (text, record) => renderActions(record.status, record),
  },
];

export default columns;
