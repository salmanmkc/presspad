import styled from 'styled-components';
import { Row } from '../Grid';

export const Wrapper = styled.span`
  display: flex;
  margin: ${({ margin }) => margin || 0};
`;

export const Circle = styled.span`
  width: 10px;
  height: 10px;
  border: 1px solid
    ${({ theme, color }) => theme.colors[color] || theme.colors.gray1};
  border-radius: 50%;
  background: ${({ theme, color, current, index }) =>
    current === index && (theme.colors[color] || theme.colors.gray1)};
  margin-right: 5px;
  cursor: ${({ clickable }) => clickable && 'pointer'};
`;

export const Container = styled(Row)`
  align-items: center;
  min-height: 50px;
  bottom: 0;
  position: absolute;
  width: 90%;
  margin-bottom: 20px;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    width: 70%;
  }
`;
