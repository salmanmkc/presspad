import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import Welcome from './Welcome';
import AccountDetails from './AccountDetails';
import CreateProfile from './CreateProfile';
import AddFunds from '../OrgDashboard/AddFunds';
import * as r from '../../../constants/navRoutes';

export default function OrgSignUpFlow(props) {
  return (
    <>
      <Switch>
        <Route path={r.SIGNUP_ORG_WELCOME} exact>
          <Welcome {...props} />
        </Route>
        <Route path={r.SIGNUP_ORG_ACCOUNT_DETAILS} exact>
          <AccountDetails {...props} />
        </Route>
        <Route path={r.SIGNUP_ORG_CREATE_PROFILE} exact>
          <CreateProfile {...props} />
        </Route>
        <Route path={r.SIGNUP_ORG_ADD_FUNDS} exact>
          <AddFunds signUp {...props} />
        </Route>
        <Redirect to={r.Error404} />
      </Switch>
    </>
  );
}
