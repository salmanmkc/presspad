const mongoose = require('mongoose');

const { bookingStatuses } = require('../../constants');

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
    // bookings need to be confirmed or cancelled by [host,intern,admin]
    status: {
      type: String,
      enum: [
        // 'awaiting admin',
        // 'pending' /** ="awaiting host" */,
        // 'accepted',
        // 'confirmed',
        // 'cancelled',
        // 'awaiting cancellation',
        // 'cancelled after payment',
        // 'completed',
        // 'rejected by admin',
        // 'rejected',
        ...Object.values(bookingStatuses),
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
    cancellationDetails: {
      automaticCancellation: {
        type: Boolean,
        default: false,
      },
      // user's ID who canceled the booking
      cancelledBy: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      cancellingUserMessage: {
        type: String,
      },
      cancellationReason: {
        type: String,
        enum: ['legitimate', 'illegitimate'],
      },
      responsibleParty: {
        type: String,
        enum: ['organisation', 'pressPad', 'intern', 'host'],
      },
      notes: {
        type: String,
      },
      refunds: {
        internRefund: {
          type: Number,
          default: 0,
        },
        hostRefund: {
          type: Number,
          default: 0,
        },
        organisationRefund: {
          type: Number,
          default: 0,
        },
        pressPadRefund: {
          type: Number,
          default: 0,
        },
      },
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
    // if the intern has an approved bursary application valid for booking
    approvedBursary: {
      type: Schema.Types.ObjectId,
      ref: 'bursaryApplications',
    },
  },
  {
    timestamps: true,
  },
);

const Booking = model('bookings', bookingSchema);

module.exports = Booking;
