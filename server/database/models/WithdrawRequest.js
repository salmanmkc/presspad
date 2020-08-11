const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const withdrawRequestSchema = new Schema(
  {
    // the user who made the request or the intern who will receive it
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    userType: {
      type: String,
      enum: ['host', 'intern'],
    },
    // the account that money will be withdrawn from only if host
    account: {
      type: Schema.Types.ObjectId,
      ref: 'accounts',
    },
    // money value
    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },
    bankName: {
      type: String,
      trim: true,
    },
    bankSortCode: {
      type: String,
      trim: true,
    },
    accountNumber: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'transfered', 'rejected', 'cancelled'],
    },
    reason: {
      type: String,
      default: 'N/A',
      enum: ['withdraw from wallet', 'refund', 'N/A'],
    },
    // the date when the money has transfered
    transfereDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const WithdrawRequest = model('withdrawRequests', withdrawRequestSchema);

module.exports = WithdrawRequest;
