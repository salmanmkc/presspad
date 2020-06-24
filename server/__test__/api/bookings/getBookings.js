const request = require('supertest');
const moment = require('moment');
const buildDB = require('../../../database/data/test');
const app = require('../../../app');
const createToken = require('../../../helpers/createToken');

const {
  API_GET_BOOKINGS_URL,
} = require('../../../../client/src/constants/apiRoutes');

let connection;
let users;
let bookings;

describe('Testing for user bookings page', () => {
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

  test('should get all bookings for intern ', async done => {
    const { internUser } = users;

    const token = `token=${createToken(internUser._id)}`;

    request(app)
      .get(API_GET_BOOKINGS_URL)
      .set('Cookie', [token])
      .expect(200)
      .end(async (error, result) => {
        expect(result.body).toBeDefined();
        expect(result.body).toHaveProperty(
          'currentBooking',
          'nextUpcomingBooking',
          'bookingRequests',
          'previousBookings',
        );

        // check if position 0 is current booking
        expect(
          ['accepted', 'confirmed'].includes(
            result.body.currentBooking[0].status,
          ),
        ).toBeTruthy();
        expect(
          moment(result.body.currentBooking[0].startDate).isSameOrBefore(
            new Date(),
          ),
        ).toBeTruthy();
        expect(
          moment(result.body.currentBooking[0].endDate).isSameOrAfter(
            new Date(),
          ),
        ).toBeTruthy();
        // check if positon 1 is upcoming
        expect(
          ['accepted', 'confirmed'].includes(
            result.body.nextUpcomingBooking[0].status,
          ),
        ).toBeTruthy();
        expect(
          moment(result.body.nextUpcomingBooking[0].startDate).isSameOrAfter(
            new Date(),
          ),
        ).toBeTruthy();

        // check if positon 2 are booking requests
        expect(
          ['awaiting admin', 'pending'].includes(
            result.body.bookingRequests[0].status,
          ),
        ).toBeTruthy();
        expect(
          ['awaiting admin', 'pending'].includes(
            result.body.bookingRequests[1].status,
          ),
        ).toBeTruthy();

        // check if position 3 are previous bookings
        expect(
          ['completed', 'rejected', 'cancelled', 'rejected by admin'].includes(
            result.body.previousBookings[0].status,
          ),
        ).toBeTruthy();
        expect(
          moment(result.body.previousBookings[0].endDate).isBefore(new Date()),
        ).toBeTruthy();

        expect(
          ['completed', 'rejected', 'cancelled', 'rejected by admin'].includes(
            result.body.previousBookings[1].status,
          ),
        ).toBeTruthy();
        expect(
          moment(result.body.previousBookings[1].endDate).isBefore(new Date()),
        ).toBeTruthy();
        done();
      });
  });
});
