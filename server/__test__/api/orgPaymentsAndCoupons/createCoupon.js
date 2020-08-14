const request = require('supertest');
const moment = require('moment');
const app = require('../../../app');
const { Account } = require('../../../database/models');
const createToken = require('../../../helpers/createToken');
const buildDb = require('../../../database/data/test');
const {
  API_COUPONS_URL,
  API_ORG_PAYMENT_URL,
} = require('../../../../client/src/constants/apiRoutes');
const { paymentMethod } = require('../internPayments/mockData');

describe('Testing Organisation payemnts (create coupons):', () => {
  test('create new coupon', async done => {
    const { connection, mongoServer, accounts, users } = await buildDb({
      replSet: true,
    });

    const { organisationUser } = users;

    const fundsToAdd = 15000; // 150 pound * 100 penny

    const data = {
      amount: fundsToAdd,
      account: accounts.organisationAccount,
      paymentMethod,
    };

    const token = `token=${createToken(organisationUser._id)}`;

    request(app)
      .post(API_ORG_PAYMENT_URL)
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
        expect(res.body.success).toBeTruthy();
        const couponData = {
          internName: 'some intern',
          email: 'intern@test.com',
          discountRate: 50,
          startDate: moment(),
          endDate: moment().add(20, 'days'),
        };
        // coupon price: 21 days - 14 days + 6 days x £20 x 50%
        const newCouponValue = 13000;

        request(app)
          .post(API_COUPONS_URL)
          .send(couponData)
          .set('Cookie', [token])
          .expect('Content-Type', /json/)
          .expect(200)
          .end(async (couponErr, couponRes) => {
            if (couponErr) {
              await connection.close();
              await mongoServer.stop();
              return done(couponErr);
            }

            expect(couponRes).toBeDefined();
            expect(couponRes.body.code).toBeDefined();

            expect(couponRes.body.reservedAmount).toBe(newCouponValue);

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

            expect(orgIncom).toBe(oldOrgIncom + fundsToAdd);
            expect(orgCurrentBalance).toBe(
              oldOrgCurrentBalance + fundsToAdd - couponRes.body.reservedAmount,
            );
            expect(oldCouponValue + newCouponValue).toBe(couponsValue);

            await connection.close();
            await mongoServer.stop();
            done();
          });
      });
  }, 40000);
});
