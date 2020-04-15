const { boolean, date, object, string } = require('yup');

const errMsgs = require('../constants/errorMessages');

const schema = object({
  organisation: string()
    .ensure()
    .required(errMsgs.REQUIRED('organisation')),
  offerLetter: object({
    fileName: string()
      .ensure()
      .required(errMsgs.REQUIRED('offerLetter')),
    isPrivate: boolean().default(true),
  }).required(),
  internshipOfficeAddress: object({
    addressline1: string()
      .ensure()
      .required(errMsgs.REQUIRED('internshipOfficeAddress.addressline1')),
    addressline2: string()
      .ensure()
      .required(errMsgs.REQUIRED('internshipOfficeAddress.addressline2')),
    city: string()
      .ensure()
      .required(errMsgs.REQUIRED('internshipOfficeAddress.city')),
    postcode: string()
      .ensure()
      .required(errMsgs.REQUIRED('internshipOfficeAddress.postcode')),
  }),
  internshipStartDate: date()
    .typeError(errMsgs.INVALID_DATE)
    .required(errMsgs.REQUIRED('internshipStartDate')),
  internshipEndDate: date()
    .typeError(errMsgs.INVALID_DATE)
    .required(errMsgs.REQUIRED('internshipEndDate')),
  internshipContact: object({
    name: string()
      .ensure()
      .required(errMsgs.REQUIRED('internshipContact.name')),
    email: string()
      .ensure()
      .required(errMsgs.REQUIRED('internshipContact.email')),
    phoneNumber: string()
      .ensure()
      .required(errMsgs.REQUIRED('internshipContact.phoneNumber')),
  }),
});

module.exports = schema;
