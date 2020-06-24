import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    min-height: 530px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  min-height: 420px;

  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    width: 63%;
  }
`;

export const SideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem auto 0 0;

  // desktop
  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    align-items: center;
    position: absolute;
    top: 250px;
    right: 0;
    width: 35%;
    max-width: 507px;
  }
`;

export const SectionWrapper = styled.div`
  margin-top: 2rem;

  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    margin-top: 4rem;
  }
`;

export const PanelWrapper = styled.div`
  width: 100%;
  margin-top: 4rem;

  .ant-collapse-header {
    border: none;
    font-family: Glacial Indifference;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 31px;
    text-transform: uppercase;
  }
  .active.ant-collapse {
    border: none;
  }
  .ant-collapse-item {
    border: none;
  }
  .ant-collapse-arrow {
    margin-top: -0.5rem;
    transition: rotate(180deg) !important;
    transform: rotate(90deg) !important;
  }
`;

export const HeadlineWrapper = styled.div`
  background: ${({ theme }) => theme.colors.lightestGray};
  width: 100%;
  display: flex;
  height: 50px;
  align-items: center;
  margin-top: -2rem;

  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    background: none;
  }
`;

export const ImageWrapper = styled.div``;

export const BlueLink = styled(Link)`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: ${({ disabled }) => (disabled ? '#828282' : '#0ac7e7')};
`;

export const TableWrapper = styled.div`
  width: 100%;
  thead[class*='ant-table-thead'] th {
    font-family: Glacial Indifference;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 14px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.gray};
  }
  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
  }
`;
