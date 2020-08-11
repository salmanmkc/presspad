const mongoose = require('mongoose');
const moment = require('moment');

const { bursaryApplicationStatuses } = require('../constants');

const { Schema, model } = mongoose;

const bursaryApplicationSchema = new Schema(
  {
    status: {
      type: String,
      enum: [
        // 'request',
        // 'pre-approved',
        // 'approved',
        // 'completed',
        // 'rejected',
        ...Object.values(bursaryApplicationStatuses),
      ],
      default: bursaryApplicationStatuses.request,
      required: true,
    },
    intern: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    typeOfUser: {
      type: String,
      enum: ['new', 'existing'],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: value =>
          moment().startOf('day') <= value ||
          process.env.NODE_ENV !== 'production',
        message: 'start date is in the past',
      },
    },
    endDate: {
      type: Date,
      required: true,
      validate: {
        validator: value =>
          moment().startOf('day') <= value ||
          process.env.NODE_ENV !== 'production',
        message: 'end date is in the past',
      },
    },
    bursaryPoints: {
      type: Number,
    },
    // 50% => 50
    discountRate: {
      type: Number,
      min: 0,
      max: 100,
    },
    // the total amount of money been deducted for this bursary
    reservedAmount: {
      type: Number,
      min: 0,
    },
    // the amount of money been used by intern so far
    usedAmount: {
      type: Number,
      min: 0,
      validate: {
        validator(usedAmount) {
          return usedAmount <= this.reservedAmount;
        },
        message: 'used amount exceeded the reserved amount',
      },
    },
    // bursary's transactions history
    transactions: [
      {
        _id: { type: Schema.ObjectId, auto: true },
        // the amount been paid in this transaction
        amount: {
          type: Number,
          min: 0,
          required: true,
        },
        booking: {
          type: Schema.Types.ObjectId,
          ref: 'bookings',
        },
        transaction: {
          type: Schema.Types.ObjectId,
          ref: 'internalTransactions',
        },
      },
    ],
    adminMessage: {
      type: String,
    },
    inviteToInterview: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
);

const Booking = model('bursaryApplications', bursaryApplicationSchema);

module.exports = Booking;
