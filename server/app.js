const express = require("express");
const cors = require("cors");
const quizRoutes = require("./routes/quizzes");
const adminRoutes = require("./routes/admin");
const path = require("path");

const app = express();

// CORS (works for both localhost & production)
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

// Health check
app.get("/api/health", (req, res) =>
  res.json({ ok: true, message: "Quiz API running" })
);

// -----------------------------
// 🔥 Frontend Deployment for Render
// -----------------------------
if (process.env.NODE_ENV === "production") {
  const __dirnamePath = path.resolve();

  app.use(express.static(path.join(__dirnamePath, "client", "dist")));

  // SPA fallback
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirnamePath, "client", "dist", "index.html"));
  });
}

module.exports = app;
