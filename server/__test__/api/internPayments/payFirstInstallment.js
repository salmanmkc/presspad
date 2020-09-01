const request = require('supertest');
const moment = require('moment');

const app = require('../../../app');
const {
  Account,
  Installment,
  InternalTransaction,
  ExternalTransaction,
} = require('../../../database/models');
const buildDb = require('../../../database/data/test');
const createToken = require('../../../helpers/createToken');
const { createInstallments } = require('../../../helpers/payments');
const {
  API_INTERN_PAYMENT_URL,
} = require('../../../../client/src/constants/apiRoutes');
const { paymentMethod } = require('./mockData');

describe('Testing Intern payments (Pay in 3 installments):', () => {
  const couponInfo = {
    couponCode: '',
    discountDays: 0,
    discountRate: 0,
    couponDiscount: 0,
  };

  test('new installments pay first of 3', async done => {
    const {
      connection,
      mongoServer,
      bookings,
      accounts,
      users,
      bursaryApplications,
    } = await buildDb({
      replSet: true,
    });

    const { internUser } = users;
    const { approvedInternUserBursary } = bursaryApplications;

    const token = `token=${createToken(internUser._id)}`;

    const {
      _id,
      startDate,
      endDate,
      price,
    } = bookings.acceptedNotPaidInstallmentApplicable;
    const bookingId = _id;

    const bookingDays =
      moment(endDate)
        .endOf('d')
        .diff(startDate, 'd') + 1;

    const {
      discountRate: bursaryDiscountRate,
      londonWeighting,
      totalPotentialAmount,
      totalSpentSoFar,
    } = approvedInternUserBursary;
    let bursaryDiscount = (price * bursaryDiscountRate) / 100;
    if (londonWeighting) {
      bursaryDiscount = (price * bursaryDiscountRate) / 100 + price * 0.2;
    }
    // get total left in bursary
    const availableBursary = totalPotentialAmount - totalSpentSoFar;
    // check if enough funds available - if not set remaining funds as discount
    if (availableBursary < bursaryDiscount) {
      bursaryDiscount = availableBursary;
    }

    const paymentInfo = createInstallments({
      couponInfo,
      bookingDays,
      startDate,
      endDate,
      upfront: false,
      bursaryDiscount,
    });

    const data = {
      bookingId,
      couponInfo,
      paymentInfo,
      paymentMethod,
      bursaryDiscount,
    };

    request(app)
      .post(API_INTERN_PAYMENT_URL)
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

        const firstPay = paymentInfo[0].amount;
        // Intern account checks
        const {
          _id: internAccountId,
          income: oldInternIncom,
          currentBalance: oldInternCurrentBalance,
        } = accounts.internAccount;

        const {
          income: internIncom,
          currentBalance: internCurrentBalance,
        } = await Account.findById(internAccountId);

        expect(internIncom - oldInternIncom).toBe(firstPay);
        expect(oldInternCurrentBalance).toBe(internCurrentBalance);

        // Host account checks
        const {
          _id: hostAccId,
          income: oldHostIncom,
          currentBalance: oldHostCurrentBalance,
        } = accounts.hostAccount;

        const {
          income: hostIncom,
          currentBalance: hostCurrentBalance,
        } = await Account.findById(hostAccId);

        expect(hostIncom - oldHostIncom).toBe(
          0.45 * (firstPay + bursaryDiscount),
        );
        expect(
          oldHostCurrentBalance + 0.45 * (firstPay + bursaryDiscount),
        ).toBe(hostCurrentBalance);

        // Presspad account checks
        const {
          _id: presspadAccId,
          income: oldPresspadIncom,
          currentBalance: oldPresspadCurrentBalance,
          bursaryFunds: oldPresspadBursaryFunds,
        } = accounts.presspadAccount;

        const {
          income: presspadIncom,
          currentBalance: presspadCurrentBalance,
          bursaryFunds: presspadBursaryFunds,
        } = await Account.findById(presspadAccId);

        expect(presspadIncom - oldPresspadIncom).toBe(firstPay);
        expect(oldPresspadCurrentBalance + firstPay).toBe(
          presspadCurrentBalance,
        );
        expect(presspadBursaryFunds - oldPresspadBursaryFunds).toBe(
          0.1 * (firstPay + bursaryDiscount),
        );
        // Todo test hostingIncome

        // Installments check
        const [
          { amount: installmentAmount, transaction },
        ] = await Installment.find({
          booking: bookingId,
          transaction: { $exists: true },
        });

        expect(installmentAmount).toBe(firstPay);

        // InternalTransaction check
        const {
          amount: internalTransactionAmount,
          type,
        } = await InternalTransaction.findById(transaction);

        expect(type).toBe('installment');
        expect(internalTransactionAmount).toBe(firstPay);

        // ExternalTransaction check
        const [
          { amount: exTransactionAmmount, type: exTransactionType },
        ] = await ExternalTransaction.find({
          account: internAccountId,
        })
          .limit(1)
          .sort({ $natural: -1 });

        expect(exTransactionAmmount).toBe(firstPay);
        expect(exTransactionType).toBe('deposite');

        await connection.close();
        await mongoServer.stop();
        return done();
      });
  }, 40000);

  test('new installments pay first of 3 - invalid price', async done => {
    const {
      connection,
      mongoServer,
      bookings,
      accounts,
      users,
    } = await buildDb({
      replSet: true,
    });

    const {
      _id,
      startDate,
      endDate,
    } = bookings.acceptedNotPaidInstallmentApplicable;
    const bookingId = _id;

    const { internUser } = users;
    const token = `token=${createToken(internUser._id)}`;

    const bookingDays = moment(endDate).diff(startDate, 'd') + 1;
    const paymentInfo = createInstallments({
      couponInfo,
      bookingDays,
      startDate,
      endDate,
      upfront: false,
    });

    paymentInfo[0].amount = 0;

    const data = {
      bookingId,
      couponInfo,
      paymentInfo,
      paymentMethod,
    };

    request(app)
      .post(API_INTERN_PAYMENT_URL)
      .send(data)
      .set('Cookie', [token])
      .expect('Content-Type', /json/)
      .expect(422)
      .end(async (err, res) => {
        if (err) {
          await connection.close();
          await mongoServer.stop();
          return done(err);
        }

        expect(res).toBeDefined();
        expect(res.body.error).toBe('wrong installments info');

        // Intern account checks
        const {
          _id: internAccountId,
          income: oldInternIncom,
        } = accounts.internAccount;

        const { income: internIncom } = await Account.findById(internAccountId);

        expect(internIncom).toBe(oldInternIncom);

        // Host account checks
        const {
          _id: hostAccountId,
          income: oldHostIncom,
          currentBalance: oldHostCurrentBalance,
        } = accounts.hostAccount;

        const {
          income: hostIncom,
          currentBalance: hostCurrentBalance,
        } = await Account.findById(hostAccountId);

        expect(hostIncom).toBe(oldHostIncom);
        expect(oldHostCurrentBalance).toBe(hostCurrentBalance);

        // Presspad account checks
        const {
          _id: presspadAccountId,
          income: oldPresspadIncom,
          currentBalance: oldPresspadCurrentBalance,
        } = accounts.presspadAccount;

        const {
          income: presspadIncom,
          currentBalance: presspadCurrentBalance,
        } = await Account.findById(presspadAccountId);

        expect(presspadIncom).toBe(oldPresspadIncom);
        expect(oldPresspadCurrentBalance).toBe(presspadCurrentBalance);

        // Installments check
        const [installment] = await Installment.find({
          booking: bookingId,
        });

        expect(installment).toBeUndefined();

        await connection.close();
        await mongoServer.stop();
        return done();
      });
  }, 40000);
});
