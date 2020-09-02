const { object, string, boolean, number } = require('yup');
const { REQUIRED_FIELD } = require('../../../../constants/errorMessages');

const schema = object({
  amount: number()
    .typeError(REQUIRED_FIELD)
    .moreThan(0)
    .lessThan(100000)
    .required(REQUIRED_FIELD)
    .nullable(),
  name: string()
    .required(REQUIRED_FIELD)
    .nullable(),
  line1: string()
    .required(REQUIRED_FIELD)
    .nullable(),
  city: string()
    .required(REQUIRED_FIELD)
    .nullable(),
  postcode: string()
    .required(REQUIRED_FIELD)
    .nullable(),
  cardNumber: object({
    complete: boolean()
      .oneOf([true])
      .required(REQUIRED_FIELD),
  }),
  cardExpiry: object({
    complete: boolean()
      .oneOf([true])
      .required(REQUIRED_FIELD),
  }),
  cardCvc: object({
    complete: boolean()
      .oneOf([true])
      .required(REQUIRED_FIELD),
  }),
});

module.exports = schema;
