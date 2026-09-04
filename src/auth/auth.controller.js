const loginProvider = require("./providers/login.provider.js");
const logoutProvider = require("./providers/logout.provider.js");
const refreshTokenProvider = require("./providers/refreshToken.provider.js");

async function handleLoginController(req, res) {
  return await loginProvider(req, res);
}

async function handleRefreshTokenController(req, res) {
  return await refreshTokenProvider(req, res);
}

async function handleLogoutProvider(req, res) {
  return await logoutProvider(req, res);
}

module.exports = {
  handleLoginController,
  handleRefreshTokenController,
  handleLogoutProvider,
};
