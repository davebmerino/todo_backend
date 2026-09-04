const { StatusCodes } = require("http-status-codes");
const { matchedData } = require("express-validator");
const bcrypt = require("bcrypt");

const errorLogger = require("../../helpers/errorLogger.helper.js");
const getByEmailProvider = require("../../users/providers/getByEmail.provider.js");
const generateTokenProvider = require("./generateToken.provider.js");
const { issueRefreshToken } = require("../services/refreshToken.service.js");

async function loginProvider(req, res) {
  const validatedData = matchedData(req);

  try {
    //get the user
    const user = await getByEmailProvider(validatedData.email);
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Please check your credentials.",
      });
    }

    //compare password
    const result = await bcrypt.compare(validatedData.password, user.password);
    if (!result) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Please check credentials",
      });
    }

    const token = generateTokenProvider(user);

    // Creates the refresh token and adds it to an HTTP-only cookie.
    await issueRefreshToken(res, user._id);

    res.status(StatusCodes.OK).json({
      accessToken: token,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    errorLogger("Error while Log in", req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at the moment, please try later.",
    });
  }
}

module.exports = loginProvider;
