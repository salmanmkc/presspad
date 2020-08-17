// sign up controller
// respond with user info and create new token
const uniqid = require('uniqid');

const boom = require('boom');
const pubSub = require('../../pubSub');

// QUERIES
const {
  findByEmail,
  addNewUser,
  findByReferralToken,
} = require('../../database/queries/user');

// CONSTANTS
const { tokenMaxAge } = require('../../constants');

const createToken = require('../../helpers/createToken');

module.exports = async (req, res, next) => {
  const { email, name, password, role, organisation, referralToken } = req.body;
  let newReferralToken;
  let referredBy;
  try {
    // check if the email already exists
    const storedUser = await findByEmail(email);

    if (storedUser) {
      return next(boom.conflict('Email already taken'));
    }

    // MORE CHECKS REQUIRED FOR INTERN
    if (role === 'intern') {
      // add new user
      const user = await addNewUser({ email, name, password, role });
      const token = createToken(user._id);

      res.cookie('token', token, {
        maxAge: tokenMaxAge.number,
        httpOnly: true,
      });

      // data to be sent in the response
      const newUserInfo = {
        id: user._id,
        role: user.role,
        email: user.email,
        name: user.name,
      };

      pubSub.emit(pubSub.events.user.INTERN_SIGNUP, user);

      req.sqreen.signup_track({ email: user.email });
      return res.json(newUserInfo);
    }

    // FOR HOST AND ORGANISATION
    if (role === 'host') {
      newReferralToken = uniqid.time();
      if (referralToken) {
        referredBy = await findByReferralToken(referralToken);
      }
    }

    const user = await addNewUser({
      email,
      name,
      password,
      role,
      organisation,
      referralToken: newReferralToken,
      referredBy: (referredBy && referredBy._id) || null,
    });

    const token = createToken(user._id);

    res.cookie('token', token, {
      maxAge: tokenMaxAge.number,
      httpOnly: true,
    });

    const newUserInfo = {
      id: user._id,
      role: user.role,
      email: user.email,
      name: user.name,
      organisation: user.organisation && user.organisation._id,
    };

    if (role === 'host') {
      pubSub.emit(pubSub.events.user.HOST_SIGNUP, user);
    }
    if (role === 'organisation') {
      pubSub.emit(pubSub.events.user.ORGANISATION_SIGNUP, user);
    }

    // TODO move sqreen to pubSub folder
    req.sqreen.signup_track({ email: user.email });
    return res.json(newUserInfo);
  } catch (error) {
    next(boom.badImplementation(error));
  }
};
