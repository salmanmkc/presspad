const { object, string, boolean, mixed, array } = require('yup');
const { DEFAULT_REQUIRED } = require('../constants/errorMessages');

const internCompleteProfile = object({
  // profile
  birthDate: mixed().required(DEFAULT_REQUIRED),
  phoneNumber: string().required(DEFAULT_REQUIRED),
  hometown: string().required(DEFAULT_REQUIRED),
  lastStudySubject: string().required(DEFAULT_REQUIRED),
  lastStudyUniversity: string().required(DEFAULT_REQUIRED),
  hearAboutPressPadAnswer: string().required(DEFAULT_REQUIRED),
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
  belongToClass: string().required(DEFAULT_REQUIRED),
  profileImage: object({
    fileName: string(DEFAULT_REQUIRED).required(DEFAULT_REQUIRED),
    deleted: boolean().notOneOf([true]),
  }).required(DEFAULT_REQUIRED),
  interests: array().required(DEFAULT_REQUIRED),
  bio: string().required(DEFAULT_REQUIRED),
  useReasonAnswer: string().required(DEFAULT_REQUIRED),
  storyAnswer: string().required(DEFAULT_REQUIRED),
  mentorDescribeAnswer: string().required(DEFAULT_REQUIRED),
  issueAnswer: string().required(DEFAULT_REQUIRED),

  // verifications
  organisation: string().when('hasNoInternship', {
    is: true,
    then: string().required(DEFAULT_REQUIRED),
    otherwise: string().nullable(),
  }),
  internshipContact: object().when('hasNoInternship', {
    is: true,
    then: object({
      name: string().required(DEFAULT_REQUIRED),
      email: string().required(DEFAULT_REQUIRED),
      phoneNumber: string().required(DEFAULT_REQUIRED),
    }).required(DEFAULT_REQUIRED),
    otherwise: object().nullable(),
  }),
  internshipStartDate: mixed().when('hasNoInternship', {
    is: true,
    then: mixed().required(DEFAULT_REQUIRED),
    otherwise: mixed().nullable(),
  }),
  internshipEndDate: mixed().when('hasNoInternship', {
    is: true,
    then: mixed().required(DEFAULT_REQUIRED),
    otherwise: mixed().nullable(),
  }),
  internshipOfficeAddress: object().when('hasNoInternship', {
    is: true,
    then: object({
      addressline1: string().required(DEFAULT_REQUIRED),
      city: string().required(DEFAULT_REQUIRED),
      postcode: string().required(DEFAULT_REQUIRED),
    }).required(DEFAULT_REQUIRED),
    otherwise: object().nullable(),
  }),

  reference1: object({
    name: string().required(DEFAULT_REQUIRED),
    email: string().required(DEFAULT_REQUIRED),
  }).required(DEFAULT_REQUIRED),

  reference2: object({
    name: string().required(DEFAULT_REQUIRED),
    email: string().required(DEFAULT_REQUIRED),
  }).required(DEFAULT_REQUIRED),

  offerLetter: object().when('hasNoInternship', {
    is: true,
    then: object({
      fileName: string().ensure(),
    }).required(DEFAULT_REQUIRED),
    otherwise: object().nullable(),
  }),

  // bursary
  typeOfSchool: string().required(DEFAULT_REQUIRED),
  typeOfSchoolOther: string().when('typeOfSchool', {
    is: typeOfSchool => typeOfSchool && typeOfSchool.includes('Other'),
    then: string().required(DEFAULT_REQUIRED),
    otherwise: string().nullable(),
  }),
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
  describeMainIncomeEarnerMainJob: string().required(DEFAULT_REQUIRED),
  numberOfPeopleKnowBefore16: string().required(DEFAULT_REQUIRED),
  typeOfUniversity: string().required(DEFAULT_REQUIRED),
  eligibleForFreeSchoolMeals: string().required(DEFAULT_REQUIRED),
  comingFromLowerSociolEconomicBackground: string().required(DEFAULT_REQUIRED),
  householdMembersSpeakOtherLanguage: string().required(DEFAULT_REQUIRED),
  householdMembersSpeakOtherLanguageYes: string().when(
    'householdMembersSpeakOtherLanguage',
    {
      is: householdMembersSpeakOtherLanguage =>
        householdMembersSpeakOtherLanguage &&
        householdMembersSpeakOtherLanguage.includes('Yes'),
      then: string().required(DEFAULT_REQUIRED),
      otherwise: string().nullable(),
    },
  ),
  annualHouseholdIncome: string().required(DEFAULT_REQUIRED),
  statusOfHome: string().required(DEFAULT_REQUIRED),
  statusOfHomeOther: string().when('statusOfHome', {
    is: statusOfHome => statusOfHome && statusOfHome.includes('Yes'),
    then: string().required(DEFAULT_REQUIRED),
    otherwise: string().nullable(),
  }),
  anyHouseholdReceive: string().required(DEFAULT_REQUIRED),
  benefitFromNepotism: string().required(DEFAULT_REQUIRED),
  peopleYouKnowSocially: string().required(DEFAULT_REQUIRED),
  accentAffectsPotentialEmployers: string().required(DEFAULT_REQUIRED),
  parentsSupportiveOfCareer: string().required(DEFAULT_REQUIRED),
});

module.exports = internCompleteProfile;
