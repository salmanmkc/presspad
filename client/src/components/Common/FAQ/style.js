/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const FAQWrapper = styled.div`
  width: 100%;
  max-width: ${({ isMobile }) => (!isMobile ? '460px' : '300px')};

  .ant-collapse-content {
    border: none;
    margin-top: -1rem;
  }

  .ant-collapse-item {
    border: none;
  }
  // .ant-collapse-arrow {
  //   margin-top: -3rem;
  //   width: 40px;
  //   height: 40px;
  //   transition: rotate(180deg) !important;
  //   transform: rotate(90deg) !important;
  // }
`;

export const HeaderLine = styled.div`
  width: 100%;
  border-top: 1px solid #dcdcdc;
  margin-top: 0.7rem;
`;
