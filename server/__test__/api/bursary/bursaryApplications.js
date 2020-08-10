const request = require('supertest');

const app = require('../../../app');
const buildDB = require('../../../database/data/test');
const createToken = require('../../../helpers/createToken');

const {
  API_BURSARY_APPLICATIONS,
  API_UPDATE_BURSARY_APPLICATIONS,
} = require('../../../../client/src/constants/apiRoutes');
const {
  bursaryApplicationStatuses: s,
} = require('../../../database/constants');

describe('Testing for get all bursary applications / admin', () => {
  let connection;
  let token;
  let bursaryApplications;

  beforeEach(async () => {
    // build dummy data
    const {
      connection: _connection,
      users,
      bursaryApplications: _bursaryApplications,
    } = await buildDB();
    connection = _connection;
    bursaryApplications = _bursaryApplications;
    const { adminUser } = users;

    token = `token=${createToken(adminUser._id)}`;
  });

  afterAll(async () => {
    await connection.close();
  });

  test('get all bursary applications', done => {
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

  test('Update a bursary application - pre-approve', done => {
    const {
      requestedBursary,
      requestedBursary2,
      preApprovedBursary,
    } = bursaryApplications;

    const payload = {
      points: 200,
      adminMessage: 'test message',
      inviteToInterview: true,
      status: s.preApproved,
    };

    request(app)
      .patch(
        API_UPDATE_BURSARY_APPLICATIONS.replace(':id', requestedBursary._id),
      )
      .set('Cookie', [token])
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        console.log(res.body);
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();

        done(err);
      });
  });
});
