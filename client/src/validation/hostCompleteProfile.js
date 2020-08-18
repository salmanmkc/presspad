const { object, string, boolean, mixed, array } = require('yup');
const { DEFAULT_REQUIRED } = require('../constants/errorMessages');

const hostCompleteProfile = object({
  // about me
  birthDate: mixed().required(DEFAULT_REQUIRED),
  phoneNumber: string().required(DEFAULT_REQUIRED),
  hometown: string().required(DEFAULT_REQUIRED),
  lastStudySubject: string().required(DEFAULT_REQUIRED),
  lastStudyUniversity: string().required(DEFAULT_REQUIRED),
  hearAboutPressPadAnswer: string().required(DEFAULT_REQUIRED),
  //   about me - demographics
  gender: string().required(DEFAULT_REQUIRED),
  genderOther: string().when('gender', {
    is: gender => gender && gender.includes('Other'),
    then: string().required(DEFAULT_REQUIRED),
    otherwise: string().nullable(),
  }),
  sexualOrientation: string().required(DEFAULT_REQUIRED),
  ethnicity: string().required(DEFAULT_REQUIRED),
  ethnicityOther: string().when('ethnicity', {
    is: ethnicity => ethnicity && ethnicity.includes('Other'),
    then: string().required(DEFAULT_REQUIRED),
    otherwise: string().nullable(),
  }),
  religion: string().required(DEFAULT_REQUIRED),
  neurodivergent: string().required(DEFAULT_REQUIRED),
  neurodivergentYes: string().when('neurodivergent', {
    is: neurodivergent => neurodivergent && neurodivergent.includes('Yes'),
    then: string().required(DEFAULT_REQUIRED),
    otherwise: string().nullable(),
  }),
  disability: string().required(DEFAULT_REQUIRED),
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
  childCare: string().required(DEFAULT_REQUIRED),
  illCare: string().required(DEFAULT_REQUIRED),
  degreeLevel: string().required(DEFAULT_REQUIRED),
  typeOfSchool: string().required(DEFAULT_REQUIRED),
  typeOfSchoolOther: string().when('typeOfSchool', {
    is: typeOfSchool => typeOfSchool && typeOfSchool.includes('Other'),
    then: string().required(DEFAULT_REQUIRED),
    otherwise: string().nullable(),
  }),
  eligibleForFreeSchoolMeals: string().required(DEFAULT_REQUIRED),
  describeMainIncomeEarnerMainJob: string().required(DEFAULT_REQUIRED),
  highestLevelOfQualifications: string().required(DEFAULT_REQUIRED),
  highestLevelOfQualificationsOther: string().when(
    'highestLevelOfQualifications',
    {
      is: highestLevelOfQualifications =>
        highestLevelOfQualifications &&
        highestLevelOfQualifications.includes('Other'),
      then: string().required(DEFAULT_REQUIRED),
      otherwise: string().nullable(),
    },
  ),
  parentsWorkInPress: string().required(DEFAULT_REQUIRED),
  belongToClass: string().required(DEFAULT_REQUIRED),

  //   listing
  profileImage: object({
    fileName: string(DEFAULT_REQUIRED).required(DEFAULT_REQUIRED),
    deleted: boolean().notOneOf([true]),
  }).required(DEFAULT_REQUIRED),
  photos: array().required(DEFAULT_REQUIRED),
  address: object({
    addressline1: string().required(DEFAULT_REQUIRED),
    city: string().required(DEFAULT_REQUIRED),
    postcode: string().required(DEFAULT_REQUIRED),
  }).required(DEFAULT_REQUIRED),
  availableDates: array().required(DEFAULT_REQUIRED),
  accommodationChecklist: array().required(DEFAULT_REQUIRED),
  bio: string().required(DEFAULT_REQUIRED),
  otherInfo: string().required(DEFAULT_REQUIRED),
  hostingReasonAnswer: string().required(DEFAULT_REQUIRED),
  mentoringExperienceAnswer: string().required(DEFAULT_REQUIRED),
  industryExperienceAnswer: string().required(DEFAULT_REQUIRED),
  backgroundAnswer: string().required(DEFAULT_REQUIRED),

  // verifications
  jobTitle: string().required(DEFAULT_REQUIRED),
  organisation: string().required(DEFAULT_REQUIRED),
  workingArea: string().required(DEFAULT_REQUIRED),
  reference1: object({
    name: string().required(DEFAULT_REQUIRED),
    email: string().required(DEFAULT_REQUIRED),
  }).required(DEFAULT_REQUIRED),

  reference2: object({
    name: string().required(DEFAULT_REQUIRED),
    email: string().required(DEFAULT_REQUIRED),
  }).required(DEFAULT_REQUIRED),

  photoID: object({
    fileName: string(DEFAULT_REQUIRED).required(DEFAULT_REQUIRED),
    deleted: boolean().notOneOf([true]),
  }).required(DEFAULT_REQUIRED),

  pressCard: object({
    fileName: string(DEFAULT_REQUIRED).required(DEFAULT_REQUIRED),
    deleted: boolean().notOneOf([true]),
  }).required(DEFAULT_REQUIRED),
});

module.exports = hostCompleteProfile;
