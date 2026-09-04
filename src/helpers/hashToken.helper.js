const crypto = require("node:crypto");

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

module.exports = hashToken;
