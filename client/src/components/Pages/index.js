import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

//  COMMON COMPONENTS
import Route from '../Common/Route';
import NotFound from '../Common/NotFound';

import LandingPage from './LandingPage';
import HostCreateProfile from './HostCreateProfile';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import Dashboard from './Dashboard';
import HostProfile from './HostProfile';
import InternCreateProfile from './InternCreateProfile';
import AdminDashboard from './AdminDashboard';
import SearchHosts from './SearchHosts';
import BookingView from './BookingView';
import MyProfile from './MyProfile';
import AddReview from './AddReview';
import InternProfile from './InternProfile';
import ThemeTest from './ThemeTest';
import DBSCheckPage from './DBSCheck';

import { withWindowWidth } from '../../HOCs';
import {
  HOME_URL,
  SIGNIN_URL,
  SIGNUP_INTERN,
  SIGNUP_HOST,
  SIGNUP_ORG,
  DASHBOARD_URL,
  HOST_PROFILE,
  HOST_COMPLETE_PROFILE_URL,
  INTERN_COMPLETE_PROFILE_URL,
  ADMIN_DASHBOARD_URL,
  HOSTS_URL,
  BOOKING_VIEW_URL,
  MYPROFILE_URL,
  ADD_REVIWE_URL,
  INTERN_PROFILE,
  DBS_CHECK_PAGE,
} from '../../constants/navRoutes';

function Pages(props) {
  const { handleChangeState, isLoggedIn, role, windowWidth } = props;

  return (
    <>
      <Switch>
        <Route path={HOME_URL} exact Component={LandingPage} {...props} />
        <Route
          isPrivate
          exact
          path={HOST_PROFILE}
          Component={HostProfile}
          handleChangeState={handleChangeState}
          isLoggedIn={isLoggedIn}
          {...props}
        />
        <Route
          isPrivate
          path={BOOKING_VIEW_URL}
          Component={BookingView}
          {...props}
        />
        <Route
          exact
          path={HOSTS_URL}
          render={() => (
            <SearchHosts
              isLoggedIn={isLoggedIn}
              windowWidth={windowWidth}
              {...props}
            />
          )}
          {...props}
        />
        <Route
          isPrivate
          exact
          path={DASHBOARD_URL}
          Component={Dashboard}
          handleChangeState={handleChangeState}
          isLoggedIn={isLoggedIn}
          {...props}
          layout="sideMenu"
        />
        {['host', 'superhost'].includes(role) && (
          <Route
            isPrivate
            exact
            path={HOST_COMPLETE_PROFILE_URL}
            Component={HostCreateProfile}
            handleChangeState={handleChangeState}
            isLoggedIn={isLoggedIn}
            {...props}
          />
        )}
        {role === 'admin' && (
          <Route
            isPrivate
            exact
            path={ADMIN_DASHBOARD_URL}
            Component={AdminDashboard}
            handleChangeState={handleChangeState}
            isLoggedIn={isLoggedIn}
            {...props}
          />
        )}
        {role === 'intern' && (
          <Route
            isPrivate
            exact
            path={INTERN_COMPLETE_PROFILE_URL}
            Component={InternCreateProfile}
            handleChangeState={handleChangeState}
            isLoggedIn={isLoggedIn}
            {...props}
          />
        )}
        <Route
          isPrivate
          exact
          path={MYPROFILE_URL}
          Component={MyProfile}
          isLoggedIn={isLoggedIn}
          {...props}
        />
        <Route
          isPrivate
          exact
          path={INTERN_PROFILE}
          Component={InternProfile}
          isLoggedIn={isLoggedIn}
          {...props}
        />
        <Route
          path={DBS_CHECK_PAGE}
          exact
          isPrivate
          Component={DBSCheckPage}
          isLoggedIn={isLoggedIn}
          {...props}
          layout="rightDiv"
        />

        {['intern', 'host', 'superhost'].includes(role) && (
          <Route
            isPrivate
            exact
            path={ADD_REVIWE_URL}
            Component={AddReview}
            handleChangeState={handleChangeState}
            isLoggedIn={isLoggedIn}
            {...props}
          />
        )}
        <Route
          path={SIGNUP_INTERN}
          exact
          render={linkProps =>
            !isLoggedIn ? (
              <SignUpPage
                handleChangeState={handleChangeState}
                userType="intern"
                {...linkProps}
                {...props}
              />
            ) : (
              <Redirect to={DASHBOARD_URL} />
            )
          }
          {...props}
        />
        <Route
          path={SIGNUP_HOST}
          exact
          render={linkProps =>
            !isLoggedIn ? (
              <SignUpPage
                handleChangeState={handleChangeState}
                userType="host"
                {...linkProps}
                {...props}
              />
            ) : (
              <Redirect to={DASHBOARD_URL} />
            )
          }
          {...props}
        />
        <Route
          path={SIGNUP_ORG}
          exact
          render={linkProps =>
            !isLoggedIn ? (
              <SignUpPage
                handleChangeState={handleChangeState}
                userType="organisation"
                {...linkProps}
                {...props}
              />
            ) : (
              <Redirect to={DASHBOARD_URL} />
            )
          }
          {...props}
        />
        <Route
          path={SIGNIN_URL}
          exact
          render={linkProps =>
            !isLoggedIn ? (
              <SignInPage
                handleChangeState={handleChangeState}
                {...linkProps}
                {...props}
              />
            ) : (
              <Redirect to={DASHBOARD_URL} />
            )
          }
          {...props}
        />
        {/* To be deleted */}
        <Route
          path="/test"
          Component={ThemeTest}
          handleChangeState={handleChangeState}
          isLoggedIn={isLoggedIn}
          {...props}
          layout="sideMenu"
        />
        {props.isMounted && <Route Component={NotFound} {...props} />}
      </Switch>
    </>
  );
}

export default withWindowWidth(Pages, true);
