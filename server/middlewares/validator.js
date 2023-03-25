const Joi = require("joi");

const validator = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) res.status(422).json({ error: error.details[0].message });
  else next();
};

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const createProductSchema = Joi.object({
  name: Joi.string().max(500).min(1).required(),
  description: Joi.string().max(500).min(1).required(),
  price: Joi.number().required(),
});
const updateProductSchema = Joi.object({
  name: Joi.string().max(500).min(1),
  description: Joi.string().max(500).min(1),
  price: Joi.number(),
}).min(1);

exports.validateRegister = validator(registerSchema);
exports.validateLogin = validator(loginSchema);
exports.validateCreateProduct = validator(createProductSchema);
exports.validateUpdateProduct = validator(updateProductSchema);
