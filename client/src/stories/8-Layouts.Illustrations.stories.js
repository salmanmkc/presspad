import React from 'react';

import IllustrationsLayout from '../components/Layouts/IllustrationsLayout';

export default {
  title: 'Layouts - Illustrations',
};

export const Email = () => (
  <IllustrationsLayout color="pink" image="email">
    Content goes here
  </IllustrationsLayout>
);

export const EmailLightBlue = () => (
  <IllustrationsLayout color="lightBlue" image="email">
    Content goes here
  </IllustrationsLayout>
);

export const Community = () => (
  <IllustrationsLayout image="community">Content goes here</IllustrationsLayout>
);

export const HomeStay = () => (
  <IllustrationsLayout image="homeStay">Content goes here</IllustrationsLayout>
);

export const Listing = () => (
  <IllustrationsLayout image="listing">Content goes here</IllustrationsLayout>
);

export const PresspadMovement = () => (
  <IllustrationsLayout image="presspadMovement">
    Content goes here
  </IllustrationsLayout>
);
