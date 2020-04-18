const mongoose = require('mongoose');
const boom = require('boom');

const {
  hostAcceptBookingById,
  getBookingWithUsers,
  getOverlappingBookings,
} = require('../../database/queries/bookings');
const { updateRespondingData } = require('../../database/queries/user');
const { registerNotification } = require('../../services/notifications');
const requestAcceptedToIntern = require('./../../helpers/mailHelper/requestAcceptedToIntern');
const requestAcceptedToAdmin = require('./../../helpers/mailHelper/requestAcceptedToAdmin');
const { scheduleReminderEmails } = require('./../../services/mailing');
const { rejectBookings } = require('./../../services/bookings');
// const {
//   findAllQuestions,
//   createChecklistAnswers,
// } = require('./../../database/queries/checkList');

// const createBookingChecklistAnswers = require('../../helpers/createBookingChecklistAnswers');

const acceptBooking = async (req, res, next) => {
  const { id: bookingId } = req.params;
  const { 'cancel-others': cancelOthers } = req.query;
  const { role, _id: hostId } = req.user;
  const { moneyGoTo } = req.body;
  try {
    // check for role
    if (role !== 'host' && role !== 'superhost') {
      return next(boom.forbidden());
    }

    // get emails data
    const bookingDetails = await getBookingWithUsers(bookingId);

    // get all overlaping requests
    const { startDate, endDate } = bookingDetails;
    const overLappingBookings = await getOverlappingBookings(
      mongoose.Types.ObjectId(bookingId),
      startDate,
      endDate,
    );

    // if overlaping cancel overlapping
    if (!cancelOthers && overLappingBookings.length) {
      return res.status(409).json({ overLappingBookings });
    }

    if (cancelOthers) {
      if (!overLappingBookings.length) return next(boom.badRequest());
      // reject others
      const rejectBookingIds = overLappingBookings.map(({ _id, status }) => {
        if (status !== 'pending') {
          throw new Error("You can'nt reject accepted bookings");
        }
        return _id;
      });

      await rejectBookings(
        rejectBookingIds,
        hostId,
        'The host has accepted another booking for this time',
      );
    }

    const updatedBookingRequest = await hostAcceptBookingById({
      bookingId,
      hostId,
      moneyGoTo,
    });

    // update respondingData
    const { createdAt, confirmOrRejectDate } = updatedBookingRequest;

    const respondingTimeInMs = confirmOrRejectDate - createdAt;
    await updateRespondingData(hostId, respondingTimeInMs);

    const notification = {
      private: false,
      user: updatedBookingRequest.intern,
      secondParty: updatedBookingRequest.host,
      type: 'stayApproved',
      booking: bookingId,
    };

    // const allQuestions = await findAllQuestions();

    // create answers checklist for this booking
    // const answers = createBookingChecklistAnswers({
    //   questions: allQuestions,
    //   host: bookingDetails.host,
    //   intern: bookingDetails.intern,
    //   bookingId,
    // });

    let promiseArray = [
      // create a notification for intern
      registerNotification(notification),
      scheduleReminderEmails({
        bookingId,
        startDate: updatedBookingRequest.startDate,
        hostId: updatedBookingRequest.host._id,
        internId: updatedBookingRequest.intern._id,
      }),
      // store the answers
      // createChecklistAnswers(answers),
    ];

    if (process.env.NODE_ENV === 'production') {
      promiseArray = [
        ...promiseArray, // send email to intern
        requestAcceptedToIntern(bookingDetails),
        // send email to admin
        requestAcceptedToAdmin(bookingDetails),
      ];
    }
    await Promise.all(promiseArray);
    return res.json({});
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};

module.exports = acceptBooking;
