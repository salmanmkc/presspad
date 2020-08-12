import * as Yup from 'yup';

const validateBankDetails = () =>
  Yup.object().shape({
    bankName: Yup.string()
      .max(20)
      .typeError('must be a string'),
    sortCode: Yup.string()
      .max(20)
      .typeError('must be a string'),
    accountNumber: Yup.string()
      .max(20)
      .typeError('must be a number'),
  });

export default validateBankDetails;
