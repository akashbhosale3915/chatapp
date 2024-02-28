const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

async function authMiddleware(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (!payload) {
      return res
        .status(401)
        .json({ error: "Unauthorized" });
    }

    const user = await User.findById(payload._id);

    if (!user) {
      return res
        .status(401)
        .json({ error: "Unauthorized" });
    }

    req.userId = payload._id;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = { authMiddleware };
