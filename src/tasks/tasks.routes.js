const express = require("express");

const taskController = require("./tasks.controller.js");

const createTaskValidator = require("./validators/createTask.validator.js");
const getTasksValidator = require("./validators/getTask.validator.js");
const deleteTaskValidator = require("./validators/deleteTask.validator.js");
const updateTaskValidator = require("./validators/updateTask.validator.js");
const authenticateToken = require("../middleware/authenticateToken.middleware.js");
const validateRequest = require("../middleware/validateRequest.middleware.js");

const taskRouter = express.Router();

taskRouter.use(authenticateToken);

//Get Task
taskRouter.get(
  "/fetch",
  getTasksValidator,
  validateRequest,
  taskController.handleFetchTask,
);

//Get Summary
taskRouter.get("/summary", taskController.handleGetSummary);

//Create task
taskRouter.post(
  "/create",
  createTaskValidator,
  validateRequest,
  taskController.handleCreateTask,
);

taskRouter.patch(
  "/update",
  updateTaskValidator,
  validateRequest,
  taskController.handleUpdateTask,
);

taskRouter.delete(
  "/delete",
  deleteTaskValidator,
  validateRequest,
  taskController.handleDeleteTask,
);

module.exports = taskRouter;
