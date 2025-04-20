import { Router } from "express";
import ValidateAuthToken from "../middlewares/AuthMiddleware.js";
import UsersController from "../controllers/usersController.js";
import userValidationMiddleware from "../middlewares/userValidationMiddleware.js";

const routes = Router();

routes.get("/users/:id", ValidateAuthToken, UsersController.findUserById);
routes.put(
  "/users",
  ValidateAuthToken,
  userValidationMiddleware,
  UsersController.updateUserById
);
routes.get("/users", ValidateAuthToken, UsersController.getAllUsers);
routes.delete("/users", ValidateAuthToken, UsersController.deleteUser);

export default routes;
