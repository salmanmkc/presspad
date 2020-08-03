import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import * as T from '../../Common/Typography';
import * as routes from '../../../constants/navRoutes';
import * as S from './style';

import MyAccount from './MyAccount';
import MyProfile from './MyProfile';
import AboutMe from './AboutMe';
import Verifications from './Verifications';
import { withWindowWidth } from '../../../HOCs';
import { MOBILE_M_WIDTH } from '../../../constants/screenWidths';

import DeleteAccount from './DeleteAccount';
import DeleteAccountSuccess from './DeleteAccountSuccess';

function Settings({ windowWidth }) {
  const Heading = windowWidth > MOBILE_M_WIDTH ? T.H2 : T.H3;

  return (
    <Router>
      <Heading>Settings</Heading>
      <S.TabsWrapper>
        <S.Tabs to={routes.SETTINGS_MY_ACCOUNT}>
          <T.H5C color="inherit">MY ACCOUNT</T.H5C>
        </S.Tabs>
        <S.Tabs to={routes.SETTINGS_ABOUT_ME}>
          <T.H5C color="inherit">ABOUT ME</T.H5C>
        </S.Tabs>
        <S.Tabs to={routes.SETTINGS_MY_PROFILE}>
          <T.H5C color="inherit">MY PROFILE</T.H5C>
        </S.Tabs>
        <S.Tabs to={routes.SETTINGS_VERIFICATIONS}>
          <T.H5C color="inherit">VERIFICATIONS</T.H5C>
        </S.Tabs>
      </S.TabsWrapper>
      <Switch>
        <Route path={routes.SETTINGS_MY_ACCOUNT} component={MyAccount} exact />
        <Route path={routes.SETTINGS_ABOUT_ME} render={AboutMe} exact />
        <Route path={routes.SETTINGS_MY_PROFILE} render={MyProfile} exact />
        <Route
          path={routes.SETTINGS_VERIFICATIONS}
          render={Verifications}
          exact
        />
      </Switch>
    </Router>
  );
}

export default withWindowWidth(Settings);
