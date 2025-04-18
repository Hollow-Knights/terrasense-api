import { Router } from "express";
import UsersController from "../controllers/usersController.js";

const routes = Router();

routes.get("/users/:id", UsersController.findUserById)
routes.put("/users/:id", UsersController.updateUserById)
routes.get("/users", UsersController.getAllUsers);
routes.get("/users/:id", UsersController.deleteUserByID)

export default routes;
