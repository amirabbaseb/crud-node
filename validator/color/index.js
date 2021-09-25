const Joi = require("@hapi/joi");

exports.colorValidator = (color) => {
  const schema = {
    name: Joi.string().required(),
    hex_code: Joi.string().required(),
  };

  return Joi.validate(color, schema);
};
