const Joi = require("@hapi/joi");

exports.userValidator = (user) => {
  const schema = {
    name: Joi.string().required(),
    family: Joi.string().required(),
    email: Joi.string().required().email(),
    phone: Joi.string().min(10).required(),
    address: Joi.string(),
    username: Joi.string(),
    password: Joi.string().required(),
    image: Joi.string(),
    permission_id: Joi.number(),
  };

  return Joi.validate(user, schema);
};
