import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

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
import { API_BURSARY_WINDOWS } from '../../../../constants/apiRoutes';
import validationSchema from './validationSchema';

const { validate } = require('../../../../validation');

const tabs = ['requests', 'pre-approved', 'approved', 'history'];

const AdminBursary = () => {
  const [multiDateRange, setMultiDateRange] = useState([
    {
      startDate: '',
      endDate: '',
    },
  ]);

  const [selected, setSelected] = useState(0);
  const [fetchWindowsLoading, setFetchWindowsLoading] = useState(true);
  const [updateWindowsLoading, setUpdateWindowsLoading] = useState(false);
  const [error, setError] = useState('');

  const history = useHistory();

  useEffect(() => {
    let mounted = true;
    async function getBursaryWindows() {
      setFetchWindowsLoading(true);
      let { data } = await axios.get(API_BURSARY_WINDOWS);

      if (!data[0]) {
        data = [
          {
            startDate: '',
            endDate: '',
          },
        ];
      }

      if (mounted) {
        setMultiDateRange(data);
        setFetchWindowsLoading(false);
      }
    }

    getBursaryWindows();
    return () => {
      mounted = false;
    };
  }, []);

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

  const updateDates = async () => {
    try {
      const { errors: validationErrors } = validate({
        schema: validationSchema,
        data: multiDateRange,
      });

      if (!validationErrors) {
        setUpdateWindowsLoading(true);

        const { data: bursaryWindows } = await axios.put(API_BURSARY_WINDOWS, {
          bursaryWindows: multiDateRange,
        });

        setUpdateWindowsLoading(false);
        setMultiDateRange(bursaryWindows);
      } else {
        // validation errors
        setMultiDateRange(e =>
          e.map((window, i) => {
            const windowError = validationErrors[`[${i}]`] || {};
            return {
              ...window,
              error: windowError.startDate || windowError.endDate,
            };
          }),
        );
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setUpdateWindowsLoading(false);
        setError(err.response.data.error);
      } else {
        setError('something went wrong please try again later');
      }
    }
  };

  const handleTab = e => {
    setSelected(e);
  };

  const sendToResponse = (responseType, rowData) => {
    switch (responseType) {
      case 'Approve':
        return history.push(ADMIN_BURSARY_APPROVE.replace(':id', rowData._id));
      case 'Reject':
        return history.push(ADMIN_BURSARY_REJECT.replace(':id', rowData._id));
      case 'Pre-approve':
        return history.push(
          ADMIN_BURSARY_PREAPPROVE.replace(':id', rowData._id),
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
          {fetchWindowsLoading ? (
            <div>loading...</div>
          ) : (
            multiDateRange.map((date, index) => (
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
                error={date.error}
                key={date._id || index}
              />
            ))
          )}
          <ButtonNew
            small
            type="tertiary"
            style={{ width: '145px' }}
            mt={4}
            onClick={updateDates}
            loading={updateWindowsLoading}
          >
            Update dates
          </ButtonNew>
          {error && (
            <T.PXS color="pink" mt="2">
              {error}
            </T.PXS>
          )}
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
