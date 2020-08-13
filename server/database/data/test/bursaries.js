const { Bursary } = require('../../models');
const {
  types: { bursaryTypes: t },
} = require('../../constants');

const reset = () => Bursary.deleteMany();

const createAll = async ({ users }) => {
  const { internUser, internUser2, internUser3, internUser4 } = users;

  const bursaries = [
    {
      intern: internUser,
      typeOfSchool: t.typeOfSchool[0],
      highestLevelOfQualifications: t.highestLevelOfQualifications[0],
      describeMainIncomeEarnerMainJob: t.describeMainIncomeEarnerMainJob[0],
      numberOfPeopleKnowBefore16: t.numberOfPeopleKnowBefore16[0],
      typeOfUniversity: [t.typeOfUniversity[0], t.typeOfUniversity[2]],
      eligibleForFreeSchoolMeals: t.eligibleForFreeSchoolMeals[0],
      comingFromLowerSociolEconomicBackground:
        t.comingFromLowerSociolEconomicBackground[0],
      householdMembersSpeakOtherLanguage:
        t.householdMembersSpeakOtherLanguage[1],
      householdMembersSpeakOtherLanguageYes: 'urdu',
      annualHouseholdIncome: t.annualHouseholdIncome[0],
      statusOfHome: t.statusOfHome[0],
      anyHouseholdReceive: [t.anyHouseholdReceive[0], t.anyHouseholdReceive[2]],
      benefitFromNepotism: t.benefitFromNepotism[0],
      peopleYouKnowSocially: [
        t.peopleYouKnowSocially[1],
        t.peopleYouKnowSocially[2],
      ],
      accentAffectsPotentialEmployers: t.accentAffectsPotentialEmployers[0],
      parentsSupportiveOfCareer: t.parentsSupportiveOfCareer[0],
    },
    {
      intern: internUser2,
    },
    {
      intern: internUser3,
    },
    {
      intern: internUser4,
    },
  ];

  const [bursary1, bursary2, bursary3, bursary4] = await Bursary.create(
    bursaries,
  );

  return {
    bursary1,
    bursary2,
    bursary3,
    bursary4,
  };
};

module.exports = {
  createAll,
  reset,
};
