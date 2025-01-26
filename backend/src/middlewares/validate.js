const Joi = require('joi');

const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false });

    if (error) {
      // Mapping of Joi's default error messages to custom messages
      const errorMessages = error.details.map((detail) => {
        switch (detail.context.key) {
          case 'title':
            return 'Title is a required field';
          case 'description':
            return 'Description is a required field';
          case 'price':
            return 'Price is a required field and should be a number';
          case 'rooms':
            return 'Rooms is a required field and should be 1, 2, or 3';
          default:
            return detail.message;
        }
      });

      return res.status(400).json({
        error: 'Validation failed',
        messages: errorMessages,
      });
    }

    next();
  };
};

module.exports = validate;