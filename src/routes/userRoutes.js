import { Router } from "express"
import UsersController from "../controllers/usersController.js"

const routes = Router()

routes.post("/register", UsersController.registerUser)
routes.get("/login", UsersController.loginUser)

export default routes