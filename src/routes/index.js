import users from "./userRoutes.js";
import auth from "./authRoutes.js"

const routes = (app) => {
  app.get("/", (req, res) => res.status(200).send("TerraSense API"));

  app.use(users, auth);
};

export default routes;
