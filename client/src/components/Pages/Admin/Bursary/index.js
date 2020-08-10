import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col } from '../../../Common/Grid';
import * as T from '../../../Common/Typography';
import { DatePicker } from '../../../Common/Inputs';
import ButtonNew from '../../../Common/ButtonNew';
import Tabs from '../../../Common/Tabs';
import { Requests, PreApproved, Approved, History } from './Tables/index';

import {
  ADMIN_BURSARY_APPROVE,
  ADMIN_BURSARY_REJECT,
  ADMIN_BURSARY_PREAPPROVE,
} from '../../../../constants/navRoutes';

const tabs = ['requests', 'pre-approved', 'approved', 'history'];

const AdminBursary = () => {
  const [multiDateRange, setMultiDateRange] = useState([
    {
      startDate: '',
      endDate: '',
    },
  ]);

  const [selected, setSelected] = useState(0);

  const history = useHistory();

  const onRangeChange = (date, type, index) => {
    const updatedDates = multiDateRange.map((dateObj, i) => {
      if (i === index) {
        return { ...dateObj, [type]: date };
      }
      return dateObj;
    });

    setMultiDateRange(updatedDates);
  };

  const handleDelete = index => {
    const updatedDates = multiDateRange.filter((dateObj, i) => index !== i);
    setMultiDateRange(updatedDates);
  };

  const handleAdd = () => {
    setMultiDateRange([
      ...multiDateRange,
      {
        startDate: '',
        endDate: '',
      },
    ]);
  };

  const updateDates = () =>
    console.log('api call to update the application window dates');

  const handleTab = e => {
    setSelected(e);
  };

  const sendToResponse = (responseType, rowData) => {
    switch (responseType) {
      case 'Approve':
        return history.push(ADMIN_BURSARY_APPROVE.replace(':id', rowData.id));
      case 'Reject':
        return history.push(ADMIN_BURSARY_REJECT.replace(':id', rowData.id));
      case 'Pre-approve':
        return history.push(
          ADMIN_BURSARY_PREAPPROVE.replace(':id', rowData.id),
        );
      default:
        return null;
    }
  };

  const renderTable = () => {
    switch (selected) {
      case 0:
        return <Requests sendToResponse={sendToResponse} />;
      case 1:
        return <PreApproved sendToResponse={sendToResponse} />;
      case 2:
        return <Approved />;
      case 3:
        return <History />;
      default:
        return null;
    }
  };

  return (
    <>
      <Row mb={5}>
        <Col w={[4, 8, 8]}>
          <T.H2 color="primary">Bursary</T.H2>
        </Col>
      </Row>
      <Row mb={8}>
        <Col w={[4, 12, 8]}>
          <T.H4C color="black" mb={4}>
            Application Windows
          </T.H4C>
          {multiDateRange.map((date, index) => (
            <DatePicker
              onChange={onRangeChange}
              type="dateRange"
              multi
              index={index}
              handleDelete={handleDelete}
              handleAdd={handleAdd}
              arrayLength={multiDateRange.length}
              mb={1}
              value={multiDateRange[index]}
            />
          ))}
          <ButtonNew
            small
            type="tertiary"
            style={{ width: '145px' }}
            mt={4}
            onClick={updateDates}
          >
            Update dates
          </ButtonNew>
        </Col>
      </Row>
      <Row mb={4}>
        <Col w={[4, 12, 12]}>
          <Tabs items={tabs} caps handleClick={handleTab} selected={selected} />
        </Col>
      </Row>
      <Row mb={4}>
        <Col w={[4, 12, 12]}>{renderTable()}</Col>
      </Row>
    </>
  );
};

export default AdminBursary;
