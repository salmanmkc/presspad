import styled from 'styled-components';
import { Collapse } from 'antd';
import { Link as RouterLink } from 'react-router-dom';

export const Wrapper = styled.div`
  @media (max-width: ${({ theme: { size } }) => size.mobileXL}) {
    margin-top: -45px;
    > h2 {
      font-size: 24px;
      background-color: ${({ theme }) => theme.colors.lightestGray};
      width: 116%;
      margin-left: -8%;
      padding-left: 8%;
    }
  }
`;

export const CollapseWrapper = styled(Collapse)`
  background: none;
  border-radius: 0;
  border: 0px;
  overflow: hidden;
  > * {
    border: none;
    border-bottom: none !important;
    background: none;
  }
`;

export const Link = styled(RouterLink)`
  font-size: 14px;
  display: block;
`;

export const ShowMore = styled.button`
  margin-top: -${({ theme }) => theme.spacings[4]};
  margin-bottom: ${({ theme }) => theme.spacings[6]};
  cursor: pointer;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.lightBlue};
  font-size: 14px;
  display: block;
  :focus,
  :active {
    border: none;
    outline: none;
  }
`;
