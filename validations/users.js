import Joi from "joi";

export const SignUpValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });
  return schema.validate(data);
};

export const SignInValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });
  return schema.validate(data);
};

export const PostValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(255).required(),
    description: Joi.string().min(1).max(1024),
    tags: Joi.array(),
    selectedFile: Joi.string().required(),
  });
  return schema.validate(data);
};
