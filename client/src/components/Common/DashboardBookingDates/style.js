import styled from 'styled-components';
import { breakpoints } from '../../../theme';

export const Wrapper = styled.section`
  box-shadow: ${({ theme }) => theme.shadows.main};
  padding: ${({ theme }) => theme.spacings[4]};
  width: 100%;
  color: ${({ theme }) => theme.colors.darkerGray};
  position: relative;
  background-color: white;
`;

export const LinkWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: ${({ theme }) => theme.spacings[5]};
  @media ${breakpoints.tablet} {
    justify-content: flex-end;
    margin-top: 0;
  }
`;
