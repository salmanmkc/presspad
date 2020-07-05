const request = require('supertest');

const app = require('../../../app');
const buildDB = require('../../../database/data/test');

const createToken = require('../../../helpers/createToken');
const {
  InternalTransaction,
  WithdrawRequest,
  Account,
  Booking,
} = require('../../../database/models');

const {
  API_CANCEL_BOOKING_AFTER_PAYMENT_URL,
} = require('../../../../client/src/constants/apiRoutes');
const { bookingStatuses } = require('../../../constants');

describe('Testing cancel after payment admin route', () => {
  test('test with correct details', async done => {
    const {
      connection,
      mongoServer,
      users,
      accounts,
      bookings,
    } = await buildDB({
      replSet: true,
    });

    const { adminUser } = users;
    const { hostAccount, presspadAccount, organisationAccount } = accounts;
    const { confirmedPaidFirst } = bookings;

    const token = `token=${createToken(adminUser._id)}`;

    const data = {
      cancellationReason: 'something',
      responsibleParty: 'host',
      notes: 'something',
      hostRefund: 75,
      internRefund: 100,
      organisationRefund: 420,
      pressPadRefund: 5,
    };

    request(app)
      .post(
        API_CANCEL_BOOKING_AFTER_PAYMENT_URL.replace(
          ':id',
          confirmedPaidFirst._id,
        ),
      )
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
        const organisationAccountAfter = await Account.findById(
          organisationAccount._id,
        );

        expect(hostAccountAfter.currentBalance).toBe(
          hostAccount.currentBalance - 19500,
        );
        expect(organisationAccountAfter.currentBalance).toBe(
          organisationAccount.currentBalance + 42000,
        );
        expect(presspadAccountAfter.hostingIncome).toBe(
          presspadAccount.hostingIncome - 20250,
        );
        expect(presspadAccountAfter.bursaryFunds).toBe(
          presspadAccount.bursaryFunds - 2250,
        );

        // check transaction
        const transaction = await InternalTransaction.findOne({
          from: presspadAccount._id,
          to: organisationAccount._id,
        });

        expect(transaction).toBeDefined();
        expect(transaction.amount).toBe(42000);
        expect(transaction.type).toBe('refund');

        // check booking status
        const updatedBooking = await Booking.findById(confirmedPaidFirst._id);

        expect(updatedBooking.status).toBe(
          bookingStatuses.cancelledAfterPayment,
        );

        // check creating withdraw request for intern
        const internWithdrawRequest = await WithdrawRequest.findOne({
          user: updatedBooking.intern,
        });

        expect(internWithdrawRequest.amount).toBe(10000);
        expect(internWithdrawRequest.userType).toBe('intern');
        expect(internWithdrawRequest.status).toBe('pending');

        await connection.close();
        await mongoServer.stop();
        return done(error);
      });
  }, 40000);
});
