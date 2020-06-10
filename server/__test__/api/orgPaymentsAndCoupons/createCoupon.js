const request = require('supertest');

const app = require('../../../app');
const { Account } = require('../../../database/models');
const createToken = require('../../../helpers/createToken');
const buildDb = require('../../../database/data/test');
const {
  API_COUPONS_URL,
} = require('../../../../client/src/constants/apiRoutes');

describe('Testing Organisation payemnts (create coupons):', () => {
  test('create new coupon', async done => {
    const { connection, mongoServer, accounts, users } = await buildDb({
      replSet: true,
    });

    const { organisationUser } = users;

    const token = `token=${createToken(organisationUser._id)}`;

    const data = {
      internName: 'some intern',
      discountRate: 50,
      startDate: Date.now() + 20 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 34 * 24 * 60 * 60 * 1000,
    };

    // coupon for 14 days means that it will discount for 1 payed day (20£)
    const newCouponValue = 10;

    request(app)
      .post(API_COUPONS_URL)
      .send(data)
      .set('Cookie', [token])
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (err, res) => {
        if (err) {
          await connection.close();
          await mongoServer.stop();
          return done(err);
        }

        expect(res).toBeDefined();
        expect(res.body.code).toBeDefined();

        expect(res.body.reservedAmount).toBe(newCouponValue);

        // Organisation account checks
        const {
          _id: orgAccountId,
          income: oldOrgIncom,
          currentBalance: oldOrgCurrentBalance,
          couponsValue: oldCouponValue,
        } = accounts.organisationAccount;

        const {
          income: orgIncom,
          currentBalance: orgCurrentBalance,
          couponsValue,
        } = await Account.findById(orgAccountId);

        expect(orgIncom).toBe(oldOrgIncom);
        expect(oldOrgCurrentBalance - newCouponValue).toBe(orgCurrentBalance);
        expect(oldCouponValue + newCouponValue).toBe(couponsValue);

        await connection.close();
        await mongoServer.stop();
        done();
      });
  }, 40000);
});
