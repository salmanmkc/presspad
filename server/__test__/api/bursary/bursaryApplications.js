const request = require('supertest');

const app = require('../../../app');
const buildDB = require('../../../database/data/test');
const createToken = require('../../../helpers/createToken');

const {
  API_BURSARY_APPLICATIONS,
} = require('../../../../client/src/constants/apiRoutes');
const {
  bursaryApplicationStatuses: s,
} = require('../../../database/constants');

let connection;
let users;

describe('Testing for get all bursary applications / admin', () => {
  beforeEach(async () => {
    // build dummy data
    const { connection: _connection, users: _users } = await buildDB();
    connection = _connection;
    users = _users;
  });

  afterAll(async () => {
    await connection.close();
  });

  test('get all bursary applications', done => {
    const { adminUser } = users;

    const token = `token=${createToken(adminUser._id)}`;

    request(app)
      .get(API_BURSARY_APPLICATIONS)
      .expect('Content-Type', /json/)
      .expect(200)
      .set('Cookie', [token])
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();
        expect(res.body[s.rejected]).toHaveLength(2);
        expect(res.body[s.request]).toHaveLength(2);
        expect(res.body[s.request][0].intern._id).toBeDefined();
        expect(res.body[s.request][0].intern.name).toBeDefined();
        expect(
          res.body[s.request][0].sumOtherBursariesUsedAmount,
        ).toBeDefined();
        expect(res.body[s.request][0].rejected).toBeDefined();
        expect(res.body[s.preApproved]).toHaveLength(1);
        expect(res.body[s.completed]).toHaveLength(1);
        expect(res.body[s.approved]).toHaveLength(1);

        done(err);
      });
  });
});
