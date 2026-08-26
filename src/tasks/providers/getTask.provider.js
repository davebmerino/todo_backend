const Task = require("../task.schema.js");

const { StatusCodes } = require("http-status-codes");
const { matchedData } = require("express-validator");
const errorLogger = require("../../helpers/errorLogger.helper.js");

async function getTaskProvider(req, res) {
  const data = matchedData(req);

  try {
    //Base URL
    const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl.split("?")[0]}`;

    const totalTask = await Task.countDocuments();
    const currentPage = parseInt(data.page);
    const limit = data.limit;
    const order = data.order;
    const totalPages = Math.ceil(totalTask / limit);
    const nextPage = currentPage === totalPages ? currentPage : currentPage + 1;
    const PreviuosPage = currentPage === 1 ? currentPage : currentPage - 1;

    const task = await Task.find({
      status: { $in: ["todo", "inProgress"] }, // condition of fiding task
    })
      .limit(limit)
      .skip(currentPage - 1)
      .sort({
        createdAt: order === "asc" ? 1 : -1,
      });

    let finalResponse = {
      data: task,
      pagination: {
        meta: {
          itemsPerPage: limit,
          totalItem: totalTask,
          currentPage: currentPage,
          totalPage: totalPages,
        },
        links: {
          first: `${baseUrl}?limit=${limit}&page=${1}&order=${order}`,
          last: `${baseUrl}?limit=${limit}&page=${totalPages}&order=${order}`,
          currentPage: `${baseUrl}?limit=${limit}&page=${currentPage}&order=${order}`,
          nextPage: `${baseUrl}?limit=${limit}&page=${nextPage}&order=${order}`,
          PreviuosPage: `${baseUrl}?limit=${limit}&page=${PreviuosPage}&order=${order}`,
        },
      },
    };
    return res.status(StatusCodes.OK).json(finalResponse);
  } catch (error) {
    errorLogger("Error while fetching", req, res);
    return res.status(StatusCodes.BAD_GATEWAY).json({
      reason: "Gate way timeout please try again later",
    });
  }
}

module.exports = getTaskProvider;
