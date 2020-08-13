const { object, array, date } = require('yup');
const { REQUIRED_FIELD } = require('../../../../constants/errorMessages');

const schema = array().of(
  object({
    startDate: date()
      .typeError(REQUIRED_FIELD)
      .required(REQUIRED_FIELD),
    endDate: date()
      .typeError(REQUIRED_FIELD)
      .required(REQUIRED_FIELD),
  }),
);

module.exports = schema;
