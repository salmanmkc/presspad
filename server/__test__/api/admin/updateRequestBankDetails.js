const request = require('supertest');

const buildDB = require('../../../database/data/test');
const app = require('../../../app');
const createToken = require('../../../helpers/createToken');

// API ROUTE
const {
  API_ADMIN_UPDATE_REQUEST_BANK_DETAILS_URL,
} = require('../../../../client/src/constants/apiRoutes');

let connection;
let users;
let withdrawRequests;

describe('Testing for updating bank details route', () => {
  beforeEach(async () => {
    // build dummy data
    const {
      connection: _connection,
      users: _users,
      withdrawRequests: _withdrawRequests,
    } = await buildDB();
    connection = _connection;
    users = _users;
    withdrawRequests = _withdrawRequests;
  });

  afterAll(async () => {
    await connection.close();
  });

  // tests user validation
  test('Admin is able to update a interns bank details', async done => {
    const { adminUser } = users;
    const { pendingInternWithdrawRequest } = withdrawRequests;

    const data = {
      requestId: pendingInternWithdrawRequest._id,
      bankDetails: {
        bankName: 'Name of bank',
        bankSortCode: '12345678',
        accountNumber: '1241245',
      },
    };

    const token = `token=${createToken(adminUser._id)}`;

    request(app)
      .patch(API_ADMIN_UPDATE_REQUEST_BANK_DETAILS_URL)
      .set('Cookie', [token])
      .send(data)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(async (error, response) => {
        if (error) return done(error);
        expect(response.body).toBeDefined();
        expect(response.body.accountNumber).toBeDefined();
        expect(response.body.bankSortCode).toBeDefined();
        expect(response.body.bankName).toBeDefined();
        return done();
      });
  });
});
