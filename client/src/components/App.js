import React, { Component } from 'react';
import { StripeProvider } from 'react-stripe-elements';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import { ThemeProvider } from 'styled-components';

import { API_USER_URL } from '../constants/apiRoutes';

import theme from '../theme';
import Pages from './Pages';

export const initialState = {
  isLoggedIn: false,
  id: null,
  name: null,
  email: null,
  role: null,
};

class App extends Component {
  state = { isMounted: false, stripe: null, ...initialState };

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
    this.setState({ ...initialState, isMounted: true });
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
    const { isLoggedIn, stripe } = this.state;

    return (
      <StripeProvider stripe={stripe}>
        <Router>
          <div className="App">
            <ThemeProvider theme={theme}>
              <Pages
                handleChangeState={this.handleChangeState}
                isLoggedIn={isLoggedIn}
                {...this.state}
                resetState={this.resetState}
              />
            </ThemeProvider>
          </div>
        </Router>
      </StripeProvider>
    );
  }
}

export default App;
