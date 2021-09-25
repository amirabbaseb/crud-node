const Joi = require("@hapi/joi");

exports.permissionValidator = (permission) => {
  const schema = {
    name: Joi.string().required(),
  };

  return Joi.validate(permission, schema);
};
