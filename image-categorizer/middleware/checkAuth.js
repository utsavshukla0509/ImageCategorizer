const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    // console.log(decoded);
    req.userData = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Authentication has failed!" });
  }
};