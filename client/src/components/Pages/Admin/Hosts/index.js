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
  HouseViewingCol,
} from '../../../Common/Table/Common';
import * as T from '../../../Common/Typography';
import Tabs from '../../../Common/Tabs';

import { API_ADMIN_STATS_URL } from '../../../../constants/apiRoutes';
import { ADMIN_USER_DETAILS } from '../../../../constants/navRoutes';

const tabs = ['approved', 'approval requests'];

const AdminHosts = () => {
  const [hostRequests, setHostRequests] = useState([]);
  const [approvedHosts, setApprovedHosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [selected, setSelected] = useState(0);

  const handleTab = e => {
    setSelected(e);
  };

  const updateDBS = rowData => {
    console.log('function to update DBS', rowData);
  };

  const addHouseViewingDate = rowData => {
    console.log('function to add house date', rowData);
  };

  const deleteHouseViewingDate = rowData => {
    console.log('function to remove house date', rowData);
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
    StandardCol('location'),
    StandardCol('internsHosted', 'number'),
    StandardCol('wallet', 'price'),
    StandardCol('earnings', 'price'),
    TagCol('bookingStatus', 'booking'),
  ];

  const requestCols = [
    LinkCol('name', ADMIN_USER_DETAILS, 'id'),
    StandardCol('requestDate', 'date'),
    DBSCol('dbsCheck', updateDBS),
    HouseViewingCol(
      'houseViewing',
      addHouseViewingDate,
      deleteHouseViewingDate,
    ),
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
          userType: 'hosts',
        });
        const totalHosts = data.data;
        const requests = [];
        const approved = [];
        if (totalHosts && totalHosts.length > 0) {
          totalHosts.forEach(host => {
            if (host.verified) {
              approved.push(host);
            } else if (host.awaitingReview) {
              requests.push(host);
            }
          });
        }
        setHostRequests(requests);
        setApprovedHosts(approved);
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
            data={approvedHosts}
            columns={approvedCols}
            showSearch
            loading={loading}
            // expandedSection={renderExpandedSection}
          />
        );
      case 1:
        return (
          <Table
            data={hostRequests}
            columns={requestCols}
            showSearch
            loading={loading}
            // expandedSection={renderExpandedSection}
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

export default AdminHosts;
