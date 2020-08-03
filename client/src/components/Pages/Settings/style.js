import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const TabsWrapper = styled.div`
  display: flex;
  margin: ${({ theme }) => theme.spacings[4]} 0;
  flex-wrap: wrap;
`;

export const Tabs = styled(NavLink)`
  color: ${({ theme }) => theme.colors.gray3};
  margin-right: ${({ theme }) => theme.spacings[5]};
  padding: 0 ${({ theme }) => theme.spacings[1]};
  margin-top: ${({ theme }) => theme.spacings[3]};

  &.active {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.pink};
  }
`;

export const Label = styled.label`
  font-family: Glacial Indifference;
  font-weight: bold;
  line-height: 25px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.blue};
  padding-left: ${({ theme }) => theme.spacings[1]};
  margin-top: ${({ theme }) => theme.spacings[4]};
  display: block;
`;

export const Error = styled.p`
  top: 100%;
  color: red;
  font-size: 12px;
  font-style: italic;
`;

export const SuccessHeaderWrapper = styled.p`
  margin-top: ${({ theme }) => theme.spacings[4]};
  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    margin-top: ${({ theme }) => theme.spacings[8]};
  }
`;

export const ChangePassword = styled.div`
  font-family: Glacial Indifference;
  font-weight: bold;
  font-size: 16px;
  line-height: 25px;
  cursor: pointer;
  text-decoration-line: underline;

  color: ${({ theme }) => theme.colors.blue};
`;
