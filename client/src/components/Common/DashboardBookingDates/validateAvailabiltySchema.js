import * as Yup from 'yup';

const validateAvailabilitySchema = () =>
  Yup.object().shape({
    availableDates: Yup.array()
      .of(
        Yup.object({
          startDate: Yup.date(),
          endDate: Yup.date(),
        }),
      )
      .required(),
    acceptAutomatically: Yup.boolean().default(false),
  });

export default validateAvailabilitySchema;
