/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import axios from 'axios';

import { Button, message, Modal, Input as antInput } from 'antd';

import Icon from '../../Common/Icon';

import Field from '../../Common/ProfileComponents/Field';
import Input from '../../Common/ProfileComponents/Field/Input';

// SUB COMPONENTS
import ClientTable from './ClientTable';
import InternTable from './InternTable';
import HostTable from './HostTable';
import PaymentsTable from './PaymentsTable';
import SearchBar from '../../Common/SearchBar';
import InternProfile from '../InternProfile/AdminOrInternView';
import HostProfile from '../HostProfile';
import BookingsTable from './Bookings';

// STYLING
import {
  Wrapper,
  TopSection,
  Title,
  DashboardMenu,
  MenuItem,
  MainSection,
  ContentTitle,
  HostWrapper,
} from './AdminDashboard.style';

// API ROUTES
import {
  API_ADMIN_STATS_URL,
  API_UPDATE_WITHDRAW_REQUEST_URL,
  API_ADMIN_REVIEWS_BOOKING,
  API_ADMIN_UPDATE_PROFILE,
} from '../../../constants/apiRoutes';
import { filterArray } from '../../../helpers';

const { TextArea } = antInput;

export default class AdminDashboard extends Component {
  state = {
    activeLink: 'clients',
    loading: false,
    data: [],
    filteredData: [],
    highlightVal: '',
    axiosSource: null,
    internView: {
      on: false,
      internId: '',
    },
    hostView: {
      on: false,
      hostId: '',
      hostName: '',
      email: '',
    },
    rejectMessage: null,
    updatingBooking: false,
    modalText: '',
    modalToShow: '',
    bookingToUpdate: null,
    newBookingStatus: null,
    updatingDBS: null,
    dbsDetails: { refNum: '', fileName: '' },
    userToUpdate: null,
    errors: { dbsDetails: { refNum: null, fileName: null } },
    showSearchBar: true,
  };

  componentDidMount() {
    this.selectSection('clients');
  }

  triggerInternView = (internId = '') => {
    this.setState(prev => {
      const newState = { ...prev };
      newState.internView.on = !newState.internView.on;
      newState.internView.internId = internId;
      return newState;
    });
  };

  triggerHostView = (hostId = '', hostName = '', email = '') => {
    this.setState(prev => {
      const newState = { ...prev };
      newState.hostView.on = !newState.hostView.on;
      newState.hostView.hostId = hostId;
      newState.hostView.hostName = hostName;
      newState.hostView.email = email;
      return newState;
    });
  };

  selectSection = section => {
    const { axiosSource } = this.state;

    if (axiosSource) axiosSource.cancel('Cancel axios request');

    this.setState(
      {
        activeLink: section,
        loading: true,
        data: [],
        filteredData: [],
        axiosSource: axios.CancelToken.source(),
        internView: { on: false, internId: '' },
        hostView: { on: false, hostId: '' },
      },
      () => {
        const { axiosSource: newAxiosSource } = this.state;

        axios
          .post(
            API_ADMIN_STATS_URL,
            { userType: section },
            { cancelToken: newAxiosSource.token },
          )
          .then(({ data }) => {
            this.setState({ data, filteredData: data, loading: false });
          })
          .catch(err => {
            let errorMsg = 'Something went wrong';
            if (err.response && err.response.status !== 500) {
              errorMsg = err.response.data.error;
            }
            if (err.message !== 'Cancel axios request') {
              message.error(errorMsg);
            }
            this.setState({ loading: false });
          });
      },
    );
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div styled={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{
            width: 188,
            marginBottom: 8,
            display: 'block',
            backgound: 'red',
          }}
          id="tableInput"
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <button
        style={{
          border: 'none',
          background: 'none',
          height: '100%',
          width: '100%',
        }}
      >
        <Icon
          icon="search"
          color={filtered ? 'red' : undefined}
          width="15px"
          height="15px"
        />
      </button>
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    // this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    // this.setState({ searchText: "" });
  };

  hideProfile = () => {
    const { activeLink } = this.state;
    this.selectSection(activeLink);
  };

  handleSearchBar = ({ target: { value } }) => {
    const { data } = this.state;
    const filteredData = filterArray(data, value);
    this.setState({ filteredData, highlightVal: value });
  };

  handleConfirm = async (id, type) => {
    const { data: _data, filteredData: _filteredData } = this.state;
    try {
      await axios.patch(
        `${API_UPDATE_WITHDRAW_REQUEST_URL.replace(':id', id)}`,
        { type },
      );
      message.success(`The request have been ${type} successfully`);

      // update the table dataSource
      const data = _data.map(request => {
        let newRequest = { ...request };
        if (request._id === id) {
          newRequest = { ...request, status: type };
        }
        return newRequest;
      });
      // update the table filteredData
      const filteredData = _filteredData.map(request => {
        let newRequest = { ...request };
        if (request._id === id) {
          newRequest = { ...request, status: type };
        }
        return newRequest;
      });

      this.setState({ data, filteredData });
    } catch (error) {
      message.error('something went wrong');
    }
  };

