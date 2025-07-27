import Joi from "joi";

const loginSchema = Joi.object().keys({
  username: Joi.alternatives().conditional(Joi.string().email(), {
    then: Joi.string().email().required().messages({
      "any.required": "username is required",
      "string.base": "email must be a string",
      "string.empty": "email cannot be empty",
      "string.email": "email must be a valid email address",
    }),
    otherwise: Joi.string().required().messages({
      "any.required": "username is required",
      "string.base": "username must be a string",
      "string.empty": "username cannot be empty",
    }),
  }),
  password: Joi.string().required().messages({
    "string.base": "password must be a string",
    "string.empty": "password cannot be empty",
    "any.required": "password is required",
  }),
});

export { loginSchema };
