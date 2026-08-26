const express = require("express");
const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const taskController = require("./tasks.controller.js");

const createTaskValidator = require("./validators/createTask.validator.js");
const getTasksValidator = require("./validators/getTask.validator.js");
const deleteTaskValidator = require("./validators/deleteTask.validator.js");
const updateTaskValidator = require("./validators/updateTask.validator.js");
const authenticateToken = require("../middleware/authenticateToken.middleware.js");

const taskRouter = express.Router();

//Get Task
taskRouter.get("/fetch", [getTasksValidator, authenticateToken], (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return taskController.handleFetchTask(req, res);
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

//Create task
taskRouter.post(
  "/create",
  [createTaskValidator, authenticateToken],
  (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return taskController.handleCreateTask(req, res);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
  },
);

taskRouter.patch(
  "/update",
  [updateTaskValidator, authenticateToken],
  (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return taskController.handleUpdateTask(req, res);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
  },
);
taskRouter.delete(
  "/delete",
  [deleteTaskValidator, authenticateToken],
  (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return taskController.handleDeleteTask(req, res);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
  },
);

module.exports = taskRouter;
