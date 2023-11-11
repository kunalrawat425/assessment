import { Router } from "express";
import MoviesController from "./src/controllers/movie.controller";
import UserController from "./src/controllers/user.controller";
import config from "./config";
const authenticate = require('./src/middlewares/authenticate');
const passport = require("passport");
const passportJWT = require("passport-jwt");
const routes = Router();

routes.post("/login", UserController.login);
routes.post("/register", UserController.createUser);

let jwtOptions = { jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: config.secret };

let strategy = new passportJWT.Strategy(jwtOptions, async function (jwt_payload: any, next: any) {
    next(null, jwt_payload);
});
passport.use(strategy);

routes.use(authenticate);
routes.get("/movie", MoviesController.get);
routes.delete("/movie", MoviesController.delete);
routes.post("/movie", MoviesController.create);
routes.put("/movie", MoviesController.update);


export default routes;
