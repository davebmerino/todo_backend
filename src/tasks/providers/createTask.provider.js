const { StatusCodes } = require("http-status-codes");
const { matchedData } = require("express-validator");

const Task = require("../task.schema.js");
const errorLogger = require("../../helpers/errorLogger.helper.js");

async function createTaskProvider(req, res) {
  //Tranditional na pag sasave
  // const task = new Task({
  //   title: req.body.title,
  //   description: req.body.description,
  //   status: req.body.status,
  //   priority: req.body.priority,
  //   dueDate: req.body.dueDate,
  // });

  //
  const validatedResult = matchedData(req);

  try {
    const task = new Task({ ...validatedResult, user: req.user.sub });
    await task.save();
    return res.status(StatusCodes.CREATED).json(task);
  } catch (error) {
    errorLogger(`Error while creating task: ${error.message}`, req, error);
    return res.status(StatusCodes.BAD_GATEWAY).json({
      reason: "Unable to process your request at the moment, please try later.",
    });
  }
}

module.exports = createTaskProvider;
