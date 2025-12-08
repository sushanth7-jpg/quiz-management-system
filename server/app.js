const express = require("express");
const cors = require("cors");
const path = require("path");

const quizRoutes = require("./routes/quizzes");
const adminRoutes = require("./routes/admin");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// API Routes
app.use("/api", adminRoutes);
app.use("/api", quizRoutes);

// ----------- IMPORTANT: Serve React UI in production --------------
const clientBuildPath = path.join(__dirname, "client/dist");
app.use(express.static(clientBuildPath));

// Express 5 catch-all for SPA
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

// Root
app.get("/", (req, res) => {
  res.json({ ok: true, message: "Quiz API running" });
});

module.exports = app;