  onInputChange = e => {
    this.setState({ rejectMessage: e.target.value });
  };

  submitAdminReview = async () => {
    const { rejectMessage, bookingToUpdate, newStatus } = this.state;
    this.setState({
      updatingBooking: true,
      modalText: 'Updating booking request',
    });
    try {
      await axios.patch(API_ADMIN_REVIEWS_BOOKING, {
        status: newStatus,
        message: rejectMessage,
        booking: bookingToUpdate,
      });
      this.setState({ updatingBooking: false, modalToShow: '' });
      Modal.success({
        content: 'Booking request successfully updated',
      });
      this.selectSection('bookings');
    } catch (err) {
      message.error('Something went wrong');
      this.setState({ updatingBooking: false, modalToShow: '' });
    }
  };

  handleCancel = () => {
    this.setState({
      rejectMessage: null,
      updatingBooking: false,
      modalText: '',
      modalToShow: null,
      bookingToUpdate: null,
      newBookingStatus: null,
      dbsDetails: {},
    });
    const { activeLink } = this.state;
    this.selectSection(activeLink);
  };

  rejectRequestConfirm = booking => {
    const modalText = (
      <>
        <p>
          Please write a message to the intern so they know why you are
          rejecting their request
        </p>
        <TextArea rows={3} onChange={this.onInputChange} />
      </>
    );
    this.setState({
      modalText,
      bookingToUpdate: booking,
      newStatus: 'rejected by admin',
      modalToShow: 'bookingRequest',
    });
  };

  approveRequestConfirm = booking => {
    const modalText = <p>Are you sure you want to approve this request?</p>;
    this.setState({
      modalText,
      bookingToUpdate: booking,
      newStatus: 'pending',
      modalToShow: 'bookingRequest',
    });
  };

  handleAction = (action, booking) => {
    switch (action) {
      case 'approveRequest':
        return this.approveRequestConfirm(booking);
      case 'rejectRequest':
        return this.rejectRequestConfirm(booking);
      default:
        return null;
    }
  };

  updateDBS = record => {
    this.setState({
      ...(record.dbsCheck ? { dbsDetails: record.dbsCheck } : {}),
      userToUpdate: record.userId,
      modalToShow: 'dbs',
    });
  };

  handleDBSChange = ({ value, key }) => {
    const { dbsDetails } = this.state;

    this.setState({
      dbsDetails: { ...dbsDetails, [key]: value },
    });
  };

  submitDBSChange = async () => {
    const { dbsDetails, userToUpdate } = this.state;
    const { refNum, fileName } = dbsDetails;
    this.setState({
      updatingDBS: true,
      modalText: 'Saving changes',
    });
    try {
      await axios.patch(API_ADMIN_UPDATE_PROFILE, {
        fieldsToUpdate: { DBSCheck: { refNum, fileName } },
        userId: userToUpdate,
      });
      this.setState({ updatingDBS: false, modalToShow: null });
      Modal.success({
        content: 'Successfully updated',
      });
      this.selectSection('interns');
    } catch (err) {
      message.error('Something went wrong');
    }
  };

