const generateAdminToken = require("../utils/generateToken");

async function adminLogin(req, res) {
  const { password } = req.body;
  if (!password) return res.status(400).json({ message: "Password required" });

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateAdminToken({ admin: true });
  res.json({ token });
}

module.exports = { adminLogin };
