import React from 'react';
import { Redirect } from 'react-router-dom';

import { Error404 } from '../../../constants/navRoutes';
import HostView from './HostView';
import InternView from './InternView';

const PaymentsPage = props => {
  const { role } = props;
  switch (role) {
    case 'host':
      return <HostView {...props} />;
    case 'intern':
      return <InternView {...props} />;

    default:
      return <Redirect to={Error404} />;
  }
};

export default PaymentsPage;
