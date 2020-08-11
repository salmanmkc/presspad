import React from 'react';

import * as T from '../../../Common/Typography';
import { Row, Col } from '../../../Common/Grid';
import FileDownload from '../../../Common/Files/FileDownload';

const renderExpandedSection = (rowData, index) => {
  const { internDetails, hostDetails, intern, host } = rowData;
  const { internship } = internDetails;
  return (
    <>
      <Row mb={2}>
        <Col w={[4, 8, 8]}>
          <T.H8C color="darkGray">Internship Details</T.H8C>
        </Col>
      </Row>
      <Row mb={2}>
        <Col w={[4, 3, 3]}>
          <T.PXSBold color="darkGray">Organisation</T.PXSBold>
          <T.PXS color="darkGray">{internship.Organisation || 'N/A'}</T.PXS>
        </Col>
        <Col w={[4, 3, 3]}>
          <T.PXSBold color="darkGray">Contact Name</T.PXSBold>
          <T.PXS color="darkGray">
            {internship['Contact Details'].name || 'N/A'}
          </T.PXS>
        </Col>
        <Col w={[4, 3, 3]}>
          <T.PXSBold color="darkGray">Contact Email</T.PXSBold>
          <T.Link
            light
            color="lightBlue"
            isExternal
            to={`mailto:${internship['Contact Details'].name}`}
          >
            {internship['Contact Details'].email || 'N/A'}
          </T.Link>
        </Col>
        <Col w={[4, 3, 3]}>
          <T.PXSBold color="darkGray">Contact Number</T.PXSBold>
          <T.Link
            light
            color="lightBlue"
            isExternal
            to={`tel:${internship['Contact Details'].phoneNumber}`}
          >
            {internship['Contact Details'].phoneNumber || 'N/A'}
          </T.Link>
        </Col>
      </Row>
      <Row mb={2}>
        <Col w={[4, 3, 3]}>
          <T.PXSBold color="darkGray">Proof of Internship</T.PXSBold>
          <FileDownload
            style={{ marginBottom: '10px' }}
            url={internship['Proof of Internship'].url}
            fileName="Click to download"
          />
        </Col>
      </Row>
      <Row mt={4} mb={2}>
        <Col w={[4, 8, 8]}>
          <T.H8C color="darkGray">Host Details</T.H8C>
        </Col>
      </Row>
      <Row mb={2}>
        <Col w={[4, 3, 3]}>
          <T.PXSBold color="darkGray">Name</T.PXSBold>
          <T.PXS color="darkGray">{host || 'N/A'}</T.PXS>
        </Col>
        <Col w={[4, 3, 3]}>
          <T.PXSBold color="darkGray">Contact Email</T.PXSBold>
          <T.Link
            light
            color="lightBlue"
            isExternal
            to={`mailto:${hostDetails.email}`}
          >
            {hostDetails.email || 'N/A'}
          </T.Link>
        </Col>
        <Col w={[4, 3, 3]}>
          <T.PXSBold color="darkGray">Contact Number</T.PXSBold>
          <T.Link
            light
            color="lightBlue"
            isExternal
            to={`tel:${hostDetails.phone}`}
          >
            {hostDetails.phone || 'N/A'}
          </T.Link>
        </Col>
      </Row>
      <Row mt={4} mb={2}>
        <Col w={[4, 8, 8]}>
          <T.H8C color="darkGray">Intern Details</T.H8C>
        </Col>
      </Row>
      <Row mb={2}>
        <Col w={[4, 3, 3]}>
          <T.PXSBold color="darkGray">Name</T.PXSBold>
          <T.PXS color="darkGray">{intern || 'N/A'}</T.PXS>
        </Col>
        <Col w={[4, 3, 3]}>
          <T.PXSBold color="darkGray">Contact Email</T.PXSBold>
          <T.Link
            light
            color="lightBlue"
            isExternal
            to={`mailto:${internDetails.email}`}
          >
            {internDetails.email || 'N/A'}
          </T.Link>
        </Col>
        <Col w={[4, 3, 3]}>
          <T.PXSBold color="darkGray">Contact Number</T.PXSBold>
          <T.Link
            light
            color="lightBlue"
            isExternal
            to={`tel:${internDetails.phone}`}
          >
            {internDetails.phone || 'N/A'}
          </T.Link>
        </Col>
      </Row>
    </>
  );
};

export default renderExpandedSection;
