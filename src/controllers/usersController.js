import users from "../models/Users.js";
import { UsersDomain } from "../domain/usersDomain.js";

class UsersController {
  static async updateUserById(req, res) {
    try {
      await users.findByIdAndUpdate(req.user.id, req.body);
      res.status(201).json({ message: "Usuário atualizado com sucesso" });
    } catch (error) {
      console.error("an error occured at /user:", error);
      return res.status(500).json({
        message: "Erro ao atualizar usuário",
        error: error.message,
      });
    }
  }

  static async findUserById(req, res) {
    try {
      const userFound = await users.findById(req.params.id);

      if (!userFound) {
        res
          .status(401)
          .json({ message: "Nenhuma conta encontrada com esse ID" });
      }
      res.status(200).json({
        message: "Usuário encontrado",
        "Dados do usuário": userFound,
      });
    } catch (error) {
      console.error("an error occured at /user:", error);

      if (error.name === "CastError") {
        return res.status(400).json({
          message: "ID inválido",
        });
      }

      return res.status(500).json({
        message: "Erro ao procurar usuário",
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

  static async deleteUser(req, res) {
    try {
      const userFound = await users.findById(req.user.id);
      if (!userFound) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      users.findByIdAndDelete(req.user.id);
      res.json(200).json({ message: "Usuário removido com sucesso" });
    } catch (error) {
      console.error("an error occored at /users", error);
    }
  }
}

export default UsersController;
