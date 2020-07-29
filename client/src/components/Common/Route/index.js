import React from 'react';
import { Route as RouterRoute, Redirect } from 'react-router-dom';
import { Spin } from 'antd';
import Layout from '../../Layouts';
import { SIGNIN_URL } from '../../../constants/navRoutes';

const Route = ({
  isPrivate,
  isMounted,
  isLoggedIn,
  Component,
  path,
  exact,
  render,
  resetState,
  layout,
  image,
  ...rest
}) => {
  const navbarProps = { userType: rest.role, resetState };

  return (
    <Layout
      layout={layout}
      navbarProps={navbarProps}
      isLoggedIn={isLoggedIn}
      image={image}
    >
      {isMounted ? (
        <>
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
      )}
    </Layout>
  );
};
export default Route;
