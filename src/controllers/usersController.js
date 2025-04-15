import users from "../models/Users.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

class UsersController { 

  static async registerUser(req, res) {
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
        },
      })
    
    } catch (error) {
      res.status(404).send(error)
    }
  }

  static async loginUser(req, res) {
    try {

      const userInfo = req.body
      const userFind = await users.findOne({email: userInfo.email})

      if(!userFind) {
        return res.status(404).json({ message:"Usuário não encontrado" })
      }

      const isMatch = await bcrypt.compare(userInfo.password, userFind.password)
      
      if(!isMatch) {
        return res.status(400).json({ message: "Senha inválida"})
      } 

      // eslint-disable-next-line no-undef
      const token = jwt.sign({id: userFind.id}, process.env.JWT_SECRET_KEY, {expiresIn: "7d"})

      res.status(200).json(token)

    } catch (error) {
      res.status(404).send(error)
    }
  }
}

export default UsersController