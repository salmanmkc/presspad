const { object, string, array } = require('yup');
const { DEFAULT_REQUIRED } = require('../constants/errorMessages');

const accountDetails = prevValues =>
  object({
    firstName: prevValues.firstName
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    lastName: prevValues.lastName
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    phone: prevValues.phone
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    email: prevValues.email
      ? string()
          .email()
          .required(DEFAULT_REQUIRED)
      : string()
          .email()
          .nullable(),
  });

const createProfile = prevValues => {
  const isOpportunityRequired = property =>
    // eslint-disable-next-line no-shadow
    function isOpportunityRequired(value) {
      const { key } = this.parent;
      const opportunity = prevValues.internshipOpportunities[key];

      if (opportunity && opportunity[property]) {
        return !!value;
      }
      return true;
    };

  return object({
    description: prevValues.description
      ? string()
          .ensure()
          .wordLengthValidator(250)
          .required(DEFAULT_REQUIRED)
      : string()
          .ensure()
          .wordLengthValidator(250)
          .nullable(),
    internshipOpportunities: array()
      .of(
        object().shape({
          opportunity: string().test(
            'isRequired',
            DEFAULT_REQUIRED,
            isOpportunityRequired('opportunity'),
          ),
          link: string().test(
            'isRequired',
            DEFAULT_REQUIRED,
            isOpportunityRequired('link'),
          ),
          details: string().test(
            'isRequired',
            DEFAULT_REQUIRED,
            isOpportunityRequired('details'),
          ),
        }),
      )
      .min(prevValues.internshipOpportunities.length),
    contactDetails: object({
      name:
        prevValues.contactDetails && prevValues.contactDetails.name
          ? string().required(DEFAULT_REQUIRED)
          : string().nullable(),
      phone:
        prevValues.contactDetails && prevValues.contactDetails.phone
          ? string().required(DEFAULT_REQUIRED)
          : string().nullable(),
      email:
        prevValues.contactDetails && prevValues.contactDetails.email
          ? string()
              .email()
              .required(DEFAULT_REQUIRED)
          : string()
              .email()
              .nullable(),
    }),
  });
};

module.exports = {
  accountDetails,
  createProfile,
};
