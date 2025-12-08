require("dotenv").config();
const express = require("express"); // <-- You forgot this!
const path = require("path");
const connectDB = require("./config/db");
const app = require("./app");

const PORT = process.env.PORT || 5000;

// ------- SERVE CLIENT BUILD IN PRODUCTION -------
if (process.env.NODE_ENV === "production") {
  const clientPath = path.join(__dirname, "client", "dist"); // <-- FIXED PATH
  app.use(express.static(clientPath));

  // Express 5-safe catch-all:
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
}
// -------------------------------------------------

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to start server", err);
    process.exit(1);
  });
