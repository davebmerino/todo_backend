const Task = require("../task.schema.js");
const errorLogger = require("../../helpers/errorLogger.helper.js");

const { StatusCodes } = require("http-status-codes");
const { matchedData } = require("express-validator");

async function getTaskProvider(req, res) {
  const data = matchedData(req);

  try {
    const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl.split("?")[0]}`;

    const currentPage = parseInt(data.page);
    const limit = parseInt(data.limit);
    const order = data.order;

    // Scope every query to the authenticated user — never trust a user id
    // from the client. Adjust `req.user.id` below if your authenticateToken
    // middleware attaches it under a different property.
    const filter = { user: req.user.id };
    if (data.status) filter.status = data.status;
    if (data.priority) filter.priority = data.priority;
    if (data.search) filter.title = { $regex: data.search, $options: "i" };

    // Count against the SAME filter as the query below — this was the bug:
    // countDocuments() had no filter while find() did, so the two disagreed.
    const totalTask = await Task.countDocuments(filter);
    const totalPages = Math.max(Math.ceil(totalTask / limit), 1);
    const nextPage = currentPage >= totalPages ? currentPage : currentPage + 1;
    const previousPage = currentPage <= 1 ? currentPage : currentPage - 1;

    const task = await Task.find(filter)
      .limit(limit)
      .skip((currentPage - 1) * limit) // was `.skip(currentPage - 1)` — skipped documents, not pages
      .sort({ createdAt: order === "asc" ? 1 : -1 });

    return res.status(StatusCodes.OK).json({
      data: task,
      pagination: {
        meta: {
          itemsPerPage: limit,
          totalItem: totalTask,
          currentPage,
          totalPage: totalPages,
        },
        links: {
          first: `${baseUrl}?limit=${limit}&page=1&order=${order}`,
          last: `${baseUrl}?limit=${limit}&page=${totalPages}&order=${order}`,
          currentPage: `${baseUrl}?limit=${limit}&page=${currentPage}&order=${order}`,
          nextPage: `${baseUrl}?limit=${limit}&page=${nextPage}&order=${order}`,
          previousPage: `${baseUrl}?limit=${limit}&page=${previousPage}&order=${order}`,
        },
      },
    });
  } catch (error) {
    errorLogger("Error while fetching", req, res);
    return res.status(StatusCodes.BAD_GATEWAY).json({
      reason: "Gateway timeout, please try again later",
    });
  }
}

module.exports = getTaskProvider;
