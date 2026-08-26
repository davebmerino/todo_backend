const loginProvider = require("./providers/login.provider.js");

async function handleLoginController(req, res) {
  return await loginProvider(req, res);
}

module.exports = { handleLoginController };
