/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const FAQWrapper = styled.div`
  width: 100%;

  .ant-collapse-content {
    border: none;
    margin-top: -1rem;
  }

  .ant-collapse-item {
    border: none;
  }
  .ant-collapse-arrow {
    margin-top: -3rem;
    width: 4rem;

    transition: rotate(180deg) !important;
    transform: rotate(90deg) !important;
  }
`;

export const HeaderLine = styled.div`
  width: 100%;
  border-top: 1px solid #dcdcdc;
  margin-top: 0.7rem;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
