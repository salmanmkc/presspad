const request = require('supertest');

const buildDB = require('../../../database/data/test');
const app = require('../../../app');
const createToken = require('../../../helpers/createToken');

const {
  API_INTERN_DASHBOARD_URL,
} = require('../../../../client/src/constants/apiRoutes');

let connection;
let users;

describe('Testing for intern dashboard route', () => {
  beforeEach(async () => {
    // build dummy data
    const { connection: _connection, users: _users } = await buildDB();
    connection = _connection;
    users = _users;
  });

  afterAll(async () => {
    await connection.close();
  });

  test("test with an intern user's role", done => {
    const { internUser } = users;
    const token = `token=${createToken(internUser._id)}`;

    request(app)
      .get(API_INTERN_DASHBOARD_URL)
      .set('Cookie', [token])
      .expect(200)
      .end((error, result) => {
        expect(result).toBeDefined();
        const {
          name,
          profile,
          notifications,
          installments,
          bookings,
        } = result.body.data;

        expect(name).toBe('Mone Dupree');
        expect(profile).toBeDefined();
        expect(profile.profileImage.url).toMatch(
          /https:\/\/storage.googleapis.com\/*\/*.*/,
        );

        expect(notifications).toBeDefined();
        expect(notifications).toHaveLength(1);
        expect(notifications[0].secondParty).toBeDefined();
        expect(notifications[0].user).toBeDefined();

        expect(installments).toBeDefined();
        expect(installments).toHaveLength(8);
        expect(installments[0].booking).toBeDefined();
        expect(installments[0].amount).toBeDefined();
        expect(installments[0].dueDate).toBeDefined();

        expect(bookings).toBeDefined();
        expect(bookings).toHaveLength(14);
        expect(bookings[0].status).toBeDefined();
        expect(bookings[0].startDate).toBeDefined();
        expect(bookings[0].endDate).toBeDefined();
        expect(bookings[0].host).toBeDefined();
        expect(bookings[0].host.name).toBeDefined();
        expect(bookings[0].host.profile).toBeDefined();
        done();
      });
  });
});
