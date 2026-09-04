const express = require("express");
const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const userController = require("./user.controller.js");
const createUserValidator = require("./validators/createUser.validator.js");
const validateRequest = require("../middleware/validateRequest.middleware.js");
const { registerLimiter } = require("../middleware/rateLimiters.js");

const userRouter = express.Router();

//Routes
userRouter.post(
  "/register",
  registerLimiter,
  createUserValidator,
  validateRequest,
  userController.handleCreateUser,
);

module.exports = userRouter;
