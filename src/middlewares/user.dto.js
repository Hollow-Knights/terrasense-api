const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false })

import signupSchema from "../models/validationSchemas/signupSchema.js"

// eslint-disable-next-line no-undef
exports.validateSignup = validator(signupSchema)