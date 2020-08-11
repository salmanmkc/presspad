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
          reviews,
          notifications,
          installments,
          profileCompleted,
          nextBooking,
        } = result.body;

        expect(name).toBe('Mone Dupree');
        expect(profileCompleted).toBeDefined();

        expect(notifications).toBeDefined();
        expect(notifications[0].secondParty).toBeDefined();
        expect(notifications[0].user).toBeDefined();

        expect(installments).toBeDefined();
        expect(installments[0].booking).toBeDefined();
        expect(installments[0].amount).toBeDefined();
        expect(installments[0].dueDate).toBeDefined();

        expect(reviews).toBeDefined();
        expect(reviews[0].name).toBeDefined();

        expect(nextBooking).toBeDefined();
        expect(nextBooking._id).toBeDefined();
        done();
      });
  });
});
