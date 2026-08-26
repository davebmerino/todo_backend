const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: "you are not authorize to perform this request",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      res.status(StatusCodes.FORBIDDEN).json({
        message: "Invalid request",
      });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
