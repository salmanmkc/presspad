import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Row, Col } from '../../../Common/Grid';
import Modal from '../../../Common/Modal';
import Table from '../../../Common/Table';
import {
  LinkCol,
  StandardCol,
  TagCol,
  DBSCol,
  DropdownCol,
  HouseViewingCol,
  ButtonCol,
} from '../../../Common/Table/Common';
import * as T from '../../../Common/Typography';
import Tabs from '../../../Common/Tabs';

import {
  API_ADMIN_STATS_URL,
  API_VERIFY_PROFILE_URL,
} from '../../../../constants/apiRoutes';
import {
  ADMIN_USER_DETAILS,
  ADMIN_HOSTS_URL,
} from '../../../../constants/navRoutes';

import UpdateDBSModal from '../Common/UpdateDBSModal';
import renderExpandedSection from './renderExpandedSection';

const tabs = ['approved', 'approval requests'];

const AdminHosts = ({ preview }) => {
  const [allHosts, setAllHosts] = useState([]);
  const [hostRequests, setHostRequests] = useState([]);
  const [approvedHosts, setApprovedHosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(0);

  const handleTab = e => {
    setSelected(e);
  };

  const addHouseViewingDate = rowData => {
    console.log('function to add house date', rowData);
  };

  const deleteHouseViewingDate = rowData => {
    console.log('function to remove house date', rowData);
  };

  const updateHosts = (idToUpdate, fieldToChange, newValue) => {
    setLoading(true);
    const requests = [];
    const approved = [];
    const updatedTotal = [];
    if (allHosts && allHosts.length > 0) {
      allHosts.forEach(host => {
        const updatedHost =
          host.id === idToUpdate
            ? { ...host, [fieldToChange]: newValue }
            : host;

        updatedTotal.push(updatedHost);

        if (updatedHost.verified) {
          approved.push(host);
        } else if (updatedHost.awaitingReview) {
          requests.push(host);
        }
      });
    }
    setHostRequests(requests);
    setApprovedHosts(approved);
    setAllHosts(updatedTotal);
    setLoading(false);
  };

  const dbsSaved = (id, result, data) => {
    if (result === 'success') {
      updateHosts(id, 'dbsCheck', data);
    } else {
      setError(data);
    }
  };

  const verifyProfile = async (input, rowData) => {
    if (input === 'approve' || input === 'unapprove') {
      try {
        await axios.post(API_VERIFY_PROFILE_URL, {
          profileId: rowData.profileId,
          verify: input === 'approve',
        });
        updateHosts(rowData.id, 'verified', input === 'approve');
      } catch (err) {
        setError(err);
      }
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
    ButtonCol('', verifyProfile, 'unapprove', 'delete', 'gray'),
  ];

  const requestCols = [
    LinkCol('name', ADMIN_USER_DETAILS, 'id'),
    StandardCol('requestDate', 'date'),
    DBSCol('dbsCheck', dbsSaved),
    HouseViewingCol(
      'houseViewing',
      addHouseViewingDate,
      deleteHouseViewingDate,
    ),
    StandardCol('status'),
    DropdownCol('actions', verifyProfile, [
      { label: 'Approve', value: 'approve' },
      { label: 'Request changes', value: 'request changes' },
    ]),
  ];

  useEffect(() => {
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
        setAllHosts(totalHosts);
        setHostRequests(requests);
        setApprovedHosts(approved);
        if (preview) {
          setSelected(1);
        }
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
  }, [preview]);

  const renderTable = () => {
    switch (selected) {
      case 0:
        return (
          <Table
            data={approvedHosts}
            columns={approvedCols}
            showSearch
            loading={loading}
            expandedSection={renderExpandedSection}
          />
        );
      case 1:
        return (
          <Table
            data={hostRequests}
            columns={requestCols}
            showSearch={!preview}
            loading={loading}
            expandedSection={renderExpandedSection}
            tableHeader={preview && 'host approval requests'}
            previewLink={preview && ADMIN_HOSTS_URL}
            previewLinkText={preview && 'View all host requests'}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {!preview && (
        <>
          <Row mb={6}>
            <Col w={[4, 10, 10]}>
              <T.H2 color="blue">Hosts</T.H2>
            </Col>
          </Row>
          <Row mb={4}>
            <Col w={[4, 12, 12]}>
              <Tabs
                items={tabs}
                caps
                handleClick={handleTab}
                selected={selected}
              />
            </Col>
          </Row>
        </>
      )}
      <Row mb={4}>
        <Col w={[4, 12, 12]}>{renderTable()}</Col>
      </Row>
      {error && (
        <Row>
          <T.PXS color="pink">{error}</T.PXS>
        </Row>
      )}
    </>
  );
};

export default AdminHosts;
