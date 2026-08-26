const express = require("express");
const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const userController = require("./user.controller.js");
const createUserValidator = require("./validators/createUser.validator.js");

const userRouter = express.Router();

//Routes
userRouter.post("/register", createUserValidator, (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return userController.handleCreateUser(req, res);
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

module.exports = userRouter;
