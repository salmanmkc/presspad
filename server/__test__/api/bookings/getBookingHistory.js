const request = require('supertest');

const buildDB = require('../../../database/data/test');
const app = require('../../../app');
const createToken = require('../../../helpers/createToken');

const {
  API_ADMIN_BOOKING_HISTORY,
} = require('../../../../client/src/constants/apiRoutes');

let connection;
let users;
// let bookings;

describe('Testing for getting active bookings for admin', () => {
  beforeEach(async () => {
    // build dummy data
    const {
      connection: _connection,
      users: _users,
      // bookings: _bookings,
    } = await buildDB();
    connection = _connection;
    users = _users;
    // bookings = _bookings;
  });

  afterAll(async () => {
    await connection.close();
  });

  test('should get all the active bookings', async done => {
    const { adminUser } = users;
    const token = `token=${createToken(adminUser._id)}`;
    // const { pendingBooking } = bookings;

    request(app)
      .get(API_ADMIN_BOOKING_HISTORY)
      .set('Cookie', [token])
      .expect(200)
      .end(async (err, res) => {
        expect(res).toBeDefined();
        expect(res.body.length).toBe(4);
        done();
      });
  });
});
