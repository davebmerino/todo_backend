const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const { StatusCodes } = require("http-status-codes");

const responseFormatter = require("./middleware/responseFormatter.js");
const expressWinstonLogger = require("./middleware/expresswinston.middleware.js");
const taskRouter = require("./tasks/tasks.routes.js");
const userRouter = require("./users/user.routes.js");
const authRouter = require("./auth/auth.routes.js");

const app = express();

app.use(express.json());
app.use(cors({}));

//access.log file
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "..", "access.log"),
  { flags: "a" },
);

//Middleware app
app.use(morgan("combined", { stream: accessLogStream }));
app.use(responseFormatter);
app.use(expressWinstonLogger);

//Routes
app.use("/api/task", taskRouter);
app.use("/api/user", userRouter);
app.use("/api", authRouter);

//404 NOT FOUND
app.use((req, res) => {
  res.status(StatusCodes.BAD_REQUEST).json(null);
});

module.exports = app;
