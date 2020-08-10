import React from 'react';
import { Redirect } from 'react-router-dom';
import PreApprove from './PreApprove';
import Reject from './Reject';
import Approve from './Approve';
import Success from './Success';

import { Error404 } from '../../../../../constants/navRoutes';

const BursaryResponse = ({ type }) => {
  switch (type) {
    case 'preapprove':
      return <PreApprove />;
    case 'reject':
      return <Reject />;
    case 'approve':
      return <Approve />;
    case 'success':
      return <Success />;
    default:
      return <Redirect to={Error404} />;
  }
};

export default BursaryResponse;
