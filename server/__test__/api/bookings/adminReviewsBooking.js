const request = require('supertest');

const app = require('../../../app');
const buildDB = require('../../../database/data/test/index');
const Booking = require('../../../database/models/Booking');
const Notification = require('../../../database/models/Notification');

const {
  API_ADMIN_REVIEWS_BOOKING,
} = require('../../../../client/src/constants/apiRoutes');

const createToken = require('../../../helpers/createToken');

let connection;
let users;
let bookings;

describe('Testing host can approve and reject booking requests', () => {
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

  test('admin should be able to reject a booking request', async done => {
    const { adminUser } = users;
    const token = `token=${createToken(adminUser._id)}`;
    const { awaitingAdminBooking } = bookings;

    const data = {
      booking: awaitingAdminBooking,
      status: 'rejected by admin',
      message: 'Your internship details proved to be fake when we checked them',
    };

    const notificationsBefore = await Notification.find({
      type: 'stayRejected',
      user: awaitingAdminBooking.intern,
    });

    request(app)
      .patch(API_ADMIN_REVIEWS_BOOKING)
      .send(data)
      .set('Cookie', [token])
      .expect(200)
      .end(async (error, result) => {
        expect(result).toBeDefined();
        expect(result.body.success).toBeDefined();

        const updatedRequest = await Booking.findById(awaitingAdminBooking._id);
        const notificationsAfter = await Notification.find({
          type: 'stayRejected',
          user: awaitingAdminBooking.intern,
        });

        expect(updatedRequest.status).toBe('rejected by admin');

        // notification must be sent to intern
        expect(notificationsAfter.length).toBe(notificationsBefore.length + 1);
        done();
      });
  });

  test('admin should be able to approve a booking request', async done => {
    const { adminUser } = users;
    const token = `token=${createToken(adminUser._id)}`;
    const { awaitingAdminBooking } = bookings;

    const data = {
      booking: awaitingAdminBooking,
      status: 'pending',
    };

    request(app)
      .patch(API_ADMIN_REVIEWS_BOOKING)
      .send(data)
      .set('Cookie', [token])
      .expect(200)
      .end(async (error, result) => {
        expect(result).toBeDefined();
        expect(result.body.success).toBeDefined();

        const updatedRequest = await Booking.findById(awaitingAdminBooking._id);

        expect(updatedRequest.status).toBe('pending');

        done();
      });
  });
});
