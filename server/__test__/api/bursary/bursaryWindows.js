const request = require('supertest');
const moment = require('moment');

const buildDB = require('../../../database/data/test');

const app = require('../../../app');

const createToken = require('../../../helpers/createToken');

const {
  API_BURSARY_WINDOWS,
} = require('../../../../client/src/constants/apiRoutes');

let connection;
let users;
let bursaryWindows;

describe('Testing for get all bursary windows / admin', () => {
  beforeEach(async () => {
    // build dummy data
    const {
      connection: _connection,
      users: _users,
      bursaryWindows: _bursaryWindows,
    } = await buildDB();

    connection = _connection;
    users = _users;
    bursaryWindows = _bursaryWindows;
  });

  afterAll(async () => {
    await connection.close();
  });

  test('get all bursary windows', done => {
    const { adminUser } = users;

    const token = `token=${createToken(adminUser._id)}`;

    request(app)
      .get(API_BURSARY_WINDOWS)
      .set('Cookie', [token])
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toHaveLength(2);
        done(err);
      });
  });

  test('update bursary windows', done => {
    const { adminUser } = users;
    const { bursaryWindow1, bursaryWindow2 } = bursaryWindows;

    const token = `token=${createToken(adminUser._id)}`;

    bursaryWindow1.startDate = moment().add(5, 'd');

    const newBursaryWindows = [
      bursaryWindow1,
      bursaryWindow2,
      {
        startDate: moment().add(10, 'd'),
        endDate: moment().add(150, 'd'),
      },
    ];

    request(app)
      .put(API_BURSARY_WINDOWS)
      .set('Cookie', [token])
      .send({ bursaryWindows: newBursaryWindows })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toHaveLength(3);
        expect(
          moment()
            .add(5, 'd')
            .isSame(res.body[0].startDate, 'd'),
        ).toBe(true);
        done(err);
      });
  });
});
