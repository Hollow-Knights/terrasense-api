import users from "./userRoutes.js";
import authUsers from "./authRoutes.js"

const routes = (app) => {
  app.get("/", (req, res) => res.status(200).send("TerraSense API"));

  app.use(users, authUsers);
};

export default routes;
