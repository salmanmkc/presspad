import React from 'react';
import styled from 'styled-components';
import { H7C } from '../Typography';
import { colors } from '../../../theme';

const fontColors = {
  pending: 'white',
  accepted: 'blue',
  confirmed: 'blue',
  cancelled: 'white',
  completed: 'white',
  rejected: 'white',
};

const backgroundColors = {
  pending: colors.pink,
  accepted: colors.white,
  confirmed: colors.white,
  cancelled: colors.lightGray,
  completed: colors.darkBlue,
  rejected: colors.lightGray,
};

const borders = {
  accepted: `2px solid ${colors.lightBlue}`,
  confirmed: `2px solid ${colors.lightBlue}`,
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0.5rem;
  justify-content: center;
  align-items: center;
`;

const BookingStatus = ({ status }) => (
  <Wrapper
    style={{
      background: backgroundColors[status] || colors.white,
      border: borders[status] || 'none',
    }}
  >
    <H7C color={fontColors[status]}>{status}</H7C>
  </Wrapper>
);

export default BookingStatus;
