const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");

const User = require("../user.schema.js");
const errorLogger = require("../../helpers/errorLogger.helper.js");
const getByEmailProvider = require("./getByEmail.provider.js");

async function createUserProvider(req, res) {
  // const user = new User({
  //   firstName: req.body.firstName,
  //   lastName: req.body.lastName,
  //   email: req.body.email,
  //   password: req.body.password,
  // });

  const validatedData = matchedData(req);

  const existingUser = await getByEmailProvider(validatedData.email);

  if (existingUser) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "A user this email alreadye exists" });
  }
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(validatedData.password, salt);

  try {
    const user = new User({
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      password: hashPassword,
    });

    await user.save();
    delete user.password;

    return res.status(StatusCodes.CREATED).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    errorLogger("There is an issue while creating new user", req, error);
    return res.status(StatusCodes.BAD_GATEWAY).json({
      reason: " having issu on creating user, please try again later",
    });
  }
}

module.exports = createUserProvider;
