import React from 'react';
import { HeroWrapper, HeroBackground } from './style';
import Form from './Form';
import searchBackground from '../../../assets/search-background.png';

const Hero = () => (
  <HeroWrapper>
    <Form />
    <HeroBackground src={searchBackground} />
  </HeroWrapper>
);

export default Hero;
