import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  > button {
    align-self: flex-end;
  }
  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    min-height: 530px;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  min-height: 420px;

  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    width: 50%;
    max-width: 436px;
    > button {
      width: 195px;
    }
  }
`;

export const FromNow = styled.span`
  color: ${({ theme }) => theme.colors.gray};
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacings[4]};
  > button {
    width: 45%;
    min-width: unset;
    height: 35px;
    font-size: 14px;
    line-height: 14px;
    padding: ${({ theme }) => theme.spacings[2]};
    > span {
      display: none;
    }
  }
  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    > button {
      width: 215px;
      height: 59px;
      font-size: 18px;
      line-height: 23px;
      padding: ${({ theme }) => theme.spacings[3]};
      > span {
        display: inline;
      }
    }
  }
`;

export const Error = styled.div`
  position: absolute;
  color: ${({ theme }) => theme.colors.pink};
  font-size: 14px;
  bottom: -28px;
  margin-left: ${({ theme }) => theme.spacings[2]};
`;

export const TipsWrapper = styled.div`
  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    margin-bottom: ${({ theme }) => theme.spacings[5]};
  }
  > div {
    margin-top: ${({ theme }) => theme.spacings[6]};
    margin-bottom: ${({ theme }) => theme.spacings[5]};
    @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
      position: absolute;
      top: 470px;
      right: 0;
      width: 50%;
      max-width: 507px;
    }
  }
`;

export const ProfileLink = styled(Link)`
  color: ${({ theme }) => theme.colors.blue};
  font-weight: bold;
`;

export const FireWorksImg = styled.div`
  display: none;
  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    display: inline-block;
    width: 61px;
    height: 61px;
    background-image: url(${({ src }) => src});
    margin-left: ${({ theme }) => theme.spacings[4]};
    margin-bottom: -${({ theme }) => theme.spacings[1]};
  }
`;
