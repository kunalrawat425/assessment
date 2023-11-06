import  { Router } from "express";
import MoviesController from "./src/controllers/movie.controller";
import UserController from "./src/controllers/user.controller";
import config from "./config";
const routes = Router();
const passport = require("passport");
const passportJWT = require("passport-jwt");
const userId = require("../middlewares/userId");

routes.post("/login", UserController.login);
routes.post("/register", UserController.createUser);
routes.post("/generateAccessToken", UserController.generateAccessToken);


let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),secretOrKey:config.secret};


let strategy = new JwtStrategy(jwtOptions, async function (jwt_payload:any, next:any) {
    console.log(jwt_payload.id)
    next(null, jwt_payload);
    // await getUser({ id: jwt_payload.id }).then((data) => {
    //     if (data) {
    //         routes.use(userId);
    
    //       next(null, data);
    //     } else {
    //       next(null, false);
    //     }
    //   });
});
passport.use(strategy);
routes.use(passport.authenticate("jwt", { session: false }));
routes.use(userId);


routes.get("/movie", MoviesController.get);
routes.delete("/movie", MoviesController.delete);
routes.post("/movie", MoviesController.create);
routes.put("/movie", MoviesController.update);



export default routes;
