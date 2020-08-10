import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colors } from '../../../theme';

export const Disclaimer = styled.div``;

export const ErrorMsg = styled.div`
  color: ${colors.pink};
  font-size: 16px;
  text-align: center;
  padding-bottom: 8px;
`;

export const ForgetLink = styled(Link)`
  color: ${({ theme }) => theme.colors.gray3};
`;

export const signupLink = styled(Link)`
  color: ${({ theme }) => theme.colors.pink};
  text-decoration: underline;
`;

export const TitleContainer = styled.div`
  position: absolute;
  left: 0;
  top: 80px;
  width: 500px;
`;

export const TitleWrapper = styled.div`
  width: auto;
  height: 150px;
  display: none;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    display: block;
  }
`;

export const TabletTitle = styled.div`
  display: block;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    display: none;
  }
`;
