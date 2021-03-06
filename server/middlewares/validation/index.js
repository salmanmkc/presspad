const boom = require('boom');
const validation2 = require('./validation2');

const {
  HOST_COMPLETE_PROFILE,
  INTERN_COMPLETE_PROFILE,
  DONATION_URL,
  WITHDRAW_REQUEST_URL,
  HOST_UPDATE_AVAILABILITY,
} = require('../../../client/src/constants/apiRoutes');
const hostProfileSchema = require('./hostProfileSchema');
const internProfileSchema = require('./internProfileSchema');
const {
  withdrawSchema,
  donateSchema,
  updateAvailabilitySchema,
} = require('./hostDashboard');

// Schemas for each route
const schemas = {
  [HOST_COMPLETE_PROFILE]: hostProfileSchema,
  [INTERN_COMPLETE_PROFILE]: internProfileSchema,
  [DONATION_URL]: donateSchema,
  [WITHDRAW_REQUEST_URL]: withdrawSchema,
  [HOST_UPDATE_AVAILABILITY]: updateAvailabilitySchema,
};

// The supported methods for each route
const methods = {
  [HOST_COMPLETE_PROFILE]: ['POST'],
  [INTERN_COMPLETE_PROFILE]: ['POST'],
  [DONATION_URL]: ['POST'],
  [WITHDRAW_REQUEST_URL]: ['POST'],
  [HOST_UPDATE_AVAILABILITY]: ['PATCH'],
};

// Validate function
const validate = (schema, dataObj) =>
  schema.validateAsync(dataObj, {
    abortEarly: false,
    stripUnknown: true,
  });

// validation middleware
const validation = (req, res, next) => {
  const schema = schemas[req.path];
  const schemaSupportedMethods = methods[req.path];

  if (
    schema &&
    schemaSupportedMethods &&
    schemaSupportedMethods.includes(req.method)
  ) {
    validate(schema, req.body)
      .then(data => {
        // if everything is validate, change the body to the modified version of it
        req.body = data;
        next();
      })
      .catch(err => {
        next(boom.badData(err));
      });
  } else {
    next();
  }
};

module.exports = { validation, validate, validation2 };
