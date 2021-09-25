const Joi = require("@hapi/joi");

exports.itemValidator = (item) => {
  const schema = {
    name: Joi.string().required(),
    brand_id: Joi.number().required(),
    color_id: Joi.number().required(),
  };

  return Joi.validate(item, schema);
};
