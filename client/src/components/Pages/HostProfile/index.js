import React from 'react';
import { Redirect } from 'react-router-dom';

import HostView from './HostView';
import InternOrgView from './InternOrgView/index';
import AdminView from './AdminView';
import { Error404 } from '../../../constants/navRoutes';

export default function HostProfile(props) {
  const { role } = props;

  switch (role) {
    // admin view
    case 'admin':
      return <AdminView {...props} />;
    // org and intern view
    case 'organisation':
    case 'intern':
      return <InternOrgView {...props} />;
    // unauthenticated user view
    case undefined:
      return <InternOrgView unauthenticated {...props} />;
    // host view
    case 'host':
      return <HostView {...props} />;

    default:
      return <Redirect to={Error404} />;
  }
}
