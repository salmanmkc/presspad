import React from 'react';
import { Route as RouterRoute, Redirect } from 'react-router-dom';
import { Spin } from 'antd';

import { SIGNIN_URL } from '../../../constants/navRoutes';
import Navbar from '../Navbar';

const Route = ({
  isPrivate,
  isMounted,
  isLoggedIn,
  Component,
  path,
  exact,
  render,
  resetState,
  ...rest
}) =>
  isMounted ? (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        userType={rest.role}
        resetState={resetState}
      />
      {isPrivate ? (
        <RouterRoute
          path={path}
          {...rest}
          render={LinkProps =>
            render ||
            (isLoggedIn ? (
              <Component {...LinkProps} {...rest} />
            ) : (
              <Redirect to={SIGNIN_URL} />
            ))
          }
        />
      ) : (
        <RouterRoute
          path={path}
          component={Component}
          render={render}
          exact={exact}
        />
      )}
    </>
  ) : (
    <>
      <Spin size="large" />
    </>
  );
export default Route;
