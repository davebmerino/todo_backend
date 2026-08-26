const { matchedData } = require("express-validator");
const Task = require("../task.schema.js");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");

async function updateTaskProvider(req, res) {
  const validatedResult = matchedData(req);

  //
  //const task = await Task.findById(req.body["_id"]);
  // traditional na pag update
  // task.title = req.body.title;
  // task.description = req.body.description;
  // task.status = req.body.status;
  // task.priority = req.body.priority;
  // task.dueDate = req.body.dueDate;
  // return await task.save();

  //
  try {
    const task = await Task.findById(req.body["_id"]);

    task.title = validatedResult.title || task.title;
    task.description = validatedResult.description || task.description;
    task.status = validatedResult.status || task.status;
    task.priority = validatedResult.priority || task.priority;
    task.dueDate = validatedResult.dueDate || task.dueDate;

    await task.save();

    return res.status(StatusCodes.OK).json(task);
  } catch (error) {
    errorLogger("Error while updating task: ", req, error);
    return res.status(StatusCodes.BAD_GATEWAY).json({
      reason: "Unable to process your request at the moment, please try later.",
    });
  }
}

module.exports = updateTaskProvider;
