
module.exports = function (req:any, res:any, next:any) {
    req.body.userId = req.user.id;
    next();
  };