import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as T from '../Typography';
import { breakpoints } from '../../../theme';

export const Wrapper = styled.section`
  padding: 20px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  width: 100%;
  color: ${({ theme }) => theme.colors.darkerGray};
  position: relative;
  background-color: white;
`;

export const Title = styled(T.H5C)`
  font-weight: ${({ light }) => light && '300'};
  @media ${breakpoints.tablet} {
    font-size: 24px;
  }
`;

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.darkerGray};
`;

export const UpdateLink = styled(Link)`
  color: ${({ theme }) => theme.colors.darkerGray};
  font-size: 16px;
`;

export const WalletLink = styled(Link)`
  position: absolute;
  bottom: ${({ theme }) => theme.spacings[3]};

  * {
    transition: all ease 0.1s;
  }

  :hover {
    * {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

export const ImageWrapper = styled.div`
  position: absolute;
  right: ${({ right }) => right || 0};
  bottom: ${({ bottom }) => bottom || 0};
`;

export const SocialLinkWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const SocialLink = styled.a`
  margin-right: ${({ theme }) => theme.spacings[2]};
`;

export const HeartWrapper = styled.div`
  display: ${({ top }) => (top ? 'block' : 'none')};
  @media ${breakpoints.tablet} {
    display: ${({ top }) => (top ? 'none' : 'block')};
    position: absolute;
    right: ${({ right }) => right || 0};
    bottom: ${({ bottom }) => bottom || 0};
  }
`;

export const Ratings = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacings[2]};
`;

export const Review = styled.div`
  margin-bottom: ${({ theme }) => theme.spacings[5]};
`;

export const WithIcon = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledBtn = styled.button`
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  margin-left: ${({ theme }) => theme.spacings[2]};
  display: flex;
  align-items: center;
`;

export const StatWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  height: 100%;
  flex-wrap: wrap;
`;

export const StatNum = styled.span`
  color: ${({ theme }) => theme.colors.pink};
  font-size: ${({ fontSize }) => fontSize || '3.125rem'};
  font-weight: bold;
  margin-right: 10px;
`;

export const StatText = styled.span`
  color: ${({ theme }) => theme.colors.darkBlue};
  font-size: ${({ fontSize }) => fontSize || '1.125rem'};
  line-height: ${({ fontSize }) =>
    `calc(${fontSize || '1.125rem'} - 0.125rem)`};
  font-weight: bold;
  padding-bottom: ${({ statSize }) => `calc(${statSize || '1.2rem'})`};
  max-width: 40%;
`;

export const StatSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: ${({ theme }) => theme.spacings[3]};
`;
