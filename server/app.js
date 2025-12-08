const express = require("express");
const cors = require("cors");
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

app.use("/api", adminRoutes);
app.use("/api", quizRoutes);

app.get("/", (req, res) => res.json({ ok: true, message: "Quiz API running" }));

module.exports = app;
