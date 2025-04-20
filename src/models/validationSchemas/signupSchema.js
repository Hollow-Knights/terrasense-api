import Joi from "joi"

const signupSchema = Joi.object({
  name: Joi.string().required().min(3).max(50),
  email: Joi.string().required().email().max(50),
  password: Joi.string().min(8).required().max(50)
})

export default signupSchema