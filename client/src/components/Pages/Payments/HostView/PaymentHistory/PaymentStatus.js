import React from 'react';
import styled from 'styled-components';
import { H7C } from '../../../../Common/Typography';

const backgroundColors = {
  upcoming: 'lightGray',
  'payment due': 'lightBlue',
  overdue: 'pink',
  processing: 'darkBlue',
  paid: 'darkGray',
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0.5rem;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, status }) =>
    theme.colors[backgroundColors[status]]};
  color: ${({ theme }) => theme.colors.white};
`;

const PaymentStatus = ({ status }) => (
  <Wrapper status={status}>
    <H7C color="white">{status}</H7C>
  </Wrapper>
);

export default PaymentStatus;
