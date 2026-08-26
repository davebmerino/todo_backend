const { StatusCodes } = require("http-status-codes");
const { matchedData } = require("express-validator");
const bcrypt = require("bcrypt");

const errorLogger = require("../../helpers/errorLogger.helper.js");
const getByEmailProvider = require("../../users/providers/getByEmail.provider.js");
const generateTokenProvider = require("./generateToken.provider.js");

async function loginProvider(req, res) {
  const validatedData = matchedData(req);

  try {
    //get the user
    const user = await getByEmailProvider(validatedData.email);

    //compare password
    const result = await bcrypt.compare(validatedData.password, user.password);

    if (!result) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please check credentials",
      });
    }

    const token = generateTokenProvider(user);

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
