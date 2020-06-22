import styled from 'styled-components';
import { Collapse } from 'antd';

export const Wrapper = styled.div`
  @media (max-width: ${({ theme: { size } }) => size.mobileXL}) {
    margin-top: -45px;

    > h2 {
      font-size: 24px;
      background-color: ${({ theme }) => theme.colors.lightestGray};
      width: 116%;
      margin-left: -8%;
      padding-left: 8%;
    }
  }
`;

export const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacings[7]};

  @media (max-width: ${({ theme: { size } }) => size.tablet}) {
    margin-top: ${({ theme }) => theme.spacings[5]};
  }

  > div {
    margin-bottom: ${({ theme }) => theme.spacings[7]};

    @media (max-width: ${({ theme: { size } }) => size.tablet}) {
      width: auto;
      order: -1;
      margin-bottom: ${({ theme }) => theme.spacings[5]};
      .money-bag {
        display: none;
      }
    }
  }
`;

export const CollapseWrapper = styled(Collapse)`
  background: none;
  border-radius: 0;
  margin-bottom: ${({ theme }) => theme.spacings[7]};
  border: 0px;
  overflow: hidden;
  * {
    border: none;
    border-bottom: none !important;
    background: none;
  }
`;
