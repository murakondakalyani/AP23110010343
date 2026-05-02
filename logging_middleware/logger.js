const axios = require("axios");

const LOG_API = "http://20.207.122.201/evaluation-service/logs";

async function sendLog(logStack, severity, source, msg, authToken) {
  const payload = {
    stack: logStack,
    level: severity,
    package: source,
    message: `[${new Date().toISOString()}] ${msg}`
  };

  try {
    const response = await axios.post(LOG_API, payload, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error while sending logs:", error.message);
  }
}

module.exports = sendLog;