import React, { Component } from 'react';
import { StripeProvider } from 'react-stripe-elements';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import { ThemeProvider } from 'styled-components';

// Antd style
import 'antd/lib/layout/style/index.css';
import 'antd/lib/input/style/index.css';
import 'antd/lib/button/style/index.css';
import 'antd/lib/menu/style/index.css';
import 'antd/lib/carousel/style/index.css';
import 'antd/lib/breadcrumb/style/index.css';
import 'antd/lib/icon/style/index.css';
import 'antd/lib/collapse/style/index.css';
import 'antd/lib/table/style/index.css';
import 'antd/lib/avatar/style/index.css';
import 'antd/lib/grid/style/index.css';
import 'antd/lib/checkbox/style/index.css';
import 'antd/lib/date-picker/style/index.css';
import 'antd/lib/divider/style/index.css';
import 'antd/lib/message/style/index.css';
import 'antd/lib/modal/style/index.css';
import 'antd/lib/spin/style/index.css';
import 'antd/lib/alert/style/index.css';

import { API_USER_URL } from '../constants/apiRoutes';

import Navbar from './Common/Navbar';
import theme from '../theme';
import Pages from './Pages';

export const initialState = {
  isLoggedIn: false,
  id: null,
  name: null,
  email: null,
  isMounted: false,
  role: null,
  stripe: null,
};

class App extends Component {
  state = {
    ...initialState,
  };

  componentDidMount() {
    this.getUserInfo();
    if (window.Stripe) {
      this.setState({
        stripe: window.Stripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY),
      });
    } else {
      // eslint-disable-next-line no-unused-expressions
      document.querySelector('#stripe-js') &&
        document.querySelector('#stripe-js').addEventListener('load', () => {
          // Create Stripe instance once Stripe.js loads
          this.setState({
            stripe: window.Stripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY),
          });
        });
    }
    window.scrollTo(0, 0);
  }

  handleChangeState = data => {
    this.setState({ ...data, isMounted: true });
  };

  resetState = () => {
    this.setState(initialState);
  };

  getUserInfo = () => {
    axios
      .get(API_USER_URL)
      .then(({ data }) => {
        if (data) {
          this.setState({ ...data, isLoggedIn: true, isMounted: true });
        } else {
          this.setState({
            ...initialState,
            isMounted: true,
          });
        }
      })
      .catch(err => this.setState({ error: err.responses, isMounted: true }));
  };

  render() {
    const { isLoggedIn, role, stripe } = this.state;

    return (
      <StripeProvider stripe={stripe}>
        <Router>
          <div className="App">
            <ThemeProvider theme={theme}>
              <Navbar
                isLoggedIn={isLoggedIn}
                userType={role}
                resetState={this.resetState}
              />
              <Pages
                handleChangeState={this.handleChangeState}
                isLoggedIn={isLoggedIn}
                {...this.state}
              />
            </ThemeProvider>
          </div>
        </Router>
      </StripeProvider>
    );
  }
}

export default App;
