import styled from 'styled-components';
import { colors } from '../../../theme';

export const Wrapper = styled.div`
  color: ${colors.fontLightBlack};
`;

export const MainTitle = styled.h3`
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  margin-bottom: 1.75rem;
`;

export const ReviewWrapper = styled.div`
  margin-bottom: 2rem;
  font-family: Glacial Indifference;
`;

export const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
`;

export const SubTitle = styled.div`
  font-weight: bold;
  font-size: 20px;
  line-height: 25px;
  margin-right: 1rem;
`;

export const ReviewBody = styled.h3`
  font-style: italic;
  font-weight: 300;
  font-size: 16px;
`;
