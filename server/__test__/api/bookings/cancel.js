const request = require('supertest');

const buildDB = require('../../../database/data/test/index');
const app = require('../../../app');

const createToken = require('../../../helpers/createToken');
const {
  API_CANCEL_BOOKING_URL,
} = require('../../../../client/src/constants/apiRoutes');

let connection;
let users;
let bookings;

describe('Testing for cancel booking route', () => {
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

  test('test to cancel booking with valid request BEFORE payment', async done => {
    const { internUser } = users;
    const { confirmedNotPaid } = bookings;

    const token = `token=${createToken(internUser._id)}`;

    const data = {
      booking: confirmedNotPaid._id,
      cancellingUserMessage:
        'this is a test to cancel a booking before payment',
      cancellingUserId: confirmedNotPaid.intern._id,
    };

    request(app)
      .patch(API_CANCEL_BOOKING_URL.replace(':id', confirmedNotPaid._id))
      .send(data)
      .set('Cookie', [token])
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body).toBeDefined();
        expect(res.body.status).toBe('cancelled');
        expect(res.body.cancellationDetails).toBeDefined();
        expect(res.body.cancellationDetails.cancelledBy).toBe(
          internUser._id.toString(),
        );
        done(err);
      });
  });

  test('test to cancel booking with invalid request BEFORE payment', async done => {
    const { internUser } = users;
    const { confirmedPaidFirst } = bookings;

    const token = `token=${createToken(internUser._id)}`;

    const data = {
      booking: confirmedPaidFirst._id,
      cancellingUserMessage:
        'this is another test to cancel a booking before payment',
      cancellingUserId: confirmedPaidFirst.intern._id,
    };

    request(app)
      .patch(API_CANCEL_BOOKING_URL.replace(':id', confirmedPaidFirst._id))
      .send(data)
      .set('Cookie', [token])
      .expect('Content-Type', /json/)
      .expect(500)
      .end((err, res) => {
        expect(res.error).toBeDefined();
        done(err);
      });
  });
});
