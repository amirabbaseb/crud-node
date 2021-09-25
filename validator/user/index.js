const Joi = require("@hapi/joi");

exports.userValidator = (user) => {
  const schema = {
    name: Joi.string().required(),
    family: Joi.string().required(),
    email: Joi.string().required().email(),
    phone: Joi.string().min(10).required(),
    username: Joi.number().required(),
    password: Joi.string().required(),
    image: Joi.number(),
    permission: Joi.string(),
  };

  return Joi.validate(user, schema);
};
