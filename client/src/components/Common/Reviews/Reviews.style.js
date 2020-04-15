import styled from 'styled-components';
import { colors } from '../../../theme';

export const Wrapper = styled.div`
  color: ${colors.fontLightBlack};
  margin-top: 1.5rem;
`;

export const MainTitle = styled.h3`
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  margin-bottom: 1.75rem;
`;

export const ReviewWrapper = styled.div`
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

export const TitleDiv = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  padding-top: 0;
  margin-left: -1.5rem;
  margin-bottom: -1.75rem;

  align-self: flex-start;
  width: 70%;
  background: ${colors.lightestGray};

  h4 {
    padding-left: 1.5rem;
  }

  @media (max-width: 775.98px) {
    margin-left: 0;

    h4 {
      padding-left: 1rem;
    }
  }
`;
