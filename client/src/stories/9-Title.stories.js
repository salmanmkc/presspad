import React from 'react';
import Title from '../components/Common/Title';

export default {
  title: 'Title',
};

export const TitleComponent = () => (
  <div style={{ width: 600 }}>
    <Title>Welcome to the PressPad Movement!</Title>
  </div>
);

export const TitleWithBackground = () => (
  <div style={{ width: 600 }}>
    <Title withBg>GET VERIFIED</Title>
  </div>
);
