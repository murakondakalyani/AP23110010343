const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const BASE_URL = "http://20.207.122.201/evaluation-service";

const sendLog = require("../logging_middleware/logger");

const priorityMap = {
  Placement: 3,
  Event: 2,
  Result: 1
};

function prioritizeNotifications(data, limit = 10) {
  return data
    .sort((a, b) => {
      const typeDiff =
        (priorityMap[b.Type] || 0) - (priorityMap[a.Type] || 0);

      if (typeDiff !== 0) return typeDiff;

      return new Date(b.Timestamp) - new Date(a.Timestamp);
    })
    .slice(0, limit);
}

app.get("/api/notifications", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/notifications`, {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    const allData = response.data.notifications;

    await sendLog(
      "backend",
      "info",
      "handler",
      "Fetched notifications successfully",
      process.env.ACCESS_TOKEN
    );

    const result = prioritizeNotifications(allData, 10);

    res.json({
      count: result.length,
      data: result
    });

  } catch (error) {
    await sendLog(
      "backend",
      "error",
      "handler",
      "Failed to fetch notifications",
      process.env.ACCESS_TOKEN
    );

    res.status(500).json({
      error: "Server error"
    });
  }
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});

