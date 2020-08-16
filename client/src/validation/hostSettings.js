const { object, string, boolean, mixed, array, date } = require('yup');
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
      is: gender => gender && gender.includes('Other'),
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
      is: ethnicity => ethnicity && ethnicity.includes('Other'),
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
      is: neurodivergent => neurodivergent && neurodivergent.includes('Yes'),
      then: string().required(DEFAULT_REQUIRED),
      otherwise: string().nullable(),
    }),
    disability: prevValues.disability
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    disabilityYes: string().when('disability', {
      is: disability => disability && disability.includes('Yes'),
      then: string().required(DEFAULT_REQUIRED),
      otherwise: string().nullable(),
    }),
    disabilityYesOther: string().when('disabilityYes', {
      is: disabilityYes => disabilityYes && disabilityYes.includes('Other'),
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
    belongToClass: prevValues.belongToClass
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    schooling: prevValues.belongToClass
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    freeSchool: prevValues.belongToClass
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    ParentsProfession: prevValues.belongToClass
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    qualificationsLevel: prevValues.belongToClass
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    qualificationsLevelOther: prevValues.belongToClass
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
  });

const myListing = prevValues =>
  object({
    profileImage: prevValues.profileImage
      ? mixed({
          fileName: string(DEFAULT_REQUIRED).required(DEFAULT_REQUIRED),
          deleted: boolean().notOneOf([true]),
        }).required(DEFAULT_REQUIRED)
      : mixed().nullable(),
    homeImages:
      prevValues.homeImages && prevValues.homeImages.length
        ? array()
            .required(DEFAULT_REQUIRED)
            .min(3)
            .max(9)
            .of(
              mixed({
                fileName: string(DEFAULT_REQUIRED).required(DEFAULT_REQUIRED),
                deleted: boolean().notOneOf([true]),
              }).required(DEFAULT_REQUIRED),
            )
        : array().nullable(),
    bio: prevValues.bio
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    useReasonAnswer: prevValues.useReasonAnswer
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    addressLine1: prevValues.addressline1
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    addressLine2: prevValues.addressline2
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    city: prevValues.city
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    postcode: prevValues.postcode
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    availableDates: array()
      .of(
        object({
          startDate: date().typeError(DEFAULT_REQUIRED),
          endDate: date().typeError(DEFAULT_REQUIRED),
        }),
      )
      .required(),
    extraInfo: prevValues.extraInfo
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    mentorExperience: prevValues.mentorExperience
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    industryExperience: prevValues.industryExperience
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    otherInfo: prevValues.otherInfo
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    aboutHome: prevValues.aboutHome
      ? array()
          .of(string().required(DEFAULT_REQUIRED))
          .required(DEFAULT_REQUIRED)
      : array().nullable(),
  });

const verifications = prevValues =>
  object({
    organisation: prevValues.organisation
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    internshipEndDate: prevValues.internshipEndDate
      ? mixed().required(DEFAULT_REQUIRED)
      : mixed().nullable(),
    reference1: prevValues.reference1
      ? object({
          name: prevValues.reference1.name
            ? string().required(DEFAULT_REQUIRED)
            : string().nullable(),
          email: prevValues.reference1.email
            ? string().required(DEFAULT_REQUIRED)
            : string().nullable(),
        }).required()
      : object().nullable(),
    reference2: prevValues.reference2
      ? object({
          name: prevValues.reference2.name
            ? string().required(DEFAULT_REQUIRED)
            : string().nullable(),
          email: prevValues.reference2.email
            ? string().required(DEFAULT_REQUIRED)
            : string().nullable(),
        }).required()
      : object().nullable(),
    refNum:
      prevValues.DBSCheck && prevValues.DBSCheck.refNum
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    workArea: prevValues.workArea
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    workAreaOther: prevValues.workAreaOther
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    jobTitle: prevValues.jobTitle
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
  });

module.exports = {
  myAccountSchema,
  aboutMeSchema,
  myListing,
  verifications,
};
