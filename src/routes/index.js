const { Router } = require("express");

const authMiddleware = require("./middleware/auth");

const SessionController = require("../controllers/SessionController");

const routes = Router();

routes.post("/sessions", SessionController.store);

routes.use(authMiddleware);

routes.get("/dashboard", (request, response) => {
  return response.status(200).send();
});

module.exports = routes;
