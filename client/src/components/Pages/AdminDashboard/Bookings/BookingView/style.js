import styled from 'styled-components';

import { colors, shadows, breakpoints } from '../../../../../theme';

export const GoBackWrapper = styled.div`
  position: absolute;
  top: 2rem;
`;

export const Wrapper = styled.div`
  width: 100%;
`;

export const ReviewWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${colors.lightGray};
  padding-bottom: 3rem;
`;

export const Row = styled.div`
  width: 100%;
  margin-top: ${({ mt }) => mt || '2rem'};
  display: flex;
  flex-direction: column;
`;

export const SubRow = styled.div`
  width: 100%;
  margin-top: 1rem;
  display: flex;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 3rem;
`;

export const ActionsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 3rem;
`;

export const ActionsContainer = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;

  padding-top: 2rem;
`;

export const PolicyContainer = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
`;

export const PolicyTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const IconWrapper = styled.div`
  margin-top: 1rem;
  padding-right: 1rem;
`;
