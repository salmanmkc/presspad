const { object, string, mixed } = require('yup');
const { DEFAULT_REQUIRED } = require('../constants/errorMessages');

const bursaryWithProfile = prevValues =>
  object({
    typeOfSchool: prevValues.typeOfSchool
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    typeOfSchoolOther: string().when('typeOfSchool', {
      is: typeOfSchool => typeOfSchool && typeOfSchool.includes('Other'),
      then: string().required(DEFAULT_REQUIRED),
      otherwise: string().nullable(),
    }),
    highestLevelOfQualifications: prevValues.highestLevelOfQualifications
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
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
    describeMainIncomeEarnerMainJob: prevValues.describeMainIncomeEarnerMainJob
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    numberOfPeopleKnowBefore16: prevValues.numberOfPeopleKnowBefore16
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    typeOfUniversity: prevValues.typeOfUniversity
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    eligibleForFreeSchoolMeals: prevValues.eligibleForFreeSchoolMeals
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    comingFromLowerSociolEconomicBackground: prevValues.comingFromLowerSociolEconomicBackground
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    householdMembersSpeakOtherLanguage: prevValues.householdMembersSpeakOtherLanguage
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
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
    annualHouseholdIncome: prevValues.annualHouseholdIncome
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    statusOfHome: prevValues.statusOfHome
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    statusOfHomeOther: string().when('statusOfHome', {
      is: statusOfHome => statusOfHome && statusOfHome.includes('Yes'),
      then: string().required(DEFAULT_REQUIRED),
      otherwise: string().nullable(),
    }),
    anyHouseholdReceive: prevValues.anyHouseholdReceive
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    benefitFromNepotism: prevValues.benefitFromNepotism
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    peopleYouKnowSocially: prevValues.peopleYouKnowSocially
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    accentAffectsPotentialEmployers: prevValues.accentAffectsPotentialEmployers
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    parentsSupportiveOfCareer: prevValues.parentsSupportiveOfCareer
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),

    organisation: prevValues.organisation
      ? string().required(DEFAULT_REQUIRED)
      : string().nullable(),
    internshipContact: prevValues.internshipContact
      ? object({
          name: prevValues.internshipContact.name
            ? string().required(DEFAULT_REQUIRED)
            : string().nullable(),
          email: prevValues.internshipContact.email
            ? string().required(DEFAULT_REQUIRED)
            : string().nullable(),
          phoneNumber: prevValues.internshipContact.phoneNumber
            ? string().required(DEFAULT_REQUIRED)
            : string().nullable(),
        }).required()
      : object().nullable(),
    internshipStartDate: prevValues.internshipStartDate
      ? mixed().required(DEFAULT_REQUIRED)
      : mixed().nullable(),
    internshipEndDate: prevValues.internshipEndDate
      ? mixed().required(DEFAULT_REQUIRED)
      : mixed().nullable(),
    internshipOfficeAddress: prevValues.internshipOfficeAddress
      ? object({
          addressline1: prevValues.internshipOfficeAddress.addressline1
            ? string().required(DEFAULT_REQUIRED)
            : string().nullable(),
          addressline2: string().nullable(),
          city: prevValues.internshipOfficeAddress.city
            ? string().required(DEFAULT_REQUIRED)
            : string().nullable(),
          postcode: prevValues.internshipOfficeAddress.postcode
            ? string().required(DEFAULT_REQUIRED)
            : string().nullable(),
        }).required()
      : object().nullable(),
  });

module.exports = bursaryWithProfile;
