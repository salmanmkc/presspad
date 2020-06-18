import React from 'react';
import { Redirect } from 'react-router-dom';

import { Error404 } from '../../../constants/navRoutes';
import HostView from './HostView';

const PaymentsPage = props => {
  const { role } = props;
  switch (role) {
    case 'host':
      return <HostView {...props} />;

    default:
      return <Redirect to={Error404} />;
  }
};

export default PaymentsPage;
