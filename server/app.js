const express = require("express");
const cors = require("cors");
const path = require("path");

const quizRoutes = require("./routes/quizzes");
const adminRoutes = require("./routes/admin");

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api", adminRoutes);
app.use("/api", quizRoutes);

// Serve React build
const clientBuildPath = path.join(__dirname, "client/dist");
app.use(express.static(clientBuildPath));

// Express 5 catch-all (required!)
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

module.exports = app;
