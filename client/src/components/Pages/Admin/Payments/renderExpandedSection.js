import React from 'react';

import * as T from '../../../Common/Typography';
import { Row, Col } from '../../../Common/Grid';

import { createSingleDate } from '../../../../helpers';

const renderExpandedSection = (rowData, index) => {
  const { email, name, contactNumber, reason, createdAt } = rowData;
  return (
    <>
      <Row mb={2}>
        <Col w={[4, 3, 3]}>
          <T.PXSBold color="darkGray">Contact Name</T.PXSBold>
          <T.PXS color="darkGray">{name || 'N/A'}</T.PXS>
        </Col>
        <Col w={[4, 3, 3]}>
          <T.PXSBold color="darkGray">Email address</T.PXSBold>
          <T.Link light color="lightBlue" isExternal to={`mailto:${email}`}>
            {email || 'N/A'}
          </T.Link>
        </Col>
        <Col w={[4, 3, 3]}>
          <T.PXSBold color="darkGray">Contact Number</T.PXSBold>
          <T.Link
            light
            color="lightBlue"
            isExternal
            to={`tel:${contactNumber}`}
          >
            {contactNumber || 'N/A'}
          </T.Link>
        </Col>
      </Row>
      <Row mb={2}>
        <Col w={[4, 3, 3]}>
          <T.PXSBold color="darkGray">Reason for request</T.PXSBold>
          <T.PXS color="darkGray">{reason || 'N/A'}</T.PXS>
        </Col>
        <Col w={[4, 3, 3]}>
          <T.PXSBold color="darkGray">Request date</T.PXSBold>
          <T.PXS color="darkGray">{createSingleDate(createdAt) || 'N/A'}</T.PXS>
        </Col>
      </Row>
    </>
  );
};

export default renderExpandedSection;
