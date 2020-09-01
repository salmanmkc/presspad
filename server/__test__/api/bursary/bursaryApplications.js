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

  test('get "request" bursary applications', done => {
    request(app)
      .get(`${API_BURSARY_APPLICATIONS}?type=${s.request}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .set('Cookie', [token])
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();
        expect(res.body).toHaveLength(2);
        expect(res.body[0].intern._id).toBeDefined();
        expect(res.body[0].intern.name).toBeDefined();
        expect(res.body[0].awardedBursariesCost).toBeDefined();

        done(err);
      });
  });

  test('get "request" bursary applications', done => {
    request(app)
      .get(`${API_BURSARY_APPLICATIONS}?type=${s.rejected}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .set('Cookie', [token])
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();
        expect(res.body).toHaveLength(2);
        expect(res.body[0].intern._id).toBeDefined();
        expect(res.body[0].intern.name).toBeDefined();
        expect(res.body[0].awardedBursariesCost).toBeDefined();

        done(err);
      });
  });

  test('get "approved" bursary applications', done => {
    request(app)
      .get(`${API_BURSARY_APPLICATIONS}?type=${s.approved}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .set('Cookie', [token])
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();
        expect(res.body).toHaveLength(2);
        expect(res.body[0].intern._id).toBeDefined();
        expect(res.body[0].intern.name).toBeDefined();
        expect(res.body[0].awardedBursariesCost).toBeDefined();

        done(err);
      });
  });

  test('get "preApproved" bursary applications', done => {
    request(app)
      .get(`${API_BURSARY_APPLICATIONS}?type=${s.preApproved}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .set('Cookie', [token])
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();
        expect(res.body).toHaveLength(2);
        expect(res.body[0].intern._id).toBeDefined();
        expect(res.body[0].intern.name).toBeDefined();
        expect(res.body[0].awardedBursariesCost).toBeDefined();

        done(err);
      });
  });

  test('get "completed" bursary applications', done => {
    request(app)
      .get(`${API_BURSARY_APPLICATIONS}?type=${s.completed}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .set('Cookie', [token])
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();
        expect(res.body).toHaveLength(1);
        expect(res.body[0].intern._id).toBeDefined();
        expect(res.body[0].intern.name).toBeDefined();
        expect(res.body[0].awardedBursariesCost).toBeDefined();

        done(err);
      });
  });

  test('Update a bursary application - pre-approve', done => {
    const { requestedBursary } = bursaryApplications;

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
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();

        done(err);
      });
  });
});
