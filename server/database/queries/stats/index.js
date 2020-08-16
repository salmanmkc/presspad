const { getAllClientStats } = require('./getAllClientStats');
const { getAllInternStats } = require('./getAllInternStats');
const { getAllHostStats } = require('./getAllHostStats');
const getPaymentsStats = require('./getPaymentsStats');
const { getTopAdminStats } = require('./getTopAdminStats');

module.exports = {
  getAllClientStats,
  getAllInternStats,
  getAllHostStats,
  getPaymentsStats,
  getTopAdminStats,
};
