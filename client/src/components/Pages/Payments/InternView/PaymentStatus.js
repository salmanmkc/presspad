import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { H7C } from '../../../Common/Typography';

const backgroundColors = {
  upcoming: 'blue',
  'payment due': 'lightBlue',
  overdue: 'pink',
  processing: 'darkBlue',
  paid: 'darkGray',
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 115px;
  padding: 0.5rem;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, status }) =>
    theme.colors[backgroundColors[status]]};
  color: ${({ theme }) => theme.colors.white};
`;

const PaymentStatus = ({ dueDate, paid }) => {
  let status;
  if (paid) {
    status = 'paid';
  } else if (moment(dueDate).isBefore(moment())) {
    status = 'overdue';
  } else if (moment(dueDate).isSame(moment())) {
    status = 'payment due';
  } else {
    status = 'upcoming';
  }

  return (
    <Wrapper status={status}>
      <H7C color="white">{status === 'payment due' ? 'due' : status}</H7C>
    </Wrapper>
  );
};

export default PaymentStatus;
