const jwt = require('jsonwebtoken');

module.exports = function(...roles){
  return (req, res, next) => {
    if(req.user.admin == true) var role = "admin";
      if (!roles.includes(role)) {
          return next(
             res.status(403).json({status_code : 403,success:false, msg: 'Not authorized' }))
      }
      next()
  }
};
