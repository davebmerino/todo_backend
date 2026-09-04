const { StatusCodes } = require("http-status-codes");

const RefreshToken = require("../refreshToken.schema.js");
const hashToken = require("../../helpers/hashToken.helper.js");

const {
  clearRefreshTokenCookie,
} = require("../services/refreshToken.service.js");

async function logoutProvider(req, res) {
  const refreshToken = req.cookies?.refreshToken;

  try {
    if (refreshToken) {
      await RefreshToken.deleteOne({
        tokenHash: hashToken(refreshToken),
      });
    }

    clearRefreshTokenCookie(res);

    return res.status(StatusCodes.OK).json({
      message: "Logged out successfully.",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Unable to log out.",
    });
  }
}

module.exports = logoutProvider;
