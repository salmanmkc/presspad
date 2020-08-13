const mongoose = require('mongoose');

const { bursaryWindowStatuses } = require('../constants');

const { Schema, model } = mongoose;

const bursaryWindowSchema = new Schema(
  {
    status: {
      type: String,
      enum: [
        // 'active',
        // 'in-active',,
        ...Object.values(bursaryWindowStatuses),
      ],
      default: bursaryWindowStatuses.active,
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
  },
  {
    timestamps: true,
  },
);

const BursaryWindow = model('bursaryWindows', bursaryWindowSchema);

module.exports = BursaryWindow;
