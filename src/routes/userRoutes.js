import { Router } from "express";
import UsersController from "../controllers/usersController.js";

const routes = Router();

//TODO: move to auth router
routes.post("/signup", UsersController.registerUser);
routes.post("/login", UsersController.loginUser);

//TODO: add route to get user by id
//TODO: add route to update user
//TODO: add route to delete user
//TODO: add route to get all users
routes.get("/users", UsersController.getAllUsers);

export default routes;
