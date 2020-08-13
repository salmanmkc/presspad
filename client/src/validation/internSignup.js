const { object, string, mixed, array, boolean } = require('yup');
const { DEFAULT_REQUIRED } = require('../constants/errorMessages');

const aboutMeSchema = (prevValues, isRequired) =>
  object({
    birthDate:
      prevValues.birthDate || isRequired
        ? mixed().required(DEFAULT_REQUIRED)
        : mixed().nullable(),
    phoneNumber:
      prevValues.phoneNumber || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    hometown:
      prevValues.hometown || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    lastStudySubject:
      prevValues.lastStudySubject || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    lastStudyUniversity:
      prevValues.lastStudyUniversity || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    hearAboutPressPadAnswer:
      prevValues.hearAboutPressPadAnswer || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    gender:
      prevValues.gender || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    genderOther: string().when('gender', {
      is: gender => gender && gender.includes('Other'),
      then: string().required(DEFAULT_REQUIRED),
      otherwise: string().nullable(),
    }),
    sexualOrientation:
      prevValues.sexualOrientation || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    ethnicity:
      prevValues.ethnicity || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    ethnicityOther: string().when('ethnicity', {
      is: ethnicity => ethnicity && ethnicity.includes('Other'),
      then: string().required(DEFAULT_REQUIRED),
      otherwise: string().nullable(),
    }),
    religion:
      prevValues.religion || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    neurodivergent:
      prevValues.neurodivergent || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    neurodivergentYes: string().when('neurodivergent', {
      is: neurodivergent => neurodivergent && neurodivergent.includes('Yes'),
      then: string().required(DEFAULT_REQUIRED),
      otherwise: string().nullable(),
    }),
    disability:
      prevValues.disability || isRequired
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
    childCare:
      prevValues.childCare || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    illCare:
      prevValues.illCare || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    degreeLevel:
      prevValues.degreeLevel || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    belongToClass:
      prevValues.belongToClass || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
  });

const myProfile = (prevValues, isRequired) =>
  object({
    profileImage:
      prevValues.profileImage || isRequired
        ? mixed({
            fileName: string(DEFAULT_REQUIRED).required(DEFAULT_REQUIRED),
            deleted: boolean().notOneOf([true]),
          }).required(DEFAULT_REQUIRED)
        : mixed().nullable(),
    interests:
      prevValues.interests ||
      (isRequired && prevValues.interests) ||
      isRequired.length
        ? array().required(DEFAULT_REQUIRED)
        : array().nullable(),
    bio:
      prevValues.bio || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    useReasonAnswer:
      prevValues.useReasonAnswer || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    storyAnswer:
      prevValues.storyAnswer || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    mentorDescribeAnswer:
      prevValues.mentorDescribeAnswer || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    issueAnswer:
      prevValues.issueAnswer || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
  });

const bursary = (prevValues, isRequired) =>
  object({
    typeOfSchool:
      prevValues.typeOfSchool || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    typeOfSchoolOther: string().when('typeOfSchool', {
      is: typeOfSchool => typeOfSchool && typeOfSchool.includes('Other'),
      then: string().required(DEFAULT_REQUIRED),
      otherwise: string().nullable(),
    }),
    highestLevelOfQualifications:
      prevValues.highestLevelOfQualifications || isRequired
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
    describeMainIncomeEarnerMainJob:
      prevValues.describeMainIncomeEarnerMainJob || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    numberOfPeopleKnowBefore16:
      prevValues.numberOfPeopleKnowBefore16 || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    typeOfUniversity:
      prevValues.typeOfUniversity || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    eligibleForFreeSchoolMeals:
      prevValues.eligibleForFreeSchoolMeals || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    comingFromLowerSociolEconomicBackground:
      prevValues.comingFromLowerSociolEconomicBackground || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    householdMembersSpeakOtherLanguage:
      prevValues.householdMembersSpeakOtherLanguage || isRequired
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
    annualHouseholdIncome:
      prevValues.annualHouseholdIncome || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    statusOfHome:
      prevValues.statusOfHome || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    statusOfHomeOther: string().when('statusOfHome', {
      is: statusOfHome => statusOfHome && statusOfHome.includes('Yes'),
      then: string().required(DEFAULT_REQUIRED),
      otherwise: string().nullable(),
    }),
    anyHouseholdReceive:
      prevValues.anyHouseholdReceive || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    benefitFromNepotism:
      prevValues.benefitFromNepotism || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    peopleYouKnowSocially:
      prevValues.peopleYouKnowSocially || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    accentAffectsPotentialEmployers:
      prevValues.accentAffectsPotentialEmployers || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    parentsSupportiveOfCareer:
      prevValues.parentsSupportiveOfCareer || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
  });

