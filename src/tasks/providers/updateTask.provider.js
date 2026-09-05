const { matchedData } = require("express-validator");
const Task = require("../task.schema.js");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");

async function updateTaskProvider(req, res) {
  const validatedResult = matchedData(req);

  try {
    const task = await Task.findOne({
      _id: validatedResult._id,
      user: req.user.sub, // ownership check — without this, any user could edit any task by id
    });

    if (!task) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ reason: "Task not found." });
    }

    // "??" instead of "||"— an intentionally-cleared falsy value (like an
    // empty string) shouldn't silently fall back to the old value; only
    // an actually-omitted (undefined) field should.

    task.title = validatedResult.title ?? task.title;
    task.description = validatedResult.description ?? task.description;
    task.status = validatedResult.status ?? task.status;
    task.priority = validatedResult.priority ?? task.priority;
    task.dueDate = validatedResult.dueDate ?? task.dueDate;

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
