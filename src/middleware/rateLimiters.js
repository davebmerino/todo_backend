const rateLimit = require("express-rate-limit");

//Log in Limit
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  // Maximum 10 failed requests per IP every 15 minutes
  limit: 10,

  standardHeaders: true,
  legacyHeaders: false,

  // Successful login/refresh requests are not counted
  skipSuccessfulRequests: true,

  message: {
    message: "Too many attempts. Please try again later.",
  },
});

//Rate limit
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  // Maximum 300 API requests per IP every 15 minutes
  limit: 300,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    message: "Too many requests. Please try again later.",
  },
});

//Register Limit

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many registration attempts. Please try again later.",
  },
});

const refreshLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many session refresh attempts. Please try again later.",
  },
});

module.exports = {
  authLimiter,
  apiLimiter,
  registerLimiter,
  refreshLimiter,
};
