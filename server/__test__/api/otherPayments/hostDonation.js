const request = require('supertest');

const app = require('../../../app');
const buildDB = require('../../../database/data/test');

const createToken = require('../../../helpers/createToken');
const {
  InternalTransaction,
  Account,
  Booking,
} = require('../../../database/models');

const {
  API_DONATION_URL,
} = require('../../../../client/src/constants/apiRoutes');
const { bookingStatuses } = require('../../../constants');

describe('Testing for host donate to presspad account route', () => {
  test('test with correct details', async done => {
    const {
      connection,
      mongoServer,
      users,
      accounts,
      withdrawRequests,
      bookings,
    } = await buildDB({
      replSet: true,
    });

    const { hostUser } = users;
    const { hostAccount, presspadAccount } = accounts;
    const { pendingWithdrawRequest } = withdrawRequests;

    const token = `token=${createToken(hostUser._id)}`;
    await Booking.findOneAndUpdate(
      { _id: bookings.confirmedPaidUpfront._id },
      { status: bookingStatuses.completed },
      { new: true },
    );

    const amount = 4500;

    const data = { amount };

    request(app)
      .post(API_DONATION_URL)
      .set('Cookie', [token])
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (error, result) => {
        if (error) {
          await connection.close();
          await mongoServer.stop();
          return done(error);
        }

        expect(result).toBeDefined();
        expect(error).toBeFalsy();

        // check accounts
        const presspadAccountAfter = await Account.findById(
          presspadAccount._id,
        );
        const hostAccountAfter = await Account.findById(hostAccount._id);

        expect(hostAccountAfter.currentBalance).toBe(
          hostAccount.currentBalance - amount,
        );
        expect(presspadAccountAfter.donation).toBe(
          presspadAccount.donation + amount,
        );

        // check transaction
        const transaction = await InternalTransaction.findOne({
          user: hostUser._id,
          from: hostAccount._id,
          to: presspadAccount._id,
        });

        expect(transaction).toBeDefined();
        expect(transaction.amount).toBe(amount);
        await connection.close();
        await mongoServer.stop();
        return done(error);
      });
  }, 40000);

  test('test with incorrect details', async done => {
    const { connection, mongoServer, users, accounts } = await buildDB({
      replSet: true,
    });

    const { hostUser } = users;
    const { hostAccount, presspadAccount } = accounts;

    const token = `token=${createToken(hostUser._id)}`;
    const amount = hostAccount.currentBalance; // didn't account for pending withdraw request

    const data = { amount };

    request(app)
      .post(API_DONATION_URL)
      .set('Cookie', [token])
      .send(data)
      .expect('Content-Type', /json/)
      .expect(422)
      .end(async error => {
        expect(error).toBeDefined();
        const presspadAccountAfter = await Account.findById(
          presspadAccount._id,
        );
        const hostAccountAfter = await Account.findById(hostAccount._id);

        // must be no changes
        expect(hostAccountAfter.currentBalance).toBe(
          hostAccount.currentBalance,
        );
        expect(presspadAccountAfter.currentBalance).toBe(
          presspadAccount.currentBalance,
        );

        const transaction = await InternalTransaction.findOne({
          user: hostAccount._id,
          from: hostAccount._id,
          to: presspadAccount._id,
          amount,
        });

        // shouldn't create any transactions
        expect(transaction).toBeFalsy();
        await connection.close();
        await mongoServer.stop();
        done(error);
      });
  }, 40000);
});
