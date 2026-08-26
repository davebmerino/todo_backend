const { PORT } = require("./config/env.js");
const connectionDB = require("./config/db.js");
const app = require("./app.js");

async function start() {
  await connectionDB();

  const server = app.listen(PORT, () => {
    console.log(`Port is running on PORT: ${PORT}`);
  });

  process.on("SIGTERM", () => {
    server.close(() => process.exit(0));
  });

  process.on("SIGINT", () => {
    server.close(() => process.exit(0));
  });
}

start();
