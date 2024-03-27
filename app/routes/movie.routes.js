module.exports = (app) => {
  const movieController = require("../controllers/movie.controller");
  const auth = require("../middleawares/auth_jwt_middeaware");

  app.post(
    "/movies",
    [auth.verifyToken],
    movieController.create
  );
  app.get(
    "/movies",
    [auth.verifyToken],
    movieController.findAll
  );
  app.get(
    "/movies/:id",
    [auth.verifyToken],
    movieController.findById
  );
  app.put(
    "/movies/:id",
    [auth.verifyToken],
    movieController.update
  );
  app.delete(
    "/movies/:id",
    [auth.verifyToken],
    movieController.delete
  );
};
