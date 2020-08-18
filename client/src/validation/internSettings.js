const { object, string, boolean, mixed, array } = require('yup');
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
  });

const myProfile = prevValues =>
  object({
    profileImage: prevValues.profileImage
      ? mixed({
          fileName: string(DEFAULT_REQUIRED).required(DEFAULT_REQUIRED),
          deleted: boolean().notOneOf([true]),
        }).required(DEFAULT_REQUIRED)
      : mixed().nullable(),
    interests:
      prevValues.interests && prevValues.interests.length
        ? array().required(DEFAULT_REQUIRED)
        : array().nullable(),
    bio: prevValues.bio
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    useReasonAnswer: prevValues.useReasonAnswer
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    storyAnswer: prevValues.storyAnswer
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    mentorDescribeAnswer: prevValues.mentorDescribeAnswer
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    issueAnswer: prevValues.issueAnswer
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
  });

const verifications = (prevValues, hasNoInternship) =>
  object({
    organisation:
      prevValues.organisation && !hasNoInternship
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    internshipContact:
      prevValues.internshipContact && !hasNoInternship
        ? object({
            name:
              prevValues.internshipContact.name && !hasNoInternship
                ? string().required(DEFAULT_REQUIRED)
                : string().nullable(),
            email:
              prevValues.internshipContact.email && !hasNoInternship
                ? string().required(DEFAULT_REQUIRED)
                : string().nullable(),
            phoneNumber:
              prevValues.internshipContact.phoneNumber && !hasNoInternship
                ? string().required(DEFAULT_REQUIRED)
                : string().nullable(),
          }).required()
        : object().nullable(),
    internshipStartDate:
      prevValues.internshipStartDate && !hasNoInternship
        ? mixed().required(DEFAULT_REQUIRED)
        : mixed().nullable(),
    internshipEndDate:
      prevValues.internshipEndDate && !hasNoInternship
        ? mixed().required(DEFAULT_REQUIRED)
        : mixed().nullable(),
    internshipOfficeAddress:
      prevValues.internshipOfficeAddress && !hasNoInternship
        ? object({
            addressline1:
              prevValues.internshipOfficeAddress.addressline1 &&
              !hasNoInternship
                ? string().required(DEFAULT_REQUIRED)
                : string().nullable(),
            addressline2:
              prevValues.internshipOfficeAddress.addressline2 &&
              !hasNoInternship
                ? string().required(DEFAULT_REQUIRED)
                : string().nullable(),
            city:
              prevValues.internshipOfficeAddress.city && !hasNoInternship
                ? string().required(DEFAULT_REQUIRED)
                : string().nullable(),
            postcode:
              prevValues.internshipOfficeAddress.postcode && !hasNoInternship
                ? string().required(DEFAULT_REQUIRED)
                : string().nullable(),
          }).required()
        : object().nullable(),

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
  });

const verificationsAllRequired = object({
  organisation: string().required(DEFAULT_REQUIRED),
  internshipContact: object({
    name: string().required(DEFAULT_REQUIRED),
    email: string().required(DEFAULT_REQUIRED),
    phoneNumber: string().required(DEFAULT_REQUIRED),
  }).required(),
  internshipStartDate: mixed().required(DEFAULT_REQUIRED),
  internshipEndDate: mixed().required(DEFAULT_REQUIRED),
  internshipOfficeAddress: object({
    addressline1: string().required(DEFAULT_REQUIRED),
    city: string().required(DEFAULT_REQUIRED),
    postcode: string().required(DEFAULT_REQUIRED),
  }).required(),
  reference1: object({
    name: string().required(DEFAULT_REQUIRED),
    email: string().required(DEFAULT_REQUIRED),
  }).required(),
  reference2: object({
    name: string().required(DEFAULT_REQUIRED),
    email: string().required(DEFAULT_REQUIRED),
  }).required(),
  refNum: string().required(DEFAULT_REQUIRED),
});

module.exports = {
  myAccountSchema,
  aboutMeSchema,
  myProfile,
  verifications,
  verificationsAllRequired,
};
