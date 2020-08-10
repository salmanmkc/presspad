import * as Yup from 'yup';

const validateCancelBooking = payedAmount =>
  Yup.object().shape({
    cancellationReason: Yup.string()
      .typeError('must be a string')
      .required('Required'),
    responsibleParty: Yup.string()
      .typeError('must be a string')
      .required('Required'),
    notes: Yup.string().typeError('must be a string'),
    hostRefund: Yup.number()
      .typeError('must be a valid number')
      .required('Required'),
    internRefund: Yup.number()
      .typeError('must be a valid number')
      .required('Required'),
    organisationRefund: Yup.number()
      .typeError('must be a valid number')
      .required('Required'),
    pressPadRefund: Yup.number()
      .typeError('must be a valid number')
      .required('Required'),
    sum: Yup.number().test(
      'Test allocated sum equals payed amount so it equals what has been payed',
      'Please (re)allocate the amount that has been payed.',
      function test(value) {
        return value === payedAmount;
      },
    ),
  });

export default validateCancelBooking;
