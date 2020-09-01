import styled from 'styled-components';

export const Wrapper = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacings[6]};
  > h6 {
    text-align: right;
  }
`;

export const MessageContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
`;

export const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacings[6]};
  margin-bottom: ${({ theme }) => theme.spacings[5]};
`;

export const PreviousPriceWrapper = styled.div`
  display: flex;
  align-items: center;
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

export const DisCountLoadingWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const PaymentMethodWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: ${({ theme }) => theme.spacings[3]};
  & .ant-checkbox-inner {
    width: 22px;
    height: 22px;
    border-radius: 4px;
  }
  & .ant-checkbox-inner::after {
    left: 29%;
  }
  & label {
    margin-left: 0 !important;
    margin-top: ${({ theme }) => theme.spacings[3]};
  }
`;
