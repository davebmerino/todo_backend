const express = require("express");
const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const loginController = require("./auth.controller.js");
const loginValidator = require("./validators/login.validator.js");

const authRouter = express.Router();

authRouter.post("/login", loginValidator, (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty) {
    return loginController.handleLoginController(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

module.exports = authRouter;
