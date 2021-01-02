import Joi from "joi";

export const SignUpValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    confirmPassword: Joi.string().required(),
  });
  return schema.validate(data);
};

export const SignInValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

export const PostValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(255).required(),
    description: Joi.string().min(1).max(1024).required(),
    tags: Joi.string().optional(),
    selectedFile: Joi.string().required(),
  });
  return schema.validate(data);
};
