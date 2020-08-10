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
import UpdateInternship from './UpdateInternship';
import ThemeTest from './ThemeTest';
import Bookings from './Bookings';
import DBSCheckPage from './DBSCheck';
import PaymentsPage from './Payments';
import CancellationConfirm from './CancellationConfirm';

import ReferralSchema from './ReferralSchema';
import Settings, { DeleteAccountSuccess } from './Settings';
import ResetPassword, { SetPassword } from './ResetPassword';

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
  HOST_PROFILE_SOFT,
  PAYMENTS_URL,
  BOOKINGS_INTERNSHIP_URL,
  BOOKINGS_URL,
  CANCELLATION_CONFIRM,
  REFERRAL_URL,
  SETTINGS_URL,
  DELETE_ACCOUNT_SUCCESS,
  RESET_PASSWORD,
  SET_PASSWORD,
} from '../../constants/navRoutes';

function Pages(props) {
  const {
    handleChangeState,
    isLoggedIn,
    role,
    windowWidth,
    resetState,
  } = props;

  return (
    <>
      <Switch>
        <Route path={HOME_URL} exact Component={LandingPage} {...props} />
        {/* protected host profile */}

        <Route
          exact
          isPrivate
          path={REFERRAL_URL}
          Component={ReferralSchema}
          isLoggedIn={isLoggedIn}
          layout="sideMenu"
          {...props}
        />

        <Route
          isPrivate
          exact
          path={SETTINGS_URL}
          Component={Settings}
          handleChangeState={handleChangeState}
          isLoggedIn={isLoggedIn}
          resetState={resetState}
          layout="sideMenu"
          {...props}
        />

        <Route
          exact
          path={DELETE_ACCOUNT_SUCCESS}
          Component={DeleteAccountSuccess}
          layout="illustrations"
          mobileText="WE HOPE TO SEE YOU AGAIN!"
          {...props}
        />

        {/* protected host profile */}
        <Route
          exact
          path={RESET_PASSWORD}
          Component={ResetPassword}
          isLoggedIn={isLoggedIn}
          layout="illustrations"
          image="email"
          color="lightBlue"
          {...props}
        />
        <Route
          exact
          path={SET_PASSWORD}
          Component={SetPassword}
          isLoggedIn={isLoggedIn}
          layout="illustrations"
          image="email"
          color="lightBlue"
          {...props}
        />

        {/* protected host profile */}
        <Route
          isPrivate
          exact
          path={HOST_PROFILE}
          Component={HostProfile}
          handleChangeState={handleChangeState}
          isLoggedIn={isLoggedIn}
          {...props}
        />
        {/* public host profile */}
        <Route
          exact
          path={HOST_PROFILE_SOFT}
          Component={HostProfile}
          handleChangeState={handleChangeState}
          isLoggedIn={isLoggedIn}
          {...props}
        />

        <Route
          isPrivate
          exact
          path={BOOKINGS_INTERNSHIP_URL}
          Component={UpdateInternship}
          handleChangeState={handleChangeState}
          isLoggedIn={isLoggedIn}
          layout="sideMenu"
          {...props}
        />
        <Route
          isPrivate
          layout="sideMenu"
          path={BOOKING_VIEW_URL}
          Component={BookingView}
          {...props}
        />
        {/* CANCELLATION COMPONENTS */}
        <Route
          isPrivate
          layout="sideMenu"
          exact
          path={CANCELLATION_CONFIRM}
          Component={CancellationConfirm}
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
        <Route
          isPrivate
          exact
          path={BOOKINGS_URL}
          Component={Bookings}
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
          path={PAYMENTS_URL}
          exact
          isPrivate
          Component={PaymentsPage}
          isLoggedIn={isLoggedIn}
          layout="sideMenu"
          {...props}
        />
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
          exact
          path={SIGNIN_URL}
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
          layout="login"
          color="blue"
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
