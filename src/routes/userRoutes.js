import { Router } from "express";
import UsersController from "../controllers/usersController.js";

const routes = Router();

routes.post("/signup", UsersController.registerUser);
routes.post("/login", UsersController.loginUser);

export default routes;
