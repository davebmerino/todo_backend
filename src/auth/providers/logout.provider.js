const { StatusCodes } = require("http-status-codes");

const RefreshToken = require("../refreshToken.schema.js");
const hashToken = require("../../helpers/hashToken.helper.js");

const {
  clearRefreshTokenCookie,
} = require("../services/refreshToken.service.js");

async function logoutProvider(req, res) {
  const incomingToken = req.cookies?.refreshToken;

  if (incomingToken) {
    try {
      const tokenHash = hashToken(incomingToken);
      // Deletes only THIS session's token — not every session the user has
      // open elsewhere. See note below if you want a "log out everywhere" too.
      await RefreshToken.deleteOne({ tokenHash });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Unable to log out.",
      });
    }
  }
  clearRefreshTokenCookie(res);

  return res.status(StatusCodes.NO_CONTENT).end();
}

module.exports = logoutProvider;
