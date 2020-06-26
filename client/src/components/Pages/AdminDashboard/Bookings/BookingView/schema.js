import * as Yup from 'yup';

const validateCancelBooking = Yup.object().shape({
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
});

export default validateCancelBooking;
