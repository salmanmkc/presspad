import { css } from 'styled-components';

const margins = css`
  margin-top: ${({ m, mt, mtT, mtM, theme }) =>
    theme.spacings[mtM] ||
    mtM ||
    theme.spacings[mtT] ||
    mtT ||
    theme.spacings[mt] ||
    mt ||
    theme.spacings[m] ||
    0};
  margin-bottom: ${({ m, mb, mbT, mbM, theme }) =>
    theme.spacings[mbM] ||
    mbM ||
    theme.spacings[mbT] ||
    mbT ||
    theme.spacings[mb] ||
    mb ||
    theme.spacings[m] ||
    0};
  margin-left: ${({ m, ml, mlT, mlM, theme }) =>
    theme.spacings[mlM] ||
    mlM ||
    theme.spacings[mlT] ||
    mlT ||
    theme.spacings[ml] ||
    ml ||
    theme.spacings[m] ||
    0};
  margin-right: ${({ m, mr, mrT, mrM, theme }) =>
    theme.spacings[mrM] ||
    mrM ||
    theme.spacings[mrT] ||
    mrT ||
    theme.spacings[mr] ||
    mr ||
    theme.spacings[m] ||
    0};

  @media ${({ theme }) => theme.breakpoints.mobileL} {
    margin-top: ${({ m, mt, mtT, theme }) =>
      theme.spacings[mtT] ||
      mtT ||
      theme.spacings[mt] ||
      mt ||
      theme.spacings[m] ||
      0};
    margin-bottom: ${({ m, mb, mbT, theme }) =>
      theme.spacings[mbT] ||
      mbT ||
      theme.spacings[mb] ||
      mb ||
      theme.spacings[m] ||
      0};
    margin-left: ${({ m, ml, mlT, theme }) =>
      theme.spacings[mlT] ||
      mlT ||
      theme.spacings[ml] ||
      ml ||
      theme.spacings[m] ||
      0};
    margin-right: ${({ m, mr, mrT, theme }) =>
      theme.spacings[mrT] ||
      mrT ||
      theme.spacings[mr] ||
      mr ||
      theme.spacings[m] ||
      0};
  }

  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin-top: ${({ m, mt, theme }) =>
      theme.spacings[mt] || mt || theme.spacings[m] || 0};
    margin-bottom: ${({ m, mb, theme }) =>
      theme.spacings[mb] || mb || theme.spacings[m] || 0};
    margin-left: ${({ m, ml, theme }) =>
      theme.spacings[ml] || ml || theme.spacings[m] || 0};
    margin-right: ${({ m, mr, theme }) =>
      theme.spacings[mr] || mr || theme.spacings[m] || 0};
  }
`;

export default margins;
