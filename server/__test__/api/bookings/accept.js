const request = require('supertest');
const moment = require('moment');

const buildDB = require('../../../database/data/test');
const app = require('../../../app');
const createToken = require('../../../helpers/createToken');
const { Booking, User } = require('./../../../database/models');
const Notification = require('./../../../database/models/Notification');

const {
  API_ACCEPT_BOOKING_URL,
} = require('../../../../client/src/constants/apiRoutes');

let connection;
let users;
let bookings;

describe('Testing host accepting booking route', () => {
  beforeEach(async () => {
    // build dummy data
    const {
      connection: _connection,
      users: _users,
      bookings: _bookings,
    } = await buildDB();
    connection = _connection;
    users = _users;
    bookings = _bookings;
  });

  afterAll(async () => {
    await connection.close();
  });

  test('host should be able to approve a booking request', async done => {
    const { hostUser } = users;
    const { pendingBooking } = bookings;

    const token = `token=${createToken(hostUser._id)}`;
    const notificationsBefore = await Notification.find({
      type: 'stayApproved',
      booking: pendingBooking,
    });

    request(app)
      .patch(API_ACCEPT_BOOKING_URL.replace(':id', pendingBooking._id))
      .set('Cookie', [token])
      .send({ moneyGoTo: 'presspad' })
      .expect(200)
      .end(async (error, result) => {
        expect(result).toBeDefined();

        const acceptedRequest = await Booking.findById(pendingBooking._id);
        const notificationsAfter = await Notification.find({
          type: 'stayApproved',
          booking: pendingBooking._id,
        });
        const updatedHostUser = await User.findById(acceptedRequest.host);
        const { confirmOrRejectDate, createdAt } = acceptedRequest;
        const respondTime = moment(confirmOrRejectDate).diff(
          createdAt,
          'milliseconds',
          true,
        );

        expect(hostUser.respondedRequests).toBe(
          updatedHostUser.respondedRequests - 1,
        );
        expect(hostUser.respondingTime).toBe(
          updatedHostUser.respondingTime - respondTime,
        );
        expect(acceptedRequest.status).toBe('accepted');
        // notification must be sent to intern
        expect(notificationsAfter.length).toBe(notificationsBefore.length + 1);
        done();
      });
  });
});
