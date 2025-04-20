import { Router } from "express";
import AuthController from "../controllers/authController.js";
import userValidationMiddleware from "../middlewares/userValidationMiddleware.js";

const routes = Router();

routes.post("/signup", userValidationMiddleware, AuthController.registerUser);
routes.post("/login", AuthController.loginUser);

export default routes;
