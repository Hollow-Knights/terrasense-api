import users from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UsersDomain } from "../domain/usersDomain.js";

class UsersController {
  static async updateUserById(req, res) {
    try {
      const userFound = await users.findByIdAndUpdate(req.params.id, req.body
        if(!userFound) {
          res.status(401).json({ message: "Nenhuma conta encontrada com esse ID" })
        }
      )
      res.status(201).json({
        message: "Usuário atualizado com sucesso",
        "Dados atualizados:": userFound
      })
    } catch (error) {
      console.error("an error occured at /user:", error);
      return res.status(500).json({
        message: "Erro ao atualizar usuário",
        error: error.message,
      })
    }
  }

  static async findUserById(req, res) {
    try {
      const userFound = await users.findById(req.params.id)

      if(!userFound) {  
        res.status(401).json({ message: "Nenhuma conta encontrada com esse ID" });
      }
      res.status(200).json({
        message: "Usuário encontrado",
        "Dados do usuário": userFound
      })
    } catch (error) {
      console.error("an error occured at /user:", error);
      return res.status(500).json({
        message: "Erro ao procurar usuário",
        error: error.message,
      })
    }

  }

  static async registerUser(req, res) {
    try {
      const {name, email, password} = req.body;
      const user = {name, email}

      const hashPasswordPromise = bcrypt.hash(password, 10);

      const conflictUserPromise = UsersDomain.findUserByEmail(email);

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

      UsersDomain.createUser({
        name,
        email,
        password: hashPassword,
      });

      return res.status(201).json({
        message: "Usuário criado com sucesso",
        "Novo Usuário": {
          ...user,
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
        // eslint-disable-next-line no-undef
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
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

  static async getAllUsers(req, res) {
    try {
      return res.status(200).json({
        message: "Lista de usuários",
        users: await UsersDomain.findAllUsers(),
      });
    } catch (error) {
      console.error("an error occured at /users:", error);
      return res.status(500).json({
        message: "Erro ao listar usuários",
        error: error.message,
      });
    }
  }

  static async deleteUserByID(req, res) {
    try {
      await users.findByIdAndDelete(req.params.id)
      res.send(200).json({message: "Usuário removido com sucesso"})
    } catch (error) {
      console.error("an error occored at /users", error)
    }
  }

}

export default UsersController;
