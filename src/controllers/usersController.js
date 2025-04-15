import users from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UsersController {
  static async registerUser(req, res) {
    try {
      const userBody = req.body;
      const hashPasswordPromise = bcrypt.hash(userBody.password, 10);

      const conflictUserPromise = users.findOne({
        email: userBody.email,
      });

      const [hashPassword, conflictUser] = await Promise.all([
        hashPasswordPromise,
        conflictUserPromise,
      ]);

      if (conflictUser) {
        return res.status(409).json({
          message: "Usuário já cadastrado",
          user: {
            name: conflictUser.name,
            email: conflictUser.email,
          },
        });
      }

      users.create({
        name: userBody.name,
        email: userBody.email,
        password: hashPassword,
      });

      return res.status(201).json({
        message: "Usuário criado com sucesso",
        "Novo Usuário": {
          name: userBody.name,
          email: userBody.email,
        },
      });
    } catch (error) {
      console.error("an error occured at /signup:", error);
      return res.status(500).json({
        message: "Erro ao criar usuário",
        error: error.message,
      });
    }
  }

  static async loginUser(req, res) {
    try {
      const userInfo = req.body;
      const userFound = await users.findOne({ email: userInfo.email });

      if (!userFound) {
        return res
          .status(401)
          .json({ message: "Nenhuma conta encontrada para essas credenciais" });
      }

      const isMatch = await bcrypt.compare(
        userInfo.password,
        userFound.password
      );

      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Nenhuma conta encontrada para essas credenciais" });
      }

      const token = jwt.sign(
        { id: userFound._id, name: userFound.name, email: userFound.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        message: "Login realizado com sucesso",
        token,
        user: {
          name: userFound.name,
          email: userFound.email,
        },
      });
    } catch (error) {
      console.error("an error occured at /login:", error);
      return res.status(500).json({
        message: "Erro ao fazer login",
        error: error.message,
      });
    }
  }
}

export default UsersController;
