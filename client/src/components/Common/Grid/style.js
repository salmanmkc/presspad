import styled from 'styled-components';
import { breakpoints } from '../../../theme';

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -${({ inner, theme }) => (inner ? theme.vars.gridGutter / 2 : 0)}px !important;
  margin-right: -${({ inner, theme }) => (inner ? theme.vars.gridGutter / 2 : 0)}px !important;
  width: ${({ inner, theme }) =>
    inner ? `calc(100% + ${theme.vars.gridGutter}px)` : '100%'};
  margin-top: ${({ theme, mt }) => theme.spacings[mt] || 0};
  margin-bottom: ${({ theme, mb }) => theme.spacings[mb] || 0};
  align-items: ${({ ai }) => ai || 'flex-start'};

  justify-content: ${({ jcT, jc, jcM }) => jcM || jcT || jc || 'flex-start'};

  @media ${breakpoints.mobileM} {
    justify-content: ${({ jcT, jc }) => jcT || jc || 'flex-start'};
  }

  @media ${breakpoints.tablet} {
    justify-content: ${({ jc }) => jc || 'flex-start'};
  }
`;

export const Col = styled.div`
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: ${({ theme, mt }) => theme.spacings[mt] || 0};
  margin-bottom: ${({ theme, mb }) => theme.spacings[mb] || 0};
  flex-shrink: 0;
  position: relative;
  width: 100%;
  min-height: 1px;
  height: 100%;

  flex-basis: ${({ c1, theme }) =>
    `calc(${(c1 / theme.vars.columns.mobile) * 100}%)`};
  max-width: ${({ c1, theme }) =>
    `calc(${(c1 / theme.vars.columns.mobile) * 100}%)`};
  display: ${({ c1 }) => (c1 ? 'block' : 'none')};

  @media ${breakpoints.mobileM} {
    flex-basis: ${({ c2, theme }) =>
      `calc(${(c2 / theme.vars.columns.tablet) * 100}%)`};
    max-width: ${({ c2, theme }) =>
      `calc(${(c2 / theme.vars.columns.tablet) * 100}%)`};
    display: ${({ c2 }) => (c2 ? 'block' : 'none')};
  }

  @media ${breakpoints.tablet} {
    flex-basis: ${({ c3, theme }) =>
      `calc(${(c3 / theme.vars.columns.desktop) * 100}%)`};
    max-width: ${({ c3, theme }) =>
      `calc(${(c3 / theme.vars.columns.desktop) * 100}%)`};
    display: ${({ c3 }) => (c3 ? 'block' : 'none')};
  }
`;
