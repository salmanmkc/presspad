const boom = require('boom');
const moment = require('moment');

const { getBursaryApplicationInfo } = require('../../database/queries/bursary');
const {
  approveBursaryApplication,
} = require('../../database/queries/payments');
const { bursaryApplicationStatuses: s } = require('../../database/constants');

module.exports = async (req, res, next) => {
  const {
    adminMessage,
    londonWeighting,
    bursaryPerc,
    maxLimit,
    awardedBursary,
  } = req.body;
  const { id } = req.params;

  const [
    { bursaryFunds, internshipEndDate, internshipStartDate, status: oldStatus },
  ] = await getBursaryApplicationInfo(id);

  if (oldStatus !== s.preApproved) {
    return next(boom.badData());
  }

  const internshipLength =
    moment(internshipEndDate)
      .endOf('d')
      .diff(internshipStartDate, 'd') + 1;

  const potentialInternshipCost = (internshipLength + 6 - 14) * 2000;

  const calcCost = () => {
    let total = potentialInternshipCost * bursaryPerc;

    if (londonWeighting) {
      const londonCost = total * 0.2;
      if (londonCost > 16800) {
        total += 16800;
      } else {
        total += londonCost;
      }
    }
    return total > maxLimit ? maxLimit : total;
  };

  if (calcCost() !== awardedBursary) {
    return next(boom.badData());
  }

  if (calcCost() > bursaryFunds) {
    return next(boom.badData('not enough funds'));
  }

  const approvedBursaryApplication = await approveBursaryApplication({
    id,
    status: s.approved,
    discountRate: bursaryPerc,
    maxLimit,
    totalPotentialAmount: awardedBursary,
    adminMessage,
    londonWeighting,
  });
  return res.json(approvedBursaryApplication);
};
