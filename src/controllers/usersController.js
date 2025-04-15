import users from "../models/Users.js"
import bcrypt from "bcrypt"

class UsersController { 

  static async registerUser(req, res, next) {
    try {
      const userBody = req.body
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(userBody.password, salt);
  
      await users.create({
        name: userBody.name,
        email: userBody.email,
        password: hashPassword
      })
      res.status(201).json({
        message: "Usuário criado com sucesso",
        "Novo Usuário": {
          name: userBody.name,
          email: userBody.email,
          phone: userBody.phone,
        },
      })
    
    } catch (error) {
      res.status(404).send(error)
    }
  }
}

export default UsersController