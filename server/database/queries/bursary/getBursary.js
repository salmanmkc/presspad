const mongoose = require('mongoose');

const { BursaryWindow, BursaryApplication, Bursary } = require('../../models');
const {
  bursaryWindowStatuses,
  bursaryApplicationStatuses,
} = require('../../constants');

const getBursaryWindows = () => {
  return BursaryWindow.find({
    status: bursaryWindowStatuses.active,
  });
};

const getBursaryApplicationsForCSV = () => {
  return BursaryApplication.aggregate([
    {
      $lookup: {
        from: 'bursaries',
        foreignField: 'intern',
        localField: 'intern',
        as: 'bursary',
      },
    },
    {
      $unwind: { path: '$bursary' },
    },
    {
      $lookup: {
        from: 'users',
        foreignField: '_id',
        localField: 'intern',
        as: 'intern',
      },
    },
    {
      $unwind: { path: '$intern' },
    },
    {
      $lookup: {
        from: 'profiles',
        foreignField: 'user',
        localField: 'intern._id',
        as: 'profile',
      },
    },
    {
      $unwind: { path: '$profile' },
    },
    {
      $project: {
        _id: 0,
        intern: '$intern._id',
        'intern name': '$intern.name',
        'What type of school did you mainly attend between the ages of 11 and 16?':
          '$bursary.typeOfSchool',
        'What type of school did you mainly attend between the ages of 11 and 16? - Other Answer':
          '$bursary.typeOfSchoolOther',
        'What is the highest level of qualifications achieved by either of your parent(s) or guardian(s) by the time you were 18?':
          '$bursary.highestLevelOfQualifications',
        'What is the highest level of qualifications achieved by either of your parent(s) or guardian(s) by the time you were 18? - Other answer':
          '$bursary.highestLevelOfQualificationsOther',
        'Thinking back to when you were aged about 14, which best describes the sort of work the main/ highest income earner in your household did in their main job?':
          '$bursary.describeMainIncomeEarnerMainJob',
        "How many people did you know before the age of 16 that work in the industry you're pursuing a career in?":
          '$bursary.numberOfPeopleKnowBefore16',
        'What type of university did you attend?': '$bursary.typeOfUniversity',
        'If you finished school after 1980, were you eligible for Free School Meals at any point during your school years?':
          '$bursary.eligibleForFreeSchoolMeals',
        'Compared to people in general, would you describe yourself as coming from a lower socio-economic background?':
          '$bursary.comingFromLowerSociolEconomicBackground',
        'Compared to people in general, would you describe yourself as coming from a lower socio-economic background? - Other Answer':
          '$bursary.comingFromLowerSociolEconomicBackgroundOther',
        'Do household members speak and/or write a language other than English?':
          '$bursary.householdMembersSpeakOtherLanguage',
        'Do household members speak and/or write a language other than English? - Yes answer':
          '$bursary.householdMembersSpeakOtherLanguageYes',
        'What is your annual household income after tax?':
          '$bursary.annualHouseholdIncome',
        'What is your ownership state of your home?': '$bursary.statusOfHome',
        'What is your ownership state of your home? - Other answer':
          '$bursary.statusOfHomeOther',
        'How many people in your household at present receive either of the following?':
          '$bursary.anyHouseholdReceive',
        'Have you ever benefited from nepotism in your work life? ':
          '$bursary.benefitFromNepotism',
        'Which of these people do you know socially?':
          '$bursary.peopleYouKnowSocially',
        'Do you feel your accent affects the way potential employers view you?':
          '$bursary.accentAffectsPotentialEmployers',
        'Do you feel your parents are supportive of your chosen career?':
          '$bursary.parentsSupportiveOfCareer',
        'Name of organisation': '$profile.organisation',
        'Contact name': '$profile.internshipContact.name',
        'Contact email': '$profile.internshipContact.email',
        'Contact number': '$profile.internshipContact.phoneNumber',
        'Internship start date': '$profile.internshipStartDate',
        'Internship end date': '$profile.internshipEndDate',
        'Address Line 1': '$profile.internshipOfficeAddress.addressline1',
        'Address Line 2': '$profile.internshipOfficeAddress.addressline2',
        city: '$profile.internshipOfficeAddress.city',
        postcode: '$profile.internshipOfficeAddress.postcode',
      },
    },
  ]);
};
const getBursaryApplications = type => {
  let matchObject = {};
  if (type === 'history') {
    matchObject = {
      $match: {
        $expr: {
          $or: [
            { $eq: ['$status', bursaryApplicationStatuses.rejected] },
            { $eq: ['$status', bursaryApplicationStatuses.completed] },
          ],
        },
      },
    };
  } else {
    matchObject = {
      $match: { $expr: { $eq: ['$status', type] } },
    };
  }

  return BursaryApplication.aggregate([
    matchObject,
    {
      $lookup: {
        from: 'bursaryapplications',
        let: { internId: '$intern' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ['$$internId', '$intern'] }],
              },
            },
          },
          {
            $group: {
              _id: null,
              totalPotentialAmount: { $sum: '$totalPotentialAmount' },
            },
          },
        ],
        as: 'awardedBursariesCost',
      },
    },
    {
      $addFields: {
        awardedBursariesCost: {
          $ifNull: [
            { $arrayElemAt: ['$awardedBursariesCost.totalPotentialAmount', 0] },
            0,
          ],
        },
      },
    },
    {
      $lookup: {
        from: 'bursaryapplications',
        let: { internId: '$intern', applicationId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$$internId', '$intern'] },
                  // { $ne: ['$$applicationId', '$_id'] },
                  { $eq: ['$status', bursaryApplicationStatuses.rejected] },
                ],
              },
            },
          },
          {
            $count: 'count',
          },
        ],
        as: 'rejectedBursaries',
      },
    },
    {
      $addFields: {
        rejectedBursaries: {
          $ifNull: [{ $arrayElemAt: ['$rejectedBursaries.count', 0] }, 0],
        },
      },
    },
    {
      $lookup: {
        from: 'users',
        let: { intern: '$intern' },
        pipeline: [
          { $match: { $expr: { $eq: ['$$intern', '$_id'] } } },
          {
            $project: {
              name: 1,
              email: 1,
            },
          },
        ],
        as: 'intern',
      },
    },
    {
      $unwind: { path: '$intern', preserveNullAndEmptyArrays: true },
    },
    {
      $addFields: {
        id: '$intern._id',
        name: '$intern.name',
        applicationStatus: '$status',
        totalAmountSpent: '$totalSpentSoFar',
        dateRequested: '$createdAt',
      },
    },
  ]);
};

