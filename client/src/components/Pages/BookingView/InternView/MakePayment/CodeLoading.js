import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const opacity = keyframes`
  0% { 
    opacity: 1;
  }
  50% { 
    opacity: 0;
  }
  100% { 
    opacity: 1;
  }  
`;

const Wrapper = styled.div`
  width: 60px;
  height: 12px;
  text-align: right;
  display: flex;
  justify-content: space-around;
`;

const customCss = css`
  width: 1px;
  height: 12px;
  background: ${({ theme }) => theme.colors.lightGray};
  margin: 0 1px;
  display: inline-block;
  animation: ${opacity} 2000ms infinite ease-in-out;
`;

const FirstLine = styled.span`
  ${customCss}
  animation-delay: 200ms;
`;
const SecondLine = styled.span`
  ${customCss}
  animation-delay: 400ms;
`;
const ThirdLine = styled.span`
  ${customCss}
  animation-delay: 600ms;
`;
const FourthLine = styled.span`
  ${customCss}
  animation-delay: 800ms;
`;
const FifthLine = styled.span`
  ${customCss}
  animation-delay: 800ms;
`;
const SixthLine = styled.span`
  ${customCss}
  animation-delay: 1000ms;
`;
const SeventhLine = styled.span`
  ${customCss}
  animation-delay: 1200ms;
`;
const EiegthLine = styled.span`
  ${customCss}
  animation-delay: 1400ms;
`;
const NinethLine = styled.span`
  ${customCss}
  animation-delay: 1600ms;
`;

const CodeLoading = () => (
  <Wrapper>
    <FirstLine />
    <SecondLine />
    <ThirdLine />
    <FourthLine />
    <FifthLine />
    <SixthLine />
    <SeventhLine />
    <EiegthLine />
    <NinethLine />
  </Wrapper>
);

export default CodeLoading;
