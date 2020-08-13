import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  padding-top: ${({ theme }) => theme.spacings.headerHeight};
  min-height: 100vh;
`;

export const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
`;
