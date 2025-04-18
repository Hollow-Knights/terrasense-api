import { Router } from "express"
import AuthController from "../controllers/authController.js";

const routes = Router();

routes.post("/signup", AuthController.registerUser);
routes.post("/login", AuthController.loginUser);

export default routes