import styled from 'styled-components';

export const Wrapper = styled.div`
  > .ant-rate {
    color: ${({ theme }) => theme.colors.lightBlue};
  }
  .ant-rate-star-zero svg > path:last-child {
    display: none;
  }
  .ant-rate-star-half svg > path:last-child {
    display: none;
  }
  .ant-rate-star-first svg > path:last-child {
    display: inline;
  }
`;

export const TextAreaWrapper = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacings[7]};

  > p {
    position: absolute;
  }
`;
