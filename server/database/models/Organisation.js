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
    },
    accountDetails: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      phone: {
        type: String,
      },
      email: {
        type: String,
      },
    },
    contactDetails: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      phone: {
        type: String,
      },
      email: {
        type: String,
      },
    },
    internshipOpportunities: [
      {
        opportunity: {
          type: String,
        },
        link: {
          type: String,
        },
        details: {
          type: String,
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