const getBursaryApplicationInfo = id => {
  return BursaryApplication.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(id) } },
    // lookup admin account
    {
      $lookup: {
        from: 'users',
        pipeline: [
          { $match: { role: 'admin' } },
          {
            $lookup: {
              from: 'accounts',
              localField: 'account',
              foreignField: '_id',
              as: 'account',
            },
          },
          {
            $unwind: { path: '$account', preserveNullAndEmptyArrays: true },
          },
        ],
        as: 'admin',
      },
    },
    // lookup intern profile to get internship details
    {
      $lookup: {
        from: 'profiles',
        let: { intern: '$intern' },
        pipeline: [{ $match: { $expr: { $eq: ['$$intern', '$user'] } } }],
        as: 'intern',
      },
    },
    {
      $unwind: { path: '$intern', preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        status: 1,
        bursaryFunds: { $arrayElemAt: ['$admin.account.bursaryFunds', 0] },
        internshipStartDate: '$intern.internshipStartDate',
        internshipEndDate: '$intern.internshipEndDate',
      },
    },
  ]);
};

const getBursaryByUserId = id => Bursary.findOne({ intern: id }).lean();

module.exports = {
  getBursaryWindows,
  getBursaryApplications,
  getBursaryApplicationInfo,
  getBursaryByUserId,
  getBursaryApplicationsForCSV,
};
