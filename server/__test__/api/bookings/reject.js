const request = require('supertest');
const moment = require('moment');

const app = require('../../../app');
const buildDB = require('../../../database/data/test/index');
const { Booking, User } = require('../../../database/models');
const Notification = require('../../../database/models/Notification');

const {
  API_REJECT_BOOKING_URL,
} = require('../../../../client/src/constants/apiRoutes');

const createToken = require('../../../helpers/createToken');

let connection;
let users;
let bookings;

describe('Testing for host should be able to reject booking route', () => {
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

  test('host should be able to reject a booking request', async done => {
    const { hostUser } = users;
    const { pendingBooking } = bookings;

    const token = `token=${createToken(hostUser._id)}`;

    const notificationsBefore = await Notification.find({
      type: 'stayRejected',
      user: pendingBooking.intern,
    });

    request(app)
      .patch(API_REJECT_BOOKING_URL.replace(':id', pendingBooking._id))
      .set('Cookie', [token])
      .expect(200)
      .end(async (error, result) => {
        expect(result).toBeDefined();

        const rejectedRequest = await Booking.findById(pendingBooking._id);
        const notificationsAfter = await Notification.find({
          type: 'stayRejected',
          user: pendingBooking.intern,
        });
        const updatedHostUser = await User.findById(rejectedRequest.host);
        const { confirmOrRejectDate, createdAt } = rejectedRequest;
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
        expect(rejectedRequest.status).toBe('rejected');
        // since it will only be rejected by a host
        // expect(acceptedRequest.cancelledBy.toString()).toBe(
        //   hostUser._id.toString(),
        // );
        // notification must be sent to intern
        expect(notificationsAfter.length).toBe(notificationsBefore.length + 1);
        done();
      });
  });

  test('with not "host" role', async done => {
    const { internUser } = users;
    const { pendingBooking } = bookings;

    const token = `token=${createToken(internUser._id)}`;

    request(app)
      .patch(API_REJECT_BOOKING_URL.replace(':id', pendingBooking._id))
      .set('Cookie', [token])
      .expect(403)
      .end(async (error, result) => {
        expect(result).toBeDefined();
        done(error);
      });
  });
});
