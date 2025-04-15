import { Router } from "express"
import UsersController from "../controllers/usersController.js"

const routes = Router()

routes.post("/login", UsersController.registerUser)

export default routes