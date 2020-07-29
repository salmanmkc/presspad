import React from 'react';
import FAQ from '../components/Common/FAQ';

export default {
  title: 'FAQ',
};

const inputs = {
  title: 'What if I don’t fulfill that criteria but am still in need?',
  content:
    'When a candidate completes our bursary application and scores less than 500 points they will not be eligible for a bursary award. However, we will always take into account unique circumstances that require further review and welcome candidates to appeal should they feel a decision is unfair.',
};

export const Default = () => (
  <FAQ title={inputs.title} content={inputs.content} />
);

export const BlueChevro = () => (
  <FAQ title={inputs.title} content={inputs.content} colorChevron="lightBlue" />
);

export const MobileSize = () => (
  <FAQ title={inputs.title} content={inputs.content} size="mobile" />
);

export const MobileSmallSize = () => (
  <FAQ title={inputs.title} content={inputs.content} size="mobileSmall" />
);
