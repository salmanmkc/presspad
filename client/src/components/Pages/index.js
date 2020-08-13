import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

//  COMMON COMPONENTS
import Route from '../Common/Route';
import NotFound from '../Common/NotFound';

import HostCreateProfile from './HostCreateProfile';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import Dashboard from './Dashboard';
import HostProfile from './HostProfile';
import InternCreateProfile from './InternCreateProfile';
import { AdminDashboard, AdminBursary, AdminBursaryResponse } from './Admin';
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
import AddFunds from './OrgDashboard/AddFunds';
import SignUpFunnelPage from './SignUpFunnelPage';

import Settings from './Settings';
import ReferralSchema from './ReferralSchema';
import ResetPassword, { SetPassword } from './ResetPassword';
import DeleteAccountSuccess from './Settings/DeleteAccountSuccess';
import UnderReview from './Settings/UnderReview';
import * as InternSignUpFlow from './InternSignUpFlow';

import { withWindowWidth } from '../../HOCs';
import {
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
  SETTINGS_URL,
  REFERRAL_URL,
  // DELETE_ACCOUNT_SUCCESS,
  RESET_PASSWORD,
  SET_PASSWORD,
  ADD_FUNDS_URL,
  SETTINGS,
  ADMIN_BURSARY,
  ADMIN_BURSARY_APPROVE,
  ADMIN_BURSARY_PREAPPROVE,
  ADMIN_BURSARY_REJECT,
  ADMIN_BURSARY_SUCCESS,
  SIGNUP_URL,
  INTERN_SIGNUP_ABOUT_ME,
  INTERN_SIGNUP_BURSARY,
  INTERN_SIGNUP_PROFILE,
  INTERN_SIGNUP_VERIFICATIONS,
  INTERN_SIGNUP_WELCOME,
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
          exact
          isPrivate
          path={INTERN_SIGNUP_ABOUT_ME}
          Component={InternSignUpFlow.AboutMe}
          isLoggedIn={isLoggedIn}
          layout="signup"
          {...props}
        />

        <Route
          exact
          isPrivate
          path={INTERN_SIGNUP_PROFILE}
          Component={InternSignUpFlow.MyProfile}
          isLoggedIn={isLoggedIn}
          layout="signup"
          {...props}
        />

        <Route
          exact
          isPrivate
          path={INTERN_SIGNUP_VERIFICATIONS}
          Component={InternSignUpFlow.Verifications}
          isLoggedIn={isLoggedIn}
          layout="signup"
          {...props}
        />

        <Route
          exact
          isPrivate
          path={INTERN_SIGNUP_BURSARY}
          Component={InternSignUpFlow.Bursary}
          isLoggedIn={isLoggedIn}
          layout="signup"
          {...props}
        />

        <Route
          exact
          isPrivate
          path={INTERN_SIGNUP_WELCOME}
          Component={InternSignUpFlow.Welcome}
          isLoggedIn={isLoggedIn}
          layout="signup"
          {...props}
        />

        <Route
          exact
          path={SETTINGS.DELETE_ACCOUNT_SUCCESS}
          Component={DeleteAccountSuccess}
          layout="illustrations"
          mobileText="WE HOPE TO SEE YOU AGAIN!"
          {...props}
        />

        <Route
          exact
          path={SETTINGS.UNDER_REVIEW}
          Component={UnderReview}
          layout="illustrations"
          {...props}
        />

        <Route
          isPrivate
          path={SETTINGS_URL}
          Component={Settings}
          handleChangeState={handleChangeState}
          isLoggedIn={isLoggedIn}
          resetState={resetState}
          layout="sideMenu"
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
          footer
          {...props}
        />
        {/* public host profile */}
        <Route
          exact
          path={HOST_PROFILE_SOFT}
          Component={HostProfile}
          handleChangeState={handleChangeState}
          isLoggedIn={isLoggedIn}
          footer
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
          footer
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
            layout="sideMenu"
            {...props}
          />
        )}
        {role === 'admin' && (
          <Route
            isPrivate
            exact
            path={ADMIN_BURSARY}
            Component={AdminBursary}
            handleChangeState={handleChangeState}
            isLoggedIn={isLoggedIn}
            layout="sideMenu"
            {...props}
          />
        )}
        {role === 'admin' && (
          <Route
            isPrivate
            exact
            path={ADMIN_BURSARY_APPROVE}
            type="approve"
            Component={AdminBursaryResponse}
            handleChangeState={handleChangeState}
            isLoggedIn={isLoggedIn}
            layout="sideMenu"
            {...props}
          />
        )}
        {role === 'admin' && (
          <Route
            isPrivate
            exact
            path={ADMIN_BURSARY_PREAPPROVE}
            type="preapprove"
            Component={AdminBursaryResponse}
            handleChangeState={handleChangeState}
            isLoggedIn={isLoggedIn}
            layout="sideMenu"
            {...props}
          />
        )}
        {role === 'admin' && (
          <Route
            isPrivate
            exact
            path={ADMIN_BURSARY_REJECT}
            type="reject"
            Component={AdminBursaryResponse}
            handleChangeState={handleChangeState}
            isLoggedIn={isLoggedIn}
            layout="sideMenu"
            {...props}
          />
        )}
        {role === 'admin' && (
          <Route
            isPrivate
            exact
            path={ADMIN_BURSARY_SUCCESS}
            type="success"
            Component={AdminBursaryResponse}
            handleChangeState={handleChangeState}
            isLoggedIn={isLoggedIn}
            layout="sideMenu"
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
          layout="login"
          color="blue"
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
          layout="login"
          color="blue"
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
          layout="login"
          color="blue"
          {...props}
        />
        {['organisation'].includes(role) && (
          <Route
            exact
            path={ADD_FUNDS_URL}
            Component={AddFunds}
            layout="rightDiv"
            {...props}
          />
        )}
        <Route
          path={SIGNUP_URL}
          exact
          render={linkProps =>
            !isLoggedIn ? (
              <SignUpFunnelPage {...linkProps} {...props} />
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