  handleError = ({ errorMsg, key, parent }) => {
    if (parent) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [parent]: { ...prevState.errors[parent], [key]: errorMsg },
        },
      }));
    } else {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [key]: errorMsg,
        },
      }));
    }
  };

  toggleSearchBar = () =>
    this.setState(prevSate => ({ showSearchBar: !prevSate.showSearchBar }));

  render() {
    const {
      activeLink,
      loading,
      filteredData,
      highlightVal,
      internView,
      hostView,
      modalToShow,
      updatingBooking,
      modalText,
      updatingDBS,
      dbsDetails,
      userToUpdate,
      errors,
      showSearchBar,
    } = this.state;
    console.log('showwww', showSearchBar);
    return (
      <Wrapper>
        <TopSection>
          <Title>Your Dashboard</Title>
          <DashboardMenu>
            <MenuItem
              onClick={() => this.selectSection('clients')}
              active={activeLink === 'clients'}
            >
              Clients
            </MenuItem>
            <MenuItem
              onClick={() => this.selectSection('interns')}
              active={activeLink === 'interns'}
            >
              Interns
            </MenuItem>
            <MenuItem
              onClick={() => this.selectSection('hosts')}
              active={activeLink === 'hosts'}
            >
              Hosts
            </MenuItem>
            <MenuItem
              onClick={() => this.selectSection('payments')}
              active={activeLink === 'payments'} // change here
            >
              Payments
            </MenuItem>
            <MenuItem
              onClick={() => this.selectSection('bookings')}
              active={activeLink === 'bookings'} // change here
            >
              Bookings
            </MenuItem>
            <MenuItem
              onClick={() => this.selectSection('bookingHistory')}
              active={activeLink === 'bookingHistory'} // change here
            >
              Booking History
            </MenuItem>
          </DashboardMenu>
        </TopSection>
        {internView.on ? (
          <InternProfile
            {...this.props}
            internId={internView.internId}
            triggerInternView={this.triggerInternView}
          />
        ) : hostView.on ? (
          <HostProfile
            {...this.props}
            hostId={hostView.hostId}
            hostName={hostView.hostName}
            hostEmail={hostView.email}
            triggerHostView={this.triggerHostView}
          />
        ) : (
          <MainSection>
            <ContentTitle>
              {activeLink.toLowerCase() === 'payments'
                ? 'Withdraw requests'
                : `Your ${activeLink}`}
            </ContentTitle>
            {showSearchBar && (
              <SearchBar
                data={filteredData}
                handleSearchBar={this.handleSearchBar}
                highlightVal={highlightVal}
              />
            )}
            {activeLink === 'clients' && (
              <ClientTable
                getColumnSearchProps={this.getColumnSearchProps}
                loading={loading}
                data={filteredData}
                highlightVal={highlightVal}
              />
            )}
            {activeLink === 'interns' && (
              <InternTable
                getColumnSearchProps={this.getColumnSearchProps}
                loading={loading}
                data={filteredData}
                highlightVal={highlightVal}
                triggerInternView={this.triggerInternView}
                updatingDBS={updatingDBS}
                updateDBS={this.updateDBS}
                handleDBSChange={this.handleDBSChange}
              />
            )}
            {activeLink === 'hosts' && (
              <HostWrapper>
                <HostTable
                  getColumnSearchProps={this.getColumnSearchProps}
                  loading={loading}
                  data={filteredData}
                  highlightVal={highlightVal}
                  triggerHostView={this.triggerHostView}
                  updatingDBS={updatingDBS}
                  updateDBS={this.updateDBS}
                  handleDBSChange={this.handleDBSChange}
                />
              </HostWrapper>
            )}
            {activeLink === 'payments' && (
              <HostWrapper>
                <PaymentsTable
                  getColumnSearchProps={this.getColumnSearchProps}
                  loading={loading}
                  data={filteredData}
                  showProfile={this.showProfile}
                  highlightVal={highlightVal}
                  handleConfirm={this.handleConfirm}
                />
              </HostWrapper>
            )}
            {activeLink === 'bookings' && (
              <HostWrapper>
                <BookingsTable
                  toggleSearchBar={this.toggleSearchBar}
                  getColumnSearchProps={this.getColumnSearchProps}
                  loading={loading}
                  data={filteredData}
                  showProfile={this.showProfile}
                  highlightVal={highlightVal}
                  handleConfirm={this.handleConfirm}
                  handleAction={this.handleAction}
                  triggerHostView={this.triggerHostView}
                  triggerInternView={this.triggerInternView}
                />
              </HostWrapper>
            )}
            {activeLink === 'bookingHistory' && (
              <HostWrapper>
                <BookingsTable
                  toggleSearchBar={this.toggleSearchBar}
                  getColumnSearchProps={this.getColumnSearchProps}
                  loading={loading}
                  data={filteredData}
                  showProfile={this.showProfile}
                  highlightVal={highlightVal}
                  handleConfirm={this.handleConfirm}
                  handleAction={this.handleAction}
                  triggerHostView={this.triggerHostView}
                  triggerInternView={this.triggerInternView}
                />
              </HostWrapper>
            )}
          </MainSection>
        )}
        <Modal
          title="Are you sure?"
          visible={modalToShow === 'bookingRequest'}
          onOk={this.submitAdminReview}
          confirmLoading={updatingBooking}
          onCancel={this.handleCancel}
        >
          {modalText}
        </Modal>
        <Modal
          title="Update DBS Details"
          visible={modalToShow === 'dbs'}
          onOk={this.submitDBSChange}
          confirmLoading={updatingDBS}
          onCancel={this.handleCancel}
        >
          <Field
            name="refNum"
            handleChange={this.handleDBSChange}
            id="refNum"
            value={dbsDetails.refNum}
            placeholder="Enter reference number"
            type="text"
            label="Reference Number"
            error={errors['refNum']}
          />
          <Field
            value={dbsDetails.fileName}
            url={dbsDetails.url}
            handleChange={this.handleDBSChange}
            name="fileName"
            handleError={this.handleError}
            userId={userToUpdate}
            id="fileName"
            label="DBS Certificate"
            type="file"
          />
        </Modal>
      </Wrapper>
    );
  }
}
