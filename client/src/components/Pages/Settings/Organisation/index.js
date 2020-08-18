import React from 'react';
import { Switch, Route } from 'react-router-dom';

import * as T from '../../../Common/Typography';
import { SETTINGS } from '../../../../constants/navRoutes';
import * as S from './style';

import MyAccount from '../MyAccount';
import AccountDetails from './AccountDetails';
import Profile from './Profile';
import { withWindowWidth } from '../../../../HOCs';
import { MOBILE_M_WIDTH } from '../../../../constants/screenWidths';

function Settings({ windowWidth, ...props }) {
  const Heading = windowWidth > MOBILE_M_WIDTH ? T.H2 : T.H3;

  return (
    <>
      <S.PageWrapper>
        <Heading>Settings</Heading>
        <S.TabsWrapper>
          <S.Tabs to={SETTINGS.ACCOUNT}>
            <T.H5C color="inherit" mb={0}>
              MY ACCOUNT
            </T.H5C>
          </S.Tabs>
          <S.Tabs to={SETTINGS.DETAILS}>
            <T.H5C color="inherit" mb={0}>
              DETAILS
            </T.H5C>
          </S.Tabs>
          <S.Tabs to={SETTINGS.EDIT_PROFILE}>
            <T.H5C color="inherit" mb={0}>
              MY PROFILE
            </T.H5C>
          </S.Tabs>
        </S.TabsWrapper>
        <Switch>
          <Route
            path={SETTINGS.ACCOUNT}
            render={() => <MyAccount {...props} />}
            exact
          />
          <Route
            path={SETTINGS.DETAILS}
            render={() => <AccountDetails {...props} />}
            exact
          />
          <Route
            path={SETTINGS.EDIT_PROFILE}
            render={() => <Profile {...props} />}
            exact
          />
        </Switch>
      </S.PageWrapper>
    </>
  );
}

export default withWindowWidth(Settings);
