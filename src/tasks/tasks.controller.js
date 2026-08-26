const { StatusCodes } = require("http-status-codes");
const createTaskProvider = require("./providers/createTask.provider.js");
const getTaskProvider = require("./providers/getTask.provider.js");
const deleteTaskProvider = require("./providers/deleteTask.provider.js");
const updateTaskProvider = require("./providers/updateTask.provider.js");

async function handleFetchTask(req, res) {
  return await getTaskProvider(req, res);
}

async function handleCreateTask(req, res) {
  return await createTaskProvider(req, res);
}

async function handleUpdateTask(req, res) {
  return await updateTaskProvider(req, res);
}

async function handleDeleteTask(req, res) {
  return await deleteTaskProvider(req, res);
}

module.exports = {
  handleCreateTask,
  handleDeleteTask,
  handleFetchTask,
  handleUpdateTask,
};
