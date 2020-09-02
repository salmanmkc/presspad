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
    .max(30, NAME_LONG),
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
    typeOfSchool:
      prevValues.typeOfSchool || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    typeOfSchoolOther: string().when('typeOfSchool', {
      is: typeOfSchool => typeOfSchool && typeOfSchool.includes('Other'),
      then: string().required(DEFAULT_REQUIRED),
      otherwise: string().nullable(),
    }),
    eligibleForFreeSchoolMeals:
      prevValues.eligibleForFreeSchoolMeals || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    describeMainIncomeEarnerMainJob:
      prevValues.describeMainIncomeEarnerMainJob || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
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
    parentsWorkInPress:
      prevValues.parentsWorkInPress || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    belongToClass:
      prevValues.belongToClass || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
  });

const myListing = (prevValues, isRequired) =>
  object({
    profileImage:
      prevValues.profileImage || isRequired
        ? mixed({
            fileName: string(DEFAULT_REQUIRED).required(DEFAULT_REQUIRED),
            deleted: boolean().notOneOf([true]),
          }).required(DEFAULT_REQUIRED)
        : mixed().nullable(),
    photos:
      (prevValues.photos && prevValues.photos.length) || isRequired
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
    address:
      prevValues.address || isRequired
        ? object({
            addressline1:
              prevValues.address.addressline1 || isRequired
                ? string().required(DEFAULT_REQUIRED)
                : string().nullable(),
            addressline2: string().nullable(),
            city:
              prevValues.address.city || isRequired
                ? string().required(DEFAULT_REQUIRED)
                : string().nullable(),
            postcode:
              prevValues.address.postcode || isRequired
                ? string().required(DEFAULT_REQUIRED)
                : string().nullable(),
          }).required()
        : object().nullable(),
    availableDates: array()
      .of(
        object({
          startDate: date().typeError(DEFAULT_REQUIRED),
          endDate: date().typeError(DEFAULT_REQUIRED),
        }),
      )
      .required(),
    bio:
      prevValues.bio || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    otherInfo:
      prevValues.otherInfo || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    hostingReasonAnswer:
      prevValues.hostingReasonAnswer || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    mentoringExperienceAnswer:
      prevValues.mentoringExperienceAnswer || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    industryExperienceAnswer:
      prevValues.industryExperienceAnswer || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    backgroundAnswer:
      prevValues.backgroundAnswer || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    accommodationChecklist:
      (prevValues.accommodationChecklist &&
        prevValues.accommodationChecklist.length) ||
      isRequired
        ? array()
            .required(DEFAULT_REQUIRED)
            .min(1, DEFAULT_REQUIRED)
        : mixed().nullable(),
  });

const verifications = (prevValues, isRequired) =>
  object({
    jobTitle:
      prevValues.jobTitle || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    organisation:
      prevValues.organisation || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    workingArea:
      prevValues.workingArea || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
    workingAreaOther: string().when('workingArea', {
      is: workingArea => workingArea && workingArea.includes('Other'),
      then: string().required(DEFAULT_REQUIRED),
      otherwise: string().nullable(),
    }),
    reference1:
      prevValues.reference1 || isRequired
        ? object({
            name:
              prevValues.reference1.name || isRequired
                ? string().required(DEFAULT_REQUIRED)
                : string().nullable(),
            email:
              prevValues.reference1.email || isRequired
                ? string().required(DEFAULT_REQUIRED)
                : string().nullable(),
          }).required()
        : object().nullable(),
    reference2:
      prevValues.reference2 || isRequired
        ? object({
            name:
              prevValues.reference2.name || isRequired
                ? string().required(DEFAULT_REQUIRED)
                : string().nullable(),
            email:
              prevValues.reference2.email || isRequired
                ? string().required(DEFAULT_REQUIRED)
                : string().nullable(),
          }).required()
        : object().nullable(),
    photoID:
      prevValues.photoID || isRequired
        ? mixed({
            fileName: string(DEFAULT_REQUIRED).required(DEFAULT_REQUIRED),
            deleted: boolean().notOneOf([true]),
          }).required(DEFAULT_REQUIRED)
        : mixed().nullable(),
    pressCard:
      prevValues.pressCard || isRequired
        ? mixed({
            fileName: string(DEFAULT_REQUIRED).required(DEFAULT_REQUIRED),
            deleted: boolean().notOneOf([true]),
          }).required(DEFAULT_REQUIRED)
        : mixed().nullable(),
    refNum:
      (prevValues.DBSCheck && prevValues.DBSCheck.refNum) || isRequired
        ? string().required(DEFAULT_REQUIRED)
        : string().nullable(),
  });

module.exports = {
  myAccountSchema,
  aboutMeSchema,
  myListing,
  verifications,
};
