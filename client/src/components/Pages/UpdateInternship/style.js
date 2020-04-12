import styled from 'styled-components';

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
`;
