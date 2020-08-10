import React from 'react';

import * as T from '../../../../Common/Typography';
import { Row, Col } from '../../../../Common/Grid';

import { ADMIN_USER_DETAILS } from '../../../../../constants/navRoutes';

import formatPrice from '../../../../../helpers/formatPrice';

const renderExpandedSection = (rowData, index) => {
  const { email, rejectedBursaries, awardedBursariesCost, name, id } = rowData;
  return (
    <>
      <Row mb={2}>
        <Col w={[4, 4, 4]}>
          <T.PXSBold color="darkGray">Email address</T.PXSBold>
          <T.Link light color="lightBlue" isExternal to={`mailto:${email}`}>
            {email}
          </T.Link>
        </Col>
        <Col w={[4, 4, 4]}>
          <T.PXSBold color="darkGray">
            Bursaries they&apos;ve been given
          </T.PXSBold>
          <T.PXS color="lightBlue">{formatPrice(awardedBursariesCost)}</T.PXS>
        </Col>
        <Col w={[4, 4, 4]}>
          <T.PXSBold color="darkGray">Link to their profile</T.PXSBold>
          <T.Link
            color="lightBlue"
            light
            newTab
            to={ADMIN_USER_DETAILS.replace(':id', id)}
          >
            {name}
          </T.Link>
        </Col>
      </Row>
      <Row>
        <Col w={[4, 4, 4]}>
          <T.PXSBold color="darkGray">Rejected bursaries</T.PXSBold>
          <T.PXS color="lightBlue">{rejectedBursaries}</T.PXS>
        </Col>
      </Row>
    </>
  );
};

export default renderExpandedSection;
