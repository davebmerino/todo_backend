const loginProvider = require("./providers/login.provider.js");
const refreshTokenProvider = require("./providers/refreshToken.provider.js");

async function handleLoginController(req, res) {
  return await loginProvider(req, res);
}

async function handleRefreshTokenController(req, res) {
  return await refreshTokenProvider(req, res);
}

module.exports = { handleLoginController, handleRefreshTokenController };
