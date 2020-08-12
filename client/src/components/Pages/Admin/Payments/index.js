import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Row, Col } from '../../../Common/Grid';
import Table from '../../../Common/Table';
import Notification from '../../../Common/Notification';

import {
  LinkCol,
  StandardCol,
  PayButtonCol,
  BankDetailsCol,
} from '../../../Common/Table/Common';
import * as T from '../../../Common/Typography';
import Tabs from '../../../Common/Tabs';

import {
  API_ADMIN_STATS_URL,
  API_UPDATE_WITHDRAW_REQUEST_URL,
  API_ADMIN_UPDATE_REQUEST_BANK_DETAILS_URL,
} from '../../../../constants/apiRoutes';
import { ADMIN_USER_DETAILS } from '../../../../constants/navRoutes';

import TopStats from './TopStats';

import renderExpandedSection from './renderExpandedSection';

const tabs = ['requests', 'history'];

const AdminPayments = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [allPayments, setAllPayments] = useState([]);
  const [paymentRequests, setPaymentRequests] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(0);
  const [bankDetails, setBankDetails] = useState([]);
  const [notificationOpen, setNotification] = useState(false);

  const handleTab = e => {
    setSelected(e);
  };

  const updateRequests = (idToUpdate, updates) => {
    setLoading(true);
    const requests = [];
    const history = [];
    const updatedTotal = [];
    if (allPayments && allPayments.length > 0) {
      allPayments.forEach(request => {
        const updatePayment =
          request.requestId === idToUpdate
            ? { ...request, ...updates }
            : request;

        updatedTotal.push(updatePayment);

        if (updatePayment.status === 'pending') {
          requests.push(updatePayment);
        } else {
          history.push(updatePayment);
        }
      });
    }
    setAllPayments(updatedTotal);
    setPaymentHistory(history);
    setPaymentRequests(requests);
    setLoading(false);
  };

  const handleBankDetailChange = (input, inputField, requestId) => {
    if (bankDetails.length < 1) {
      return setBankDetails([{ requestId, [inputField]: input }]);
    }

    const updated = bankDetails.map(bank => {
      if (bank.requestId === requestId) {
        const updatedBank = { ...bank, [inputField]: input };
        return updatedBank;
      }
      const newBank = { requestId, [inputField]: input };
      return newBank;
    });

    setBankDetails(updated);
  };

  const updateBankDetails = async (rowData, type, inputField) => {
    if (type === 'delete') {
      try {
        await axios.patch(API_ADMIN_UPDATE_REQUEST_BANK_DETAILS_URL, {
          requestId: rowData.requestId,
          bankDetails: { [inputField]: '' },
        });
        setNotification(true);
        return updateRequests(rowData.requestId, { [inputField]: '' });
      } catch (err) {
        return setError(err);
      }
    }

    const bankDetailsToUpdate = bankDetails.filter(
      bank => bank.requestId === rowData.requestId,
    );

    if (bankDetailsToUpdate && bankDetailsToUpdate.length > 0) {
      try {
        await axios.patch(API_ADMIN_UPDATE_REQUEST_BANK_DETAILS_URL, {
          requestId: rowData.requestId,
          bankDetails: bankDetailsToUpdate[0],
        });
        setNotification(true);
        return updateRequests(rowData.requestId, bankDetailsToUpdate[0]);
      } catch (err) {
        return setError(err);
      }
    }
  };

  const updatePaymentStatus = async (rowData, type) => {
    try {
      await axios.patch(
        `${API_UPDATE_WITHDRAW_REQUEST_URL.replace(':id', rowData.requestId)}`,
        { type },
      );
      setNotification(true);
      updateRequests(rowData.requestId, { status: type });
    } catch (err) {
      setError(err);
    }
  };

  const columns = [
    LinkCol('host/intern', ADMIN_USER_DETAILS, 'id'),
    StandardCol('amount', 'price'),
    BankDetailsCol('bankName', handleBankDetailChange, updateBankDetails),
    BankDetailsCol('accountNumber', handleBankDetailChange, updateBankDetails),
    BankDetailsCol('sortCode', handleBankDetailChange, updateBankDetails),
    PayButtonCol('status', updateBankDetails, updatePaymentStatus),
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.post(API_ADMIN_STATS_URL, {
          userType: 'payments',
        });

        setPaymentData(data.data);

        const { withdrawRequests } = data.data;
        const requests = [];
        const history = [];

        if (withdrawRequests && withdrawRequests.length > 0) {
          withdrawRequests.forEach(request => {
            if (request.status === 'pending') {
              requests.push(request);
            } else {
              history.push(request);
            }
          });
        }
        setAllPayments(withdrawRequests);
        setPaymentHistory(history);
        setPaymentRequests(requests);
        setLoading(false);
      } catch (err) {
        let errorMsg = 'Something went wrong';
        if (err.response && err.response.status !== 500) {
          errorMsg = err.response.data.error;
        }
        setError(errorMsg);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderTable = () => {
    switch (selected) {
      case 0:
        return (
          <Table
            data={paymentRequests}
            columns={columns}
            showSearch
            loading={loading}
            expandedSection={renderExpandedSection}
          />
        );
      case 1:
        return (
          <Table
            data={paymentHistory}
            columns={columns}
            showSearch
            loading={loading}
            expandedSection={renderExpandedSection}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Row mb={6}>
        <Col w={[4, 10, 10]}>
          <T.H2 color="blue">Payments</T.H2>
        </Col>
      </Row>
      <Row mb={6}>
        <Col w={[4, 12, 12]}>
          <TopStats data={paymentData} loading={loading} />
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
      {error && (
        <Row>
          <T.PXS color="pink">{error}</T.PXS>
        </Row>
      )}
      <Notification
        setOpen={setNotification}
        open={notificationOpen}
        content="Changes saved"
      />
    </>
  );
};

export default AdminPayments;
