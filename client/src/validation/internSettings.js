const { object, string, boolean, date, mixed } = require('yup');
const { signup, DEFAULT_REQUIRED } = require('../constants/errorMessages');

const {
  NAME_REQUIRED,
  NAME_SHORT,
  NAME_LONG,
  EMAIL_REQUIRED,
  EMAIL_INVALID,
  PASSWORD_REQUIRED,
  PASSWORD_WEAK,
} = signup;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const myAccountSchema = object({
  name: string()
    .required(NAME_REQUIRED)
    .min(3, NAME_SHORT)
    .max(15, NAME_LONG),
  email: string()
    .email(EMAIL_INVALID)
    .required(EMAIL_REQUIRED),
  oldPassword: string().when('changePasswordActive', {
    is: true,
    then: string().required(PASSWORD_REQUIRED),
    otherwise: string().nullable(),
  }),
  newPassword: string().when('changePasswordActive', {
    is: true,
    then: string()
      .matches(passwordPattern, PASSWORD_WEAK)
      .nullable(),
    otherwise: string().nullable(),
  }),
  changePasswordActive: boolean().nullable(),
});

const aboutMeSchema = prevValues =>
  object({
    birthDate: prevValues.birthDate
      ? mixed().required(DEFAULT_REQUIRED)
      : mixed().nullable(),
    phoneNumber: prevValues.phoneNumber
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    hometown: prevValues.hometown
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    lastStudySubject: prevValues.lastStudySubject
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    lastStudyUniversity: prevValues.lastStudyUniversity
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    hearAboutPressPadAnswer: prevValues.hearAboutPressPadAnswer
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    gender: prevValues.gender
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    genderOther: string().when('gender', {
      is: gender => gender.includes('Other'),
      then: string().required(DEFAULT_REQUIRED),
      otherwise: string().nullable(),
    }),
    sexualOrientation: prevValues.sexualOrientation
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    ethnicity: prevValues.ethnicity
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    ethnicityOther: string().when('ethnicity', {
      is: ethnicity => ethnicity.includes('Other'),
      then: string().required(DEFAULT_REQUIRED),
      otherwise: string().nullable(),
    }),
    religion: prevValues.religion
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    neurodivergent: prevValues.neurodivergent
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    neurodivergentYes: string().when('neurodivergent', {
      is: neurodivergent => neurodivergent.includes('Yes'),
      then: string().required(DEFAULT_REQUIRED),
      otherwise: string().nullable(),
    }),
    disability: prevValues.disability
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    disabilityYes: string().when('disability', {
      is: disability => disability.includes('Yes'),
      then: string().required(DEFAULT_REQUIRED),
      otherwise: string().nullable(),
    }),
    disabilityYesOther: string().when('disabilityYes', {
      is: disabilityYes => disabilityYes.includes('Other'),
      then: string().required(DEFAULT_REQUIRED),
      otherwise: string().nullable(),
    }),
    childCare: prevValues.childCare
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    illCare: prevValues.illCare
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    degreeLevel: prevValues.degreeLevel
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    class: prevValues.class
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
  });

module.exports = { myAccountSchema, aboutMeSchema };
