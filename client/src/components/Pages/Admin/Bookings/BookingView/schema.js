import * as Yup from 'yup';

const validateCancelBooking = paidAmount =>
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
      'Test allocated sum equals paid amount so it equals what has been paid',
      'Please (re)allocate the amount that has been paid.',
      function test(value) {
          return value === paidAmount;
      },
    ),
  });

export default validateCancelBooking;
