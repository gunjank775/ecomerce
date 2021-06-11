const jwt = require("jsonwebtoken");

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    try{
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
        }
        catch(ex) {
            res.status(400).send('Invalid token');
        }

    
  }
  else {
  return res.status(400).json({ message: "Authorization required" });
  }
  
  // jwt.decode()
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({ message: "Access Denied" });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({ message: "Access Denied" });
  }
  next();
};
