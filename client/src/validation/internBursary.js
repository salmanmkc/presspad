const { object, string, mixed } = require('yup');
const { DEFAULT_REQUIRED } = require('../constants/errorMessages');

const bursaryWithProfile = object({
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
    addressline2: string().nullable(),
    city: string().required(DEFAULT_REQUIRED),
    postcode: string().required(DEFAULT_REQUIRED),
  }).required(),
});

module.exports = bursaryWithProfile;
