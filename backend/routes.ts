import { Router } from "express";
const routes = Router();

import MoviesController from "./src/controllers/movie.controller";
import UserController from "./src/controllers/user.controller";


routes.get("/movie", MoviesController.get);
routes.delete("/movie", MoviesController.delete);
routes.post("/movie", MoviesController.create);
routes.put("/movie", MoviesController.update);

routes.post("/login", UserController.login);
routes.post("/register", UserController.createUser);
routes.post("/generateAccessToken", UserController.generateAccessToken);

export default routes;
