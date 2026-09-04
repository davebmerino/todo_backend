const { StatusCodes } = require("http-status-codes");

const User = require("../../users/user.schema.js");
const RefreshToken = require("../refreshToken.schema.js");

const hashToken = require("../../helpers/hashToken.helper.js");
const generateTokenProvider = require("../../auth/providers/generateToken.provider.js");

const {
  issueRefreshToken,
  clearRefreshTokenCookie,
} = require("../services/refreshToken.service.js");

async function refreshTokenProvider(req, res) {
  const incomingToken = req.cookies?.refreshToken;

  if (!incomingToken) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "No refresh token provided.",
    });
  }

  try {
    const tokenHash = hashToken(incomingToken);

    const storedToken = await RefreshToken.findOne({
      tokenHash,
    });

    if (!storedToken || storedToken.expiresAt <= new Date()) {
      if (storedToken) {
        await RefreshToken.deleteOne({
          _id: storedToken._id,
        });
      }

      clearRefreshTokenCookie(res);

      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Session expired. Please log in again.",
      });
    }

    const user = await User.findById(storedToken.user).select("-password");

    if (!user) {
      await RefreshToken.deleteOne({
        _id: storedToken._id,
      });

      clearRefreshTokenCookie(res);

      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Session expired. Please log in again.",
      });
    }

    // Delete the old token before issuing a replacement.
    await RefreshToken.deleteOne({
      _id: storedToken._id,
    });

    await issueRefreshToken(res, user._id);

    const accessToken = generateTokenProvider(user);

    return res.status(StatusCodes.OK).json({
      message: "Access token refreshed successfully.",
      data: {
        accessToken,
        user,
      },
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Unable to refresh the session.",
    });
  }
}

module.exports = refreshTokenProvider;
