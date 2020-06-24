import React from 'react';
import * as T from '../../Common/Typography';

const textContent = {
  cancelBeforePaymentTop: name => (
    <T.PS mb="5">
      This will immediately cancel your booking with
      <strong> {name} </strong>
      and cannot be undone.
    </T.PS>
  ),
  cancelBeforePaymentBottom: name => (
    <T.PS mb="5">
      Please include a message to let
      <strong> {name.split(' ')[0]} </strong>
      know why you now need to cancel.
    </T.PS>
  ),
  cancelAfterPaymentOneTop: () => (
    <T.PS mb="5">
      Since some payment has already been made this request will need to be
      reviewed personally by the PressPad team.
    </T.PS>
  ),
  cancelAfterPaymentOneBottom: loggedInUserRole => (
    <T.PS mb="5">
      If there is an issue with your{' '}
      {loggedInUserRole === 'host' ? 'guest' : 'host'} that you think we can
      help resolve without you needing to cancel your booking, please{' '}
      <a href="mailto:someone@yoursite.com">contact us</a> here.
    </T.PS>
  ),
  cancelAfterPaymentTwoTop: role => (
    <T.PS mb="5">
      {role === 'intern'
        ? 'So we can review your issue and see if you are entitled to any refund, please provide your reason(s) for why you need to cancel the booking.'
        : 'So we can review your issue and see if you are entitled to any of the payment currently made, please provide your reason(s) for why you need to cancel the booking. '}
    </T.PS>
  ),
  cancelAfterPaymentTwoBottom: () => (
    <T.PS mb="5">
      Please ensure you provide as much detail as possible to assist with our
      review of this issue.
    </T.PS>
  ),
};

export default textContent;
