import React, { useState } from 'react';
import axios from 'axios';
import { Input, Modal, Table } from 'antd';
import styled from 'styled-components';

import { H4C, H6C, PBold, PXS } from '../../../Common/Typography';
import ButtonNew from '../../../Common/ButtonNew';
import { API_REJECT_BOOKING_URL } from '../../../../constants/apiRoutes';
import { SERVER_ERROR } from '../../../../constants/errorMessages';

import { bookingsColumns } from '../../HostDashboard/TablesColumns';
import { BookingsTableWrapper } from '../../HostDashboard/HostDashboard.style';
import { withWindowWidth } from '../../../../HOCs';

const { TextArea } = Input;

const Wrapper = styled.div`
  padding: 15px 40px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  margin-top: ${({ theme }) => theme.spacings[5]};
  > button {
    width: 160px;
    min-width: unset;
  }
  > button:last-child {
    border: none;
    text-decoration: underline;
  }
  > button:last-child:hover {
    color: ${({ theme }) => theme.colors.gray};
    background: none;
  }
`;

const OptionalSpan = styled.span`
  margin-left: ${({ theme }) => theme.spacings[2]};
  font-family: Glacial Indifference;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 27px;
  color: ${({ theme }) => theme.colors.gray};
`;

const WarningModal = ({
  handleReject,
  handleAccept,
  handleClose,
  internName,
  bookingId,
  visible,
  overLapping,
  windowWidth,
  acceptError,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [text, setText] = useState('');

  if (overLapping) {
    return (
      <Modal
        type="warning"
        visible={visible}
        footer={null}
        width={680}
        onCancel={handleClose}
      >
        <Wrapper>
          <H6C mb="4" color="blue">
            You have an overlapping request, accepting this will reject others
            automaticly?
          </H6C>
          {overLapping.map(a => a.startDate)}
          <BookingsTableWrapper>
            <Table
              columns={bookingsColumns(windowWidth)}
              dataSource={overLapping}
              // dataSource={overLapping.slice(0, viewNumber)}
              rowKey="_id"
              pagination={false}
              onRow={record => ({
                onClick: () => {
                  const newTab = window.open(
                    `/booking/${record._id}`,
                    '_blank',
                  );
                  newTab.focus();
                },
                style: { cursor: 'pointer' },
              })}
            />
          </BookingsTableWrapper>
          <ButtonsWrapper>
            <ButtonNew
              type="primary"
              onClick={() => handleAccept(null, true, setLoading)}
              loading={loading}
              disabled={acceptError}
            >
              confirm
            </ButtonNew>
            <ButtonNew type="secondary" outline onClick={handleClose}>
              cancel
            </ButtonNew>
          </ButtonsWrapper>
          {acceptError && <PXS color="pink">{acceptError}</PXS>}
        </Wrapper>
      </Modal>
    );
  }

  const handleTextChange = ({ target }) => {
    setText(target.value);
  };

  const handleRejectRequest = async () => {
    try {
      setLoading(true);

      await axios.patch(API_REJECT_BOOKING_URL.replace(':id', bookingId), {
        rejectReason: text,
      });
      handleReject();
    } catch (err) {
      const errMsg = err.response.data && err.response.data.error;
      setError(errMsg || SERVER_ERROR);
      setLoading(false);
    }
  };

  return (
    <Modal
      type="warning"
      visible={visible}
      footer={null}
      width={680}
      onCancel={handleClose}
    >
      <Wrapper>
        <H4C mb="4" color="blue">
          are you sure you want to reject this request?
        </H4C>
        <PBold mb="2">
          Please provide a reason for {internName.split(' ')[0]}
          <OptionalSpan>(optional)</OptionalSpan>
        </PBold>
        <TextArea
          rows={6}
          value={text}
          placeholder="Write your reason here..."
          onChange={handleTextChange}
        />
        <ButtonsWrapper>
          <ButtonNew
            type="primary"
            onClick={handleRejectRequest}
            loading={loading}
          >
            confirm
          </ButtonNew>
          <ButtonNew type="secondary" outline onClick={handleClose}>
            cancel
          </ButtonNew>
        </ButtonsWrapper>
        {error && <PXS color="pink">{error}</PXS>}
      </Wrapper>
    </Modal>
  );
};

export default withWindowWidth(WarningModal);
