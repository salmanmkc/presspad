const { object, string, array, number, date } = require('yup');
const { REQUIRED_FIELD } = require('../../../../constants/errorMessages');

const schema = object({
  discountRate: number()
    .typeError(REQUIRED_FIELD)
    .moreThan(0)
    .lessThan(101),
  name: string().required(REQUIRED_FIELD),
  email: string()
    .email()
    .required(REQUIRED_FIELD),
  message: string().nullable(),
  multiDateRange: array().of(
    object({
      startDate: date(),
      endDate: date(),
    }).required(),
  ),
});

module.exports = schema;
