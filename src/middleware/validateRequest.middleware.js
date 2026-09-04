const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

function validateRequest(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      data: errors.array(),
    });
  }

  next();
}

module.exports = validateRequest;