const verifications = (prevValues, isRequired, noInternship) =>
  object({
    organisation:
      (prevValues.organisation || isRequired) && !noInternship
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    internshipContact:
      (prevValues.internshipContact || isRequired) && !noInternship
        ? object({
            name:
              (prevValues.internshipContact.name || isRequired) && !noInternship
                ? string().required(DEFAULT_REQUIRED)
                : string().nullable(),
            email:
              (prevValues.internshipContact.email || isRequired) &&
              !noInternship
                ? string().required(DEFAULT_REQUIRED)
                : string().nullable(),
            phoneNumber:
              (prevValues.internshipContact.phoneNumber || isRequired) &&
              !noInternship
                ? string().required(DEFAULT_REQUIRED)
                : string().nullable(),
          }).required()
        : object().nullable(),
    internshipStartDate:
      (prevValues.internshipStartDate || isRequired) && !noInternship
        ? mixed().required(DEFAULT_REQUIRED)
        : mixed().nullable(),
    internshipEndDate:
      (prevValues.internshipEndDate || isRequired) && !noInternship
        ? mixed().required(DEFAULT_REQUIRED)
        : mixed().nullable(),
    internshipOfficeAddress: prevValues.internshipOfficeAddress
      ? object({
          addressline1:
            (prevValues.internshipOfficeAddress.addressline1 || isRequired) &&
            !noInternship
              ? string().required(DEFAULT_REQUIRED)
              : string().nullable(),
          addressline2: string().nullable(),
          city:
            (prevValues.internshipOfficeAddress.city || isRequired) &&
            !noInternship &&
            !noInternship
              ? string().required(DEFAULT_REQUIRED)
              : string().nullable(),
          postcode:
            (prevValues.internshipOfficeAddress.postcode || isRequired) &&
            !noInternship
              ? string().required(DEFAULT_REQUIRED)
              : string().nullable(),
        }).required()
      : object().nullable(),

    reference1: prevValues.reference1
      ? object({
          name:
            (prevValues.reference1.name || isRequired) && !noInternship
              ? string().required(DEFAULT_REQUIRED)
              : string().nullable(),
          email:
            (prevValues.reference1.email || isRequired) && !noInternship
              ? string().required(DEFAULT_REQUIRED)
              : string().nullable(),
        }).required()
      : object().nullable(),
    reference2:
      prevValues.reference2 && !noInternship
        ? object({
            name:
              (prevValues.reference2.name || isRequired) && !noInternship
                ? string().required(DEFAULT_REQUIRED)
                : string().nullable(),
            email:
              (prevValues.reference2.email || isRequired) && !noInternship
                ? string().required(DEFAULT_REQUIRED)
                : string().nullable(),
          }).required()
        : object().nullable(),
    refNum:
      prevValues.DBSCheck && prevValues.DBSCheck.refNum
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    agreedOnMediaFormRelease: boolean()
      .oneOf([true], 'You have to agree to media release form')
      .required('You have to agree to media release form'),
    agreedOnPartnershipAgreement: boolean()
      .oneOf([true], 'you have to agree to our partnership agreement')
      .required('you have to agree to our partnership agreement'),
  });

module.exports = {
  aboutMeSchema,
  myProfile,
  bursary,
  verifications,
};
