import React from 'react';

import * as T from '../../../Common/Typography';
import { Row, Col } from '../../../Common/Grid';

import { createSingleDate } from '../../../../helpers';

const renderExpandedSection = (rowData, index) => {
  const { contactDetails, lastAddedAmount, lastAddedDate } = rowData;
  const { email, firstName, lastName, phone } = contactDetails;
  return (
    <>
      <Row mb={2}>
        <Col w={[4, 3, 3]}>
          <T.PXSBold color="darkGray">Contact Name</T.PXSBold>
          {firstName || lastName ? (
            <T.PXS color="darkGray">
              {firstName && firstName} {lastName && lastName}
            </T.PXS>
          ) : (
            <T.PXS color="darkGray">N/A</T.PXS>
          )}
        </Col>
        <Col w={[4, 3, 3]}>
          <T.PXSBold color="darkGray">Email address</T.PXSBold>
          <T.Link light color="lightBlue" isExternal to={`mailto:${email}`}>
            {email || 'N/A'}
          </T.Link>
        </Col>
        <Col w={[4, 3, 3]}>
          <T.PXSBold color="darkGray">Last Added Funds</T.PXSBold>
          <T.PXS color="lightBlue">{lastAddedAmount || 'N/A'}</T.PXS>
          <T.PXS color="lightBlue">
            {lastAddedDate ? createSingleDate(lastAddedDate) : 'N/A'}
          </T.PXS>
        </Col>
      </Row>
      <Row>
        <Col w={[4, 3, 3]} />
        <Col w={[4, 3, 3]}>
          <T.PXSBold color="darkGray">Contact Number</T.PXSBold>
          <T.Link light color="lightBlue" isExternal to={`tel:${phone}`}>
            {phone || 'N/A'}
          </T.Link>
        </Col>
      </Row>
    </>
  );
};

export default renderExpandedSection;
