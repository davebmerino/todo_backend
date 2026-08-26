const mongoose = require("mongoose");
const { MONGO_URL, DB_NAME } = require("./env.js");

async function connectionDB() {
  try {
    const connectionString = MONGO_URL ? `${MONGO_URL}/${DB_NAME}` : MONGO_URL;

    await mongoose.connect(connectionString);
  } catch (error) {
    console.error("connection failed", error.message);
    throw error;
  }
}

module.exports = connectionDB;
