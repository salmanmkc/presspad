const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const bookingSchema = new Schema(
  {
    intern: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    host: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    listing: {
      type: Schema.Types.ObjectId,
      ref: 'listings',
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    confirmOrRejectDate: {
      type: Date,
    },
    // bookings need to be confirmed or canceled by [host,intern,admin]
    status: {
      type: String,
      enum: [
        'awaiting admin',
        'pending' /** ="awaiting host" */,
        'accepted',
        'confirmed',
        'canceled',
        'completed',
        'rejected by admin',
        'rejected',
      ],
      default: 'awaiting admin',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    payedAmount: {
      type: Number,
      default: 0,
    },
    // user's ID who canceled the booking
    canceledBy: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    // if the booking has been rejected by host/admin
    rejectReason: {
      type: String,
    },
    // when intern pay to booking, where should money go
    moneyGoTo: {
      type: String,
      enum: ['presspad', 'host'],
      required: true,
      default: 'host',
    },
    // if the intern has entered a discount code in the booking request
    coupon: {
      type: Schema.Types.ObjectId,
      ref: 'coupons',
    },
  },
  {
    timestamps: true,
  },
);

const Booking = model('bookings', bookingSchema);

module.exports = Booking;
