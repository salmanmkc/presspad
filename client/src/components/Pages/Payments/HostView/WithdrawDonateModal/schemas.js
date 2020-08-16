import * as Yup from 'yup';

import { formatPrice } from '../../../../../helpers';

export const withdrawSchema = canBeWithdraw =>
  Yup.object().shape({
    bankName: Yup.string()
      .typeError('must be a string')
      .required('Required'),
    sortCode: Yup.string()
      .typeError('must be a string')
      .required('Required'),
    accountNumber: Yup.string()
      .typeError('must be a string')
      .required('Required'),
    withdrawValuePennies: Yup.number()
      .typeError('must be a valid number')
      .required('Required')
      .min(1, 'must be valid value')
      .max(
        canBeWithdraw,
        `can't donate more than what you have: ${formatPrice(canBeWithdraw)}`,
      ),
  });

export const donateSchema = canBeWithdraw =>
  Yup.object().shape({
    donateValuePennies: Yup.number()
      .typeError('must be a valid number')
      .required('Required')
      .min(1, 'must be valid value')
      .max(
        canBeWithdraw,
        `can't donate more than what you have: ${formatPrice(canBeWithdraw)}`,
      ),
  });
