import styled, { css } from 'styled-components';

const centerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.button`
  ${centerStyle};
  cursor: pointer;
  width: 150px;
  border: none;
  background: none;
`;

export const IconWrapper = styled.div`
  ${centerStyle};
  margin-right: 8px;
`;
