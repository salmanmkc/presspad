const Joi = require('@hapi/joi');

const withdrawSchema = Joi.object({
  bankName: Joi.string().required('Required'),
  bankSortCode: Joi.string().required('Required'),
  accountNumber: Joi.string().required('Required'),
  amount: Joi.number()
    .required('Required')
    .min(1, 'must be valid value'),
});

const donateSchema = Joi.object({
  amount: Joi.number()
    .required('Required')
    .min(1, 'must be valid value'),
});

const updateAvailabilitySchema = Joi.object({
  availableDates: Joi.array()
    .min(1)
    .items(
      Joi.object({
        startDate: Joi.date(),
        endDate: Joi.date(),
      }),
    )
    .required(),
  acceptAutomatically: Joi.boolean().default(true),
});

module.exports = {
  withdrawSchema,
  donateSchema,
  updateAvailabilitySchema,
};
