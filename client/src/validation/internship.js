const { boolean, date, object, string } = require('yup');

const errMsgs = require('../constants/errorMessages');

const schema = object({
  organisation: string()
    .ensure()
    .required(errMsgs.REQUIRED),
  offerLetter: object({
    fileName: string()
      .ensure()
      .required(errMsgs.REQUIRED),
    isPrivate: boolean().default(true),
  }).required(),
  internshipOfficeAddress: object({
    addressline1: string()
      .ensure()
      .required(errMsgs.REQUIRED),
    addressline2: string().ensure(),
    city: string()
      .ensure()
      .required(errMsgs.REQUIRED),
    postcode: string()
      .ensure()
      .required(errMsgs.REQUIRED),
  }),
  internshipStartDate: date()
    .typeError(errMsgs.INVALID_DATE)
    .required(errMsgs.REQUIRED),
  internshipEndDate: date()
    .typeError(errMsgs.INVALID_DATE)
    .required(errMsgs.REQUIRED),
  internshipContact: object({
    name: string()
      .ensure()
      .required(errMsgs.REQUIRED),
    email: string()
      .ensure()
      .required(errMsgs.REQUIRED),
    phoneNumber: string()
      .ensure()
      .required(errMsgs.REQUIRED),
  }),
});

module.exports = schema;
