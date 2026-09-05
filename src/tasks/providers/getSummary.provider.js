const { StatusCodes } = require("http-status-codes");
const Task = require("../task.schema.js");
const errorLogger = require("../../helpers/errorLogger.helper.js");

const ACTIVE_STATUSES = ["todo", "inProgress"];

async function getTaskSummaryProvider(req, res) {
  try {
    const userId = req.user.sub;

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const startOfTomorrow = new Date(startOfToday);
    startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

    const startOfDayAfterTomorrow = new Date(startOfToday);
    startOfDayAfterTomorrow.setDate(startOfDayAfterTomorrow.getDate() + 2);

    const startOfNextSevenDays = new Date(startOfToday);
    startOfNextSevenDays.setDate(startOfNextSevenDays.getDate() + 7);

    // These are all independent of each other — run them concurrently
    // instead of awaiting one at a time, so the whole endpoint costs one
    // round trip's worth of latency, not seven.
    const [
      dueToday,
      dueTomorrow,
      dueNextSevenDays,
      completedCount,
      totalCount,
      recentTasks,
      upcomingDeadlines,
    ] = await Promise.all([
      Task.countDocuments({
        user: userId,
        status: { $in: ACTIVE_STATUSES },
        dueDate: { $gte: startOfToday, $lt: startOfTomorrow },
      }),
      Task.countDocuments({
        user: userId,
        status: { $in: ACTIVE_STATUSES },
        dueDate: { $gte: startOfTomorrow, $lt: startOfDayAfterTomorrow },
      }),
      Task.countDocuments({
        user: userId,
        status: { $in: ACTIVE_STATUSES },
        // Inclusive of today/tomorrow, matching how task apps usually treat
        // a "next 7 days" view — it's an overlapping window, not a separate
        // exclusive bucket.
        dueDate: { $gte: startOfToday, $lt: startOfNextSevenDays },
      }),
      Task.countDocuments({ user: userId, status: "done" }),
      Task.countDocuments({ user: userId }),
      Task.find({ user: userId }).sort({ updatedAt: -1 }).limit(5),
      Task.find({
        user: userId,
        status: { $in: ACTIVE_STATUSES },
        dueDate: { $gte: startOfToday },
      })
        .sort({ dueDate: 1 })
        .limit(5),
    ]);

    const completionRate =
      totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return res.status(StatusCodes.OK).json({
      data: {
        dueToday,
        dueTomorrow,
        dueNextSevenDays,
        completedCount,
        completionRate,
        recentTasks,
        upcomingDeadlines,
      },
    });
  } catch (error) {
    errorLogger("Error while fetching task summary: ", req, error);
    return res.status(StatusCodes.BAD_GATEWAY).json({
      reason: "Unable to process your request at the moment, please try later.",
    });
  }
}

module.exports = getTaskSummaryProvider;
