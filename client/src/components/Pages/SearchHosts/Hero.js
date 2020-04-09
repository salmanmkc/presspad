import React from 'react';
import { HeroWrapper, HeroBackground } from './style';
import Form from './Form';
import searchBackground from '../../../assets/search-background.png';

const Hero = ({ formProps }) => (
  <HeroWrapper>
    <Form formProps={formProps} />
    <HeroBackground src={searchBackground} />
  </HeroWrapper>
);

export default Hero;
