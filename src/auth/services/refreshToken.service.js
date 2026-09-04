const crypto = require("node:crypto");

const RefreshToken = require("../refreshToken.schema.js");
const hashToken = require("../../helpers/hashToken.helper.js");

const REFRESH_TOKEN_TTL = 30 * 24 * 60 * 60 * 1000;

async function issueRefreshToken(res, userId) {
  const refreshToken = crypto.randomBytes(64).toString("hex");

  const tokenHash = hashToken(refreshToken);

  const storedToken = await RefreshToken.create({
    user: userId,
    tokenHash,
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/api/auth",
    maxAge: REFRESH_TOKEN_TTL,
  });

  return storedToken;
}

function clearRefreshTokenCookie(res) {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/api/auth",
  });
}

module.exports = {
  issueRefreshToken,
  clearRefreshTokenCookie,
  REFRESH_TOKEN_TTL,
};
