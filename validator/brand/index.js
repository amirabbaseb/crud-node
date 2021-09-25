const Joi = require("@hapi/joi");

exports.brandValidator = (brand) => {
  const schema = {
    name: Joi.string().required(),
  };

  return Joi.validate(brand, schema);
};
