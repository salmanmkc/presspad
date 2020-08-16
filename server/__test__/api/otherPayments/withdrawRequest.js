const request = require('supertest');

const app = require('../../../app');
const buildDB = require('../../../database/data/test');

const createToken = require('../../../helpers/createToken');
const {
  WithdrawRequest,
  Account,
  Booking,
} = require('../../../database/models');
const { bookingStatuses } = require('../../../constants');

const {
  API_WITHDRAW_REQUEST_URL,
  API_UPDATE_WITHDRAW_REQUEST_URL,
} = require('../../../../client/src/constants/apiRoutes');

describe('Testing for host making withdraw request', () => {
  test('test with correct details', async done => {
    const {
      connection,
      mongoServer,
      users,
      accounts,
      bookings,
    } = await buildDB();

    const { hostUser } = users;
    const { hostAccount } = accounts;
    const { confirmedPaidUpfront } = bookings;

    const token = `token=${createToken(hostUser._id)}`;

    await Booking.findOneAndUpdate(
      { _id: confirmedPaidUpfront._id },
      { status: bookingStatuses.completed },
      { new: true },
    );
    const amount = 4500;

    const data = {
      amount,
      bankName: 'bankName',
      sortCode: 'sortCode',
      accountNumber: 'accountNumber',
    };

    request(app)
      .post(API_WITHDRAW_REQUEST_URL)
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

        const hostAccountAfter = await Account.findById(hostAccount._id);

        // withdraw requests doesn't change balance until the admin approve it
        expect(hostAccountAfter.currentBalance).toBe(
          hostAccount.currentBalance,
        );

        const newWithdrawRequest = await WithdrawRequest.findOne({
          user: hostUser._id,
          account: hostAccount._id,
          amount,
        });

        expect(newWithdrawRequest).toBeDefined();
        expect(newWithdrawRequest.status).toBe('pending');
        await connection.close();
        await mongoServer.stop();
        done(error);
      });
  });

  test('test with incorrect details', async done => {
    const { connection, mongoServer, users, accounts } = await buildDB();

    const { hostUser } = users;
    const { hostAccount } = accounts;

    const token = `token=${createToken(hostUser._id)}`;
    const amount = hostAccount.currentBalance; // doesn't account for pending withdraw request

    const data = {
      amount,
      bankName: 'bankName',
      sortCode: 'sortCode',
      accountNumber: 'accountNumber',
    };

    request(app)
      .post(API_WITHDRAW_REQUEST_URL)
      .set('Cookie', [token])
      .send(data)
      .expect('Content-Type', /json/)
      .expect(500)
      .end(async error => {
        if (error) {
          await connection.close();
          await mongoServer.stop();
          return done(error);
        }

        expect(error).toBeDefined();

        const hostAccountAfter = await Account.findById(hostAccount._id);

        // withdraw requests doesn't change balance untill the admin approve it
        expect(hostAccountAfter.currentBalance).toBe(
          hostAccount.currentBalance,
        );

        // should not create a withdraw request
        const newWithdrawRequest = await WithdrawRequest.findOne({
          user: hostUser._id,
          account: hostAccount._id,
          amount,
        });

        expect(newWithdrawRequest).toBeNull();
        await connection.close();
        await mongoServer.stop();
        done(error);
      });
  });
});

describe('Testing for Admin transfered withdraw request', () => {
  test('test with correct details', async done => {
    const {
      connection,
      mongoServer,
      users,
      accounts,
      withdrawRequests,
    } = await buildDB({
      replSet: true,
    });

    const { adminUser, hostUser } = users;
    const { hostAccount, presspadAccount } = accounts;
    const { pendingWithdrawRequest } = withdrawRequests;

    const token = `token=${createToken(adminUser._id)}`;

    const data = {
      type: 'transfered',
    };

    const url = API_UPDATE_WITHDRAW_REQUEST_URL.replace(
      ':id',
      pendingWithdrawRequest._id,
    );

    request(app)
      .patch(url)
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

        const hostAccountAfter = await Account.findById(hostAccount._id);
        const presspadAccountAfter = await Account.findById(
          presspadAccount._id,
        );

        // check accounts
        expect(hostAccountAfter.currentBalance).toBe(
          hostAccount.currentBalance - pendingWithdrawRequest.amount,
        );
        expect(hostAccountAfter.withdrawal).toBe(
          hostAccount.withdrawal + pendingWithdrawRequest.amount,
        );
        expect(presspadAccountAfter.currentBalance).toBe(
          presspadAccount.currentBalance - pendingWithdrawRequest.amount,
        );

        const newWithdrawRequest = await WithdrawRequest.findOne({
          user: hostUser._id,
          account: hostAccount._id,
          amount: pendingWithdrawRequest.amount,
        });

        expect(newWithdrawRequest).toBeDefined();
        expect(newWithdrawRequest.status).toBe('transfered');
        await connection.close();
        await mongoServer.stop();
        done(error);
      });
  }, 40000);

  test('test with incorrect details', async done => {
    const {
      connection,
      mongoServer,
      users,
      accounts,
      withdrawRequests,
    } = await buildDB({
      replSet: true,
    });

    const { adminUser } = users;
    const { hostAccount, presspadAccount } = accounts;
    const { transferedWithdrawRequest } = withdrawRequests;

    const token = `token=${createToken(adminUser._id)}`;

    const data = {
      type: 'transfered',
    };

    const url = API_UPDATE_WITHDRAW_REQUEST_URL.replace(
      ':id',
      transferedWithdrawRequest._id,
    );

    request(app)
      .patch(url)
      .set('Cookie', [token])
      .send(data)
      .expect('Content-Type', /json/)
      .expect(403)
      .end(async error => {
        expect(error).toBeDefined();

        const hostAccountAfter = await Account.findById(hostAccount._id);
        const presspadAccountAfter = await Account.findById(
          presspadAccount._id,
        );

        // check accounts
        expect(hostAccountAfter.currentBalance).toBe(
          hostAccount.currentBalance,
        );
        expect(hostAccountAfter.withdrawal).toBe(hostAccount.withdrawal);
        expect(presspadAccountAfter.currentBalance).toBe(
          presspadAccount.currentBalance,
        );

        await connection.close();
        await mongoServer.stop();
        done(error);
      });
  }, 40000);
});
