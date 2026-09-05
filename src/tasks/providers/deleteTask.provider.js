const Task = require("../task.schema.js");
const { StatusCodes } = require("http-status-codes");
const { matchedData } = require("express-validator");

const errorLogger = require("../../helpers/errorLogger.helper.js");

async function deleteTaskProvider(req, res) {
  const validatedData = matchedData(req);

  try {
    const deletedTask = await Task.deleteOne({
      _id: validatedData["_id"],
      user: req.user.sub, // ownership check — without this, any user could delete any task by id
    });

    if (deletedTask.deletedCount === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ reason: "Task not found." });
    }

    return res.status(StatusCodes.OK).json(deletedTask);
  } catch (error) {
    errorLogger("Error while deleting the task: ", req, error);
    return res.status(StatusCodes.BAD_GATEWAY).json({
      reason: "Unable to process your request at the moment, please try later.",
    });
  }
}

module.exports = deleteTaskProvider;
