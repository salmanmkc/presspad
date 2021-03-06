const request = require('supertest');

const buildDB = require('../../../database/data/test');
const app = require('../../../app');
const createToken = require('../../../helpers/createToken');

// API ROUTE
const {
  API_ADMIN_STATS_URL,
} = require('../../../../client/src/constants/apiRoutes');

let connection;
let users;
let organisations;

describe('Testing for get host profile route', () => {
  beforeEach(async () => {
    // build dummy data
    const {
      connection: _connection,
      users: _users,
      organisations: _organisations,
    } = await buildDB();
    connection = _connection;
    users = _users;
    organisations = _organisations;
  });

  afterAll(async () => {
    await connection.close();
  });

  test('test with correct user id and client', done => {
    const { adminUser } = users;
    const token = `token=${createToken(adminUser._id)}`;
    const { financialTimeOrganisation } = organisations;
    const data = { userType: 'clients' };

    request(app)
      .post(API_ADMIN_STATS_URL)
      .set('Cookie', [token])
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((error, result) => {
        expect(result).toBeDefined();
        expect(result.body).toBeDefined();
        expect(result.body[0].organisation).toBe(
          financialTimeOrganisation.name,
        );
        expect(result.body[0].currentlyHosting).toBeDefined();
        expect(result.body[0].currentBalance).toBeDefined();
        expect(result.body[0]._id).toBeDefined();
        done(error);
      });
  });

  test('test with correct user id and intern', done => {
    // must be an admin user
    const { adminUser } = users;

    const token = `token=${createToken(adminUser._id)}`;
    const data = { userType: 'interns' };

    request(app)
      .post(API_ADMIN_STATS_URL)
      .set('Cookie', [token])
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((error, result) => {
        expect(result).toBeDefined();
        expect(result.body).toBeDefined();
        expect(result.body[3].key).toBe(4);
        expect(result.body[3].name).toBeDefined();
        expect(result.body[3].bookingStatus).toBeDefined();
        expect(result.body[3].organisation).toBeDefined();

        done(error);
      });
  });

  test('test with correct user id and host', done => {
    // must be an admin user
    const { adminUser, hostUser } = users;
    const token = `token=${createToken(adminUser._id)}`;

    const data = { userType: 'hosts' };

    request(app)
      .post(API_ADMIN_STATS_URL)
      .set('Cookie', [token])
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((error, result) => {
        expect(result).toBeDefined();
        expect(result).toBeDefined();
        expect(result.body).toBeDefined();
        expect(result.body[0].key).toBe(1);
        expect(result.body[0].name).toBe(hostUser.name);
        expect(result.body[0].email).toBe(hostUser.email);
        expect(result.body[0].internsHosted).toBe(1);
        expect(result.body[0].earnings).toBe(49500);
        expect(result.body[0].wallet).toBe(49500);
        done(error);
      });
  });
});
