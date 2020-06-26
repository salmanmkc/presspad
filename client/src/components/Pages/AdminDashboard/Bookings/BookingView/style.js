import styled from 'styled-components';

import { colors, breakpoints } from '../../../../../theme';

export const GoBackWrapper = styled.div`
  position: absolute;
  top: 2rem;
`;

export const Wrapper = styled.div`
  width: 100%;
  background: ${colors.white};
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
  margin-top: ${({ mt }) => mt || '3rem'};
  display: flex;
  flex-direction: column;
`;

export const SubRow = styled.div`
  width: 100%;
  margin-top: ${({ mt }) => mt || '1rem'};
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
  padding-top: 1rem;
`;

export const ActionsContainer = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  padding-top: 2rem;

  @media ${breakpoints.tablet} {
    width: 100%;
  }
`;

export const PolicyContainer = styled.div`
  display: none;

  @media ${breakpoints.tablet} {
    padding-top: 2rem;
    width: 35%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

export const IconWrapper = styled.div`
  margin-top: 1rem;
  padding-right: 1rem;
`;

export const PolicyContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const List = styled.ul`
  list-style-type: none;
`;

export const ListItem = styled.li`
  padding-top: 1rem;
`;

export const InputWrapper = styled.div`
  width: 315px;
`;

export const TextArea = styled.div`
  width: 432px;
`;
