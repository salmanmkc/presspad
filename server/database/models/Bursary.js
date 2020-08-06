const mongoose = require('mongoose');

const { bursaryTypes: t } = require('../constants');

const { Schema, model } = mongoose;

const bursarySchema = new Schema(
  {
    intern: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    typeOfSchool: {
      type: String,
      enum: t.typeOfSchool,
    },
    highestLevelOfQualifications: {
      type: String,
      enum: t.highestLevelOfQualifications,
    },
    describeMainIncomeEarnerMainJob: {
      type: String,
      enum: t.describeMainIncomeEarnerMainJob,
    },
    numberOfPeopleKnowBefore16: {
      type: String,
      enum: t.numberOfPeopleKnowBefore16,
    },
    typeOfUniversity: [
      {
        type: String,
        enum: t.typeOfUniversity,
      },
    ],
    eligibleForFreeSchoolMeals: {
      type: String,
      enum: t.eligibleForFreeSchoolMeals,
    },
    comingFromLowerSociolEconomicBackground: {
      type: String,
      enum: t.comingFromLowerSociolEconomicBackground,
    },
    householdMembersSpeakOtherLanguage: {
      type: String,
      enum: t.householdMembersSpeakOtherLanguage,
    },
    otherLanguageHouseholdMembersSpeak: {
      // If they say yes in previous question
      type: String,
    },
    annualHouseholdIncome: {
      type: String,
      enum: t.annualHouseholdIncome,
    },
    statusOfHome: {
      type: String,
      enum: t.statusOfHome,
    },
    anyHouseholdReceiveTheFollowing: [
      {
        type: String,
        enum: t.anyHouseholdReceiveTheFollowing,
      },
    ],
    benefitFromNepotism: {
      type: String,
      enum: t.benefitFromNepotism,
    },
    peopleYouKnowSocially: [
      {
        type: String,
        enum: t.peopleYouKnowSocially,
      },
    ],
    accentAffectsPotentialEmployers: {
      type: String,
      enum: t.accentAffectsPotentialEmployers,
    },
    parentsSupportiveOfCareer: {
      type: String,
      enum: t.parentsSupportiveOfCareer,
    },
  },
  {
    timestamps: true,
  },
);

const Bursary = model('bursaries', bursarySchema);

module.exports = Bursary;
