const signupSchema = require('./signup');
const internshipSchema = require('./internship');
const internSettings = require('./internSettings');
const hostSettings = require('./hostSettings');
const internSignup = require('./internSignup');
const orgSignup = require('./orgSignup');
const internCompleteProfile = require('./internCompleteProfile');

const handleValidationError = args => {
  const { inner } = args;
  const newErrors = {};
  if (inner) {
    inner.forEach(({ path, message: errorMessage }) => {
      if (path.includes('.')) {
        const segments = path.split('.');
        const parent = segments[0];
        const childrenPath = segments[1];
        newErrors[path] = newErrors[path] || {};

        // eslint-disable-next-line prefer-object-spread
        newErrors[parent] = Object.assign({}, newErrors[parent], {
          [childrenPath]: errorMessage,
        });
      } else {
        newErrors[path] = errorMessage;
      }
    });
  } else {
    throw args;
  }
  return newErrors;
};

const validate = ({ schema, data }) => {
  try {
    const validData = schema.validateSync(data, {
      abortEarly: false,
    });
    return { data: validData };
  } catch (error) {
    return { errors: handleValidationError(error) };
  }
};

module.exports = {
  internshipSchema,
  signupSchema,
  validate,
  internSettings,
  hostSettings,
  internSignup,
  internCompleteProfile,
  orgSignup,
};
