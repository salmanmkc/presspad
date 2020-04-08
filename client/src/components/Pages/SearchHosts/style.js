import styled from 'styled-components';

export const HeroWrapper = styled.section`
  text-align: right;
  background: blue;
  height: calc(70vw - 80px);
  min-height: 608px;
  max-height: calc(868px - 80px);
`;

export const HeroBackground = styled.img`
  max-width: 100%;
  max-height: 868px;
  min-height: 240px;
  width: 975px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 40px 50px;
  box-shadow: 0px 4px 4px rgba(128, 109, 109, 0.1),
    0px -1px 4px rgba(128, 109, 109, 0.05);
  max-width: 760px;
  z-index: 1000;
  top: 120px;
  background: #fff;
  text-align: left;
  height: 608.31px;
  margin-right: auto;
`;
export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export const SubRow = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const HostsWrapper = styled.section``;
