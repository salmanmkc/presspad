import styled from 'styled-components';
import * as T from '../../Common/Typography';

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
  align-items: flex-start;
  margin-top: ${({ mt, theme }) => theme.spacings[mt] || 0};
  @media ${({ theme: { breakpoints } }) => breakpoints.mobileXL} {
    flex-direction: row;
    align-items: center;
  }
`;

export const SubRow = styled(Row)`
  display: flex;
  flex-wrap: wrap;
  margin-right: ${({ theme }) => theme.spacings[4]};
  max-width: 313px;
  width: 100%;
  padding: ${({ theme }) => theme.spacings[3]} 0;
`;

export const DatePickersRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 313px;

  @media ${({ theme: { breakpoints } }) => breakpoints.mobileXL} {
    flex-wrap: nowrap;
    max-width: 560px;
  }
`;

export const UntilLabel = styled(T.PBold)`
  align-self: center;
  margin: 0 auto;

  @media ${({ theme: { breakpoints } }) => breakpoints.mobileXL} {
    margin: 0 ${({ theme }) => theme.spacings[3]};
  }
`;
