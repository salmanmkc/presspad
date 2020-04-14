const request = require('supertest');

const buildDB = require('./../../../database/data/test/index');
const app = require('./../../../app');
const Profile = require('../../../database/models/Profile');

const {
  API_ADMIN_UPDATE_PROFILE,
} = require('./../../../../client/src/constants/apiRoutes');

const createToken = require('../../../helpers/createToken');

let connection;
let users;
let profiles;

describe('Testing for get host profile route', () => {
  beforeAll(async () => {
    // build dummy data
    const {
      connection: _connection,
      users: _users,
      profiles: _profiles,
    } = await buildDB();
    connection = _connection;
    users = _users;
    profiles = _profiles;
  });

  afterAll(async () => {
    await connection.close();
  });

  test('test with correct city and dates', done => {
    const { adminUser, hostUser } = users;
    const token = `token=${createToken(adminUser._id)}`;

    const data = {
      fieldsToUpdate: {
        DBSCheck: { refNum: '123123', fileName: 'filename.jpg' },
      },
      userId: hostUser._id,
    };

    request(app)
      .patch(API_ADMIN_UPDATE_PROFILE)
      .send(data)
      .set('Cookie', [token])
      .expect(200)
      .end(async (err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();

        const updatedProfile = await Profile.findOne({ user: hostUser._id });

        expect(updatedProfile.DBSCheck.fileName).toBe('filename.jpg');
        expect(updatedProfile.DBSCheck.refNum).toBe('123123');

        done(err);
      });
  });
});
