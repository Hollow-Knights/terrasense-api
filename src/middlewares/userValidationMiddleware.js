import userSchema from "../models/validationSchemas/userSchema.js";

const userValidationMiddleware = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ errors: errorMessages });
  }

  next();
};

export default userValidationMiddleware;
