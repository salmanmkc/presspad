import styled from 'styled-components';

export const Wrapper = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacings[6]};
  > h6 {
    text-align: right;
  }
`;

export const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacings[6]};
  margin-bottom: ${({ theme }) => theme.spacings[5]};
`;

export const DiscountWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacings[2]};
  svg {
    vertical-align: middle;
  }
`;

export const DiscountInput = styled.div`
  width: 130px;
`;
