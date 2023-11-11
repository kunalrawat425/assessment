
const passport = require("passport");

module.exports = (req:any, res:any, next:any) => {
    passport.authenticate('jwt', function(err:any, user:any) {
        if (err) return next(err);

        if (!user) return res.status(401).json({message: "Unauthorized Access - No Token Provided!"});

        req.user = user;
        next();

    })(req, res, next);
};