const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/auth");
const chat = require("./routes/chat");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", userRoutes);
app.use("/api/chat", chat);

module.exports = app;
