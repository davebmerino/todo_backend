const User = require("../user.schema.js");

async function getByEmailProvider(email) {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (error) {
    error;
  }
}

module.exports = getByEmailProvider;
