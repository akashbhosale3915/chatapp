const jwt = require("jsonwebtoken");
function generateJWTAndSetCookie(payload, res) {
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "strict",
  });
}

module.exports = { generateJWTAndSetCookie };
