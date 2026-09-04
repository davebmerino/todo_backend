const express = require("express");
const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const authController = require("./auth.controller.js");
const loginValidator = require("./validators/login.validator.js");
const validateRequest = require("../middleware/validateRequest.middleware.js");
const {
  authLimiter,
  refreshLimiter,
} = require("../middleware/rateLimiters.js");

const authRouter = express.Router();

authRouter.post(
  "/login",
  loginValidator,
  authLimiter,
  validateRequest,
  authController.handleLoginController,
);

authRouter.post(
  "/refresh",
  refreshLimiter,
  authController.handleRefreshTokenController,
);

module.exports = authRouter;
