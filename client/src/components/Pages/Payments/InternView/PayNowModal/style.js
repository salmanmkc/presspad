import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const CardWrapper = styled.div`
  .StripeElement {
    margin: 1.5rem 2rem;
    padding: 0.5rem;
    border-radius: 0.2rem;
    box-shadow: ${({ theme }) => theme.shadows.card};
    background-color: ${({ theme }) => theme.colors.white};
    border: ${({ theme }) => theme.borders.stripeBorder};
  }
  .StripeElement--focus {
    box-shadow: ${({ theme }) => theme.shadows.stripeBorder};
  }
  .StripeElement--invalid {
    border: ${({ theme }) => theme.borders.error};
    box-shadow: none;
  }
`;

export const PaymentModalTitle = styled.h2`
  font-weight: 800;
  font-size: 1.5rem;
  text-align: center;
  margin: 1rem 0 3rem 0;
  opacity: 0.8;
`;

export const InfoMessage = styled.p`
  color: #a5a3a3;
  font-weight: bold;
  padding: 15px;
`;

export const AddCoupon = styled.p`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacings[2]};
`;

export const Link = styled(RouterLink)`
  font-size: 14px;
`;
