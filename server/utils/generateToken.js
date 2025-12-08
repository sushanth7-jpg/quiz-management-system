const jwt = require("jsonwebtoken");

function generateAdminToken(payload = { admin: true }) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET not set");
  return jwt.sign(payload, secret, { expiresIn: "6h" });
}

module.exports = generateAdminToken;
