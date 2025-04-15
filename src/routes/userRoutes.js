import { Router } from "express";
import UsersController from "../controllers/usersController.js";

const routes = Router();

//todo: move to auth router
routes.post("/signup", UsersController.registerUser);
routes.post("/login", UsersController.loginUser);

//todo: add route to get user by id
//todo: add route to update user
//todo: add route to delete user
//todo: add route to get all users
routes.get("/users", UsersController.getAllUsers);

export default routes;
