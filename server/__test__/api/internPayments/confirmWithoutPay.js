const request = require('supertest');
const moment = require('moment');

const app = require('../../../app');
const { Account, Installment } = require('../../../database/models');
const buildDb = require('../../../database/data/test');
const createToken = require('../../../helpers/createToken');
const { createInstallments } = require('../../../helpers/payments');
const {
  API_INTERN_PAYMENT_URL,
} = require('../../../../client/src/constants/apiRoutes');

describe('Testing Intern confirming booking when the coupon cover all payments', () => {
  test('new booking', async done => {
    const {
      accounts,
      connection,
      mongoServer,
      bookings,
      coupons,
      users,
    } = await buildDb({
      replSet: true,
    });

    const { internUser } = users;

    const token = `token=${createToken(internUser._id)}`;

    const {
      _id,
      startDate,
      endDate,
    } = bookings.acceptedNotPaidInstallmentApplicable;
    const bookingId = _id;

    const bookingDays =
      moment(endDate)
        .startOf('d')
        .diff(moment(startDate).startOf('d'), 'days') + 1;

    const couponDiscount = (bookingDays - 14) * 2000;
    const couponInfo = {
      couponCode: coupons.activeFull.code,
      discountDays: bookingDays - 14,
      discountRate: coupons.activeFull.discountRate,
      couponDiscount,
    };

    const paymentInfo = createInstallments({
      couponInfo,
      bookingDays,
      startDate,
      endDate,
      upfront: false,
    });

    const data = {
      bookingId,
      couponInfo,
      paymentInfo,
      withoutPay: true,
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

        expect(internIncom).toBe(oldInternIncom);
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

        expect(hostIncom - oldHostIncom).toBe(0.45 * couponDiscount);
        expect(oldHostCurrentBalance + 0.45 * couponDiscount).toBe(
          hostCurrentBalance,
        );

        // Presspad account checks
        const {
          _id: presspadAccId,
          income: oldPresspadIncom,
          currentBalance: oldPresspadCurrentBalance,
          bursaryFunds: oldPresspadBursaryFunds,
          hostingIncome: oldPresspadHostingIncome,
        } = accounts.presspadAccount;

        const {
          income: presspadIncom,
          currentBalance: presspadCurrentBalance,
          bursaryFunds: presspadBursaryFunds,
          hostingIncome: presspadHostingIncome,
        } = await Account.findById(presspadAccId);

        expect(presspadIncom).toBe(oldPresspadIncom);
        expect(oldPresspadCurrentBalance).toBe(presspadCurrentBalance);
        expect(presspadBursaryFunds - oldPresspadBursaryFunds).toBe(
          0.1 * couponDiscount,
        );

        expect(presspadHostingIncome - oldPresspadHostingIncome).toBe(
          0.45 * couponDiscount,
        );

        // Installments check
        const installments = await Installment.find({
          booking: bookingId,
        });

        expect(installments).toHaveLength(0);

        await connection.close();
        await mongoServer.stop();
        return done();
      });
  }, 40000);

  test('old booking', async done => {
    const {
      accounts,
      connection,
      mongoServer,
      bookings,
      coupons,
      users,
      installments,
    } = await buildDb({
      replSet: true,
    });

    const { internUser } = users;

    const token = `token=${createToken(internUser._id)}`;

    const { _id, startDate, endDate } = bookings.confirmedPaidFirstNoCoupon;
    const bookingId = _id;

    const bookingDays = moment(endDate).diff(startDate, 'd') + 1;
    const couponDiscount = (bookingDays - 28) * 2000;
    const couponInfo = {
      couponCode: coupons.activeFull.code,
      discountDays: bookingDays - 28,
      discountRate: coupons.activeFull.discountRate,
      couponDiscount,
    };

    const paymentInfo = installments.secondUnpaidPaymentNoCoupon;
    paymentInfo.amount = 0;

    const data = {
      bookingId,
      couponInfo,
      paymentInfo,
      withoutPay: true,
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

        expect(internIncom).toBe(oldInternIncom);
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

        expect(hostIncom - oldHostIncom).toBe(0.45 * couponDiscount);
        expect(oldHostCurrentBalance + 0.45 * couponDiscount).toBe(
          hostCurrentBalance,
        );

        // Presspad account checks
        const {
          _id: presspadAccId,
          income: oldPresspadIncom,
          currentBalance: oldPresspadCurrentBalance,
          bursaryFunds: oldPresspadBursaryFunds,
          hostingIncome: oldPresspadHostingIncome,
        } = accounts.presspadAccount;

        const {
          income: presspadIncom,
          currentBalance: presspadCurrentBalance,
          bursaryFunds: presspadBursaryFunds,
          hostingIncome: presspadHostingIncome,
        } = await Account.findById(presspadAccId);

        expect(presspadIncom).toBe(oldPresspadIncom);
        expect(oldPresspadCurrentBalance).toBe(presspadCurrentBalance);
        expect(presspadBursaryFunds - oldPresspadBursaryFunds).toBe(
          0.1 * couponDiscount,
        );

        expect(presspadHostingIncome - oldPresspadHostingIncome).toBe(
          0.45 * couponDiscount,
        );

        // Installments check
        const bookingInstallments = await Installment.find({
          booking: bookingId,
        });

        // check that old paid installment not deleted
        expect(bookingInstallments).toHaveLength(1);

        await connection.close();
        await mongoServer.stop();
        return done();
      });
  }, 40000);
});
