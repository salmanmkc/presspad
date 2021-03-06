const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    sparse: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  // this is for interns and organisation users
  // we need to store the id that's linked to an org
  organisation: {
    type: Schema.Types.ObjectId,
    ref: 'organisations',
  },

  role: {
    type: String,
    enum: ['admin', 'organisation', 'host', 'intern'],
    required: true,
  },

  account: {
    type: Schema.Types.ObjectId,
    ref: 'accounts',
    required: true,
  },

  // for hosts
  acceptAutomatically: {
    type: Boolean,
  },

  // for hosts - the total time taken to response to the requests (in milliseconds)
  respondingTime: {
    type: Number,
  },

  // for hosts - the total requests that been respond to
  respondedRequests: {
    type: Number,
  },
  deleted: Boolean,
  deleteReason: String,

  referralToken: {
    type: String,
    maxlength: 8,
    sparse: true,
  },

  referredBy: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },

  // for reset password
  resetToken: {
    value: String,
    expiresIn: Date,
  },
});

userSchema.pre('save', async function hashPassword() {
  if (this.isNew || this.isModified('password')) {
    const document = this;
    try {
      const hashedPassword = await bcrypt.hash(document.password, 8);
      document.password = hashedPassword;
    } catch (err) {
      throw new Error('Something bad happened');
    }
  } else {
    throw new Error('Invalid data');
  }
});

// check password method
userSchema.methods.isCorrectPassword = function isCorrectPassword(password) {
  return bcrypt.compare(password, this.password);
};

const User = model('users', userSchema);

module.exports = User;
