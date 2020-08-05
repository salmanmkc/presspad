const request = require('supertest');

const buildDB = require('../../../database/data/test');
const app = require('../../../app');
const createToken = require('../../../helpers/createToken');

const {
  API_HOST_DASHBOARD_URL,
  API_HOST_UPDATE_AVAILABILITY,
} = require('../../../../client/src/constants/apiRoutes');

let connection;
let users;

describe('Testing for host dashboard route', () => {
  beforeEach(async () => {
    // build dummy data
    const { connection: _connection, users: _users } = await buildDB();
    connection = _connection;
    users = _users;
  });

  afterAll(async () => {
    await connection.close();
  });

  test("test with an host user's role to update availability settings", done => {
    const { hostUser } = users;
    const token = `token=${createToken(hostUser._id)}`;
    const data = {
      availableDates: [
        {
          startDate: '2021-02-01T14:11:03.780Z',
          endDate: '2021-05-28T11:25:45.903Z',
        },
      ],
      acceptAutomatically: true,
    };
    request(app)
      .patch(API_HOST_UPDATE_AVAILABILITY)
      .set('Cookie', [token])
      .send(data)
      .expect(200)
      .end((error, result) => {
        const { updatedListing, updatedHostAcceptBookings } = result.body;
        expect(result.body).toBeDefined();
        expect(updatedListing).toBeDefined();
        expect(updatedListing.nModified).toBe(1);
        expect(updatedHostAcceptBookings).toBeDefined();
        expect(updatedHostAcceptBookings.acceptAutomatically).toBe(
          data.acceptAutomatically,
        );
        done();
      });
  });

  test("test with an host user's role", done => {
    const { hostUser } = users;
    const token = `token=${createToken(hostUser._id)}`;

    request(app)
      .get(API_HOST_DASHBOARD_URL)
      .set('Cookie', [token])
      .expect(200)
      .end((error, result) => {
        expect(result).toBeDefined();

        const {
          userData: { name, acceptAutomatically },
          listing,
          reviews,
          notifications,
          nextBooking,
          accessibleFunds,
          pending,
          lastPayments,
        } = result.body;

        expect(name).toBe(hostUser.name);
        expect(acceptAutomatically).toBe(true);
        expect(notifications).toBeDefined();
        expect(notifications[0].secondParty).toBeDefined();
        expect(notifications[0].user).toBeDefined();
        expect(notifications[0].user.toString()).toBe(hostUser._id.toString());
        expect(listing).toBeDefined();
        expect(listing.availableDates).toBeDefined();
        expect(lastPayments).toBeDefined();
        expect(lastPayments[0].status).toBe('confirmed');
        expect(nextBooking).toBeDefined();
        expect(nextBooking.status).toBe('accepted');
        expect(pending).toBe(5000);
        expect(accessibleFunds).toBe(44500);
        expect(reviews).toBeDefined();
        expect(reviews[0].rating).toBe(5);
        done();
      });
  });
});
