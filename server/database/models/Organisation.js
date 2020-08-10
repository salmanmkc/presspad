const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const organisationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    accountDetails: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    contactDetails: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    internshipOpportunities: [
      {
        opportunity: {
          type: String,
          required: true,
        },
        link: {
          type: String,
          required: true,
        },
        details: {
          type: String,
          required: true,
        },
      },
    ],
    account: {
      type: mongoose.Types.ObjectId,
      ref: 'accounts',
      required: true,
    },
    logo: {
      fileName: String,
      isPrivate: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  },
);

const Organisation = model('organisations', organisationSchema);

module.exports = Organisation;
