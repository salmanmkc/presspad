import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Row, Col } from '../../../Common/Grid';
import Table from '../../../Common/Table';
import {
  LinkCol,
  StandardCol,
  TagCol,
  DBSCol,
  DropdownCol,
} from '../../../Common/Table/Common';
import * as T from '../../../Common/Typography';
import Tabs from '../../../Common/Tabs';

import { API_ADMIN_STATS_URL } from '../../../../constants/apiRoutes';
import { ADMIN_USER_DETAILS } from '../../../../constants/navRoutes';

import renderExpandedSection from './renderExpandedSection';

const tabs = ['approved', 'approval requests'];

const AdminInterns = () => {
  const [internRequests, setInternRequests] = useState([]);
  const [approvedInterns, setApprovedInterns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [selected, setSelected] = useState(0);

  const handleTab = e => {
    setSelected(e);
  };

  const updateDBS = rowData => {
    console.log('function to update DBS', rowData);
  };

  const approveProfile = (input, rowData) => {
    if (input === 'approve') {
      console.log('action to approve the profile');
    } else if (input === 'request changes') {
      window.open(`mailto:${rowData.email}`);
    }
  };

  const approvedCols = [
    LinkCol('name', ADMIN_USER_DETAILS, 'id'),
    StandardCol('nextPayment', 'price', null, 'nextPaymentDue', 'date'),
    StandardCol('internshipStart', 'date'),
    StandardCol('organisation'),
    TagCol('bookingStatus', 'booking'),
  ];

  const requestCols = [
    LinkCol('name', ADMIN_USER_DETAILS, 'id'),
    StandardCol('requestDate', 'date'),
    DBSCol('dbsCheck', updateDBS),
    StandardCol('status'),
    DropdownCol('actions', approveProfile, [
      { label: 'Approve', value: 'approve' },
      { label: 'Request changes', value: 'request changes' },
    ]),
  ];

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await axios.post(API_ADMIN_STATS_URL, {
          userType: 'interns',
        });
        const totalInterns = data.data;
        const requests = [];
        const approved = [];
        if (totalInterns && totalInterns.length > 0) {
          totalInterns.forEach(intern => {
            if (intern.verified) {
              approved.push(intern);
            } else if (intern.awaitingReview) {
              requests.push(intern);
            }
          });
        }
        setInternRequests(requests);
        setApprovedInterns(approved);
      } catch (err) {
        let errorMsg = 'Something went wrong';
        if (err.response && err.response.status !== 500) {
          errorMsg = err.response.data.error;
        }
        setErrors({ serverErr: errorMsg });
      }
    };
    fetchData();
    setLoading(false);
  }, []);

  const renderTable = () => {
    switch (selected) {
      case 0:
        return (
          <Table
            data={approvedInterns}
            columns={approvedCols}
            showSearch
            loading={loading}
            expandedSection={renderExpandedSection}
          />
        );
      case 1:
        return (
          <Table
            data={internRequests}
            columns={requestCols}
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
          <T.H2 color="blue">Interns</T.H2>
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

export default AdminInterns;