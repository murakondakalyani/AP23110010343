const axios = require("axios");

const BASE_URL = "http://20.207.122.201/evaluation-service";

async function sendLog(logStack, severity, source, msg, authToken) {
  try {
    await axios.post(
      `${BASE_URL}/logs`,
      {
        stack,
        level,
        package: pkg,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  } catch (err) {
    console.error("Logging has failed");
  }
}

module.exports = sendLog;