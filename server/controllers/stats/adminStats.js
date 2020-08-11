const stripe = require('stripe')(process.env.stripeSK);
const boom = require('boom');
const moment = require('moment');

// IMPORT QUERIES
const {
  getAllClientStats,
  getAllInternStats,
  getAllHostStats,
  getPaymentsStats,
} = require('../../database/queries/stats');

const {
  findAllWithdrawRequests,
} = require('../../database/queries/withdrawRequest');
const {
  getActiveBookings,
  getBookingHistory,
} = require('../../database/queries/bookings');

const generateUrl = require('../../helpers/generateFileURL');

module.exports = async (req, res, next) => {
  // get user data so we can check they are authorized
  const { user } = req;

  if (user.role !== 'admin')
    return next(boom.unauthorized('You do not have sufficient priveleges'));

  // get whether you want client, intern or host data
  const { userType } = req.body;
  try {
    if (userType === 'clients') {
      return getAllClientStats()
        .then(stats => {
          if (stats.length === 0) return res.json(stats);

          return res.json(stats);
        })
        .catch(err => {
          next(boom.badImplementation(err));
        });
    }
    if (userType === 'interns') {
      return getAllInternStats()
        .then(async stats => {
          if (stats.length === 0) return res.json(stats);

          const cleanStats = await Promise.all(
            stats.map(async intern => {
              let bookingStatus = 'looking for host';

              if (intern.liveBookings > 0) {
                bookingStatus = 'at host';
              } else if (intern.pendingBookings > 0) {
                bookingStatus = 'pending';
              } else if (intern.confirmedBookings > 0) {
                bookingStatus = 'confirmed';
              }

              const internObj = {
                key: stats.indexOf(intern) + 1,
                name: intern.name,
                organisation: intern.organisation || intern.orgName,
                totalPayments: intern.totalPayments || 0,
                bookingStatus,
                id: intern._id,
                nextPaymentDueDate: intern.nextPaymentDueDate,
                nextPaymentPaid: intern.nextPaymentPaid,
                nextPayment: intern.nextPayment,
                dbsCheck: intern.DBSCheck,
                internshipStart: intern.internshipStart,
                verified: intern.verified,
                awaitingReview: intern.awaitingReview,
                requestDate: intern.awaitingReviewDate,
                firstVerified: intern.firstVerified,
                email: intern.email,
                contactNumber: intern.contactNumber,
                status:
                  intern.firstVerified && intern.awaitingReview
                    ? 'Updated DBS'
                    : 'Signed up',
              };

              const { dbsCheck } = internObj;

              if (dbsCheck && dbsCheck.fileName) {
                await generateUrl(dbsCheck);
              }

              return internObj;
            }),
          );

          return res.json(cleanStats);
        })
        .catch(err => next(boom.badImplementation(err)));
    }
    if (userType === 'hosts') {
      return getAllHostStats()
        .then(async stats => {
          if (stats.length === 0) return res.json(stats);

          const cleanStats = await Promise.all(
            stats.map(async host => {
              let bookingStatus = 'not hosting';

              if (host.nextLiveBooking) {
                const { status, startDate } = host.nextLiveBooking;
                const current = moment().diff(startDate, 'days') >= 0;
                if (status === 'confirmed') {
                  bookingStatus = current ? 'hosting' : 'confirmed';
                } else bookingStatus = host.nextLiveBooking;
              }

              const hostObj = {
                key: stats.indexOf(host) + 1,
                name: host.name,
                email: host.email,
                location: host.listing.address && host.listing.address.city,
                internsHosted: host.internsHosted,
                verified: host.profile[0].verified,
                profileId: host.profile[0]._id,
                dbsCheck: host.profile[0].DBSCheck,
                firstVerified: host.profile[0].firstVerified,
                awaitingReview: host.profile[0].awaitingReview,
                requestDate: host.profile[0].awaitingReviewDate,
                houseViewing: host.profile[0].houseViewingDate,
                id: host._id,
                earnings: host.totalIncome,
                wallet: host.currentBalance,
                bookingStatus,
                status:
                  host.profile[0].firstVerified &&
                  host.profile[0].awaitingReview
                    ? 'Updated details'
                    : 'Signed up',
              };

              const { dbsCheck } = hostObj;

              if (dbsCheck && dbsCheck.fileName) {
                await generateUrl(dbsCheck);
              }

              return hostObj;
            }),
          );
          return res.json(cleanStats);
        })
        .catch(err => next(boom.badImplementation(err)));
    }
    if (userType === 'payments') {
      const [stats] = await getPaymentsStats();
      const withdrawRequests = await findAllWithdrawRequests();
      const stripeBalance = await stripe.balance.retrieve();

      return res.json({ ...stats, stripeBalance, withdrawRequests });
    }
    if (userType === 'bookings') {
      const files = [];
      return getActiveBookings().then(async data => {
        const cleanData = data.map(booking => {
          if (booking.intern.internship['Proof of Internship']) {
            files.push(
              generateUrl(booking.intern.internship['Proof of Internship']),
            );
          }

          const updatedBooking = { key: data.indexOf(booking) + 1, ...booking };

          return updatedBooking;
        });

        await Promise.all(files);
        res.json(cleanData);
      });
    }
    if (userType === 'bookingHistory') {
      return getBookingHistory().then(data => {
        const cleanData = data.map(booking => {
          const updatedBooking = { key: data.indexOf(booking) + 1, ...booking };

          return updatedBooking;
        });
        res.json(cleanData);
      });
    }
    return next(boom.badRequest('Invalid userType'));
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
