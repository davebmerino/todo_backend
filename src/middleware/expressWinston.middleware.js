const exppressWinston = require("express-winston");
const logger = require("../helpers/winston.helper.js");

const expressWinstonLogger = exppressWinston.logger({
  winstonInstance: logger,
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}} response with {{res.statusCode}} {{res.responseTime}}",
  expressFormat: true,
  colorize: true,
});

module.exports = expressWinstonLogger;
