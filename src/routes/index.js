import users from "./userRoutes.js";

const routes = (app) => {
  app.get("/", (req, res) => res.status(200).send("TerraSense API"));

  app.use(users);
};

export default routes;
