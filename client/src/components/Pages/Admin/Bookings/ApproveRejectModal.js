import React from 'react';
import Modal from '../../../Common/Modal';
import { Input } from '../../../Common/Inputs';
import ButtonNew from '../../../Common/ButtonNew';

import { Row, Col } from '../../../Common/Grid';
import * as T from '../../../Common/Typography';

const ApproveRejectModal = ({
  newBookingStatus,
  submitAdminReview,
  setModalOpen,
  handleReject,
  modalOpen,
  rejectMessage,
  loading,
}) => (
  <>
    {newBookingStatus === 'rejected by admin' && (
      <Modal
        visible={modalOpen}
        title="Rejecting request"
        onOK={submitAdminReview}
        onCancel={() => setModalOpen(false)}
        content={
          <>
            <Row>
              <Col w={[4, 12, 12]}>
                <T.PXS mb={2} mt={4}>
                  Are you sure you want to reject this request?
                </T.PXS>
                <T.PXS mb={4}>
                  Please write a message to the intern so they know why you are
                  rejecting their request
                </T.PXS>
              </Col>
            </Row>
            <Row>
              <Col w={[4, 12, 12]}>
                <Input onChange={handleReject} textArea value={rejectMessage} />
              </Col>
            </Row>
            <Row mb={2} mt={4}>
              <Col w={[4, 6, 6]}>
                <ButtonNew
                  type="primary"
                  onClick={submitAdminReview}
                  loading={loading}
                >
                  Reject booking
                </ButtonNew>
              </Col>
            </Row>
          </>
        }
      />
    )}
    {newBookingStatus === 'pending' && (
      <Modal
        visible={modalOpen}
        onOK={submitAdminReview}
        onCancel={() => setModalOpen(false)}
        title="Approving request"
        hideOkButton
        content={
          <>
            <Row>
              <Col w={[4, 12, 12]}>
                <T.PXS mb={2} mt={4}>
                  Are you sure you want to approve this request?
                </T.PXS>
              </Col>
            </Row>
            <Row mb={2} mt={4}>
              <Col w={[4, 6, 6]}>
                <ButtonNew
                  type="primary"
                  onClick={submitAdminReview}
                  loading={loading}
                >
                  Approve booking
                </ButtonNew>
              </Col>
            </Row>
          </>
        }
      />
    )}
  </>
);

export default ApproveRejectModal;
