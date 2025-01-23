const Joi = require('joi');

const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false });

    if (error) {
      // Collect all validation errors
      const errorMessages = error.details.map(detail => detail.message);
      return res.status(400).json({
        error: 'Validation failed',
        messages: errorMessages,
      });
    }
    next();
  };
};

module.exports = validate;

