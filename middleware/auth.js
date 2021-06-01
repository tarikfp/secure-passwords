const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");
  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token,authorization denied" });
  }
  // Verify Token
  try {
    const decoded = jwt.decode(
      token,
      process.env.JWT_SECRET || config.get("jwtSecret")
    );
    const { id, name, surname, email } = decoded.user;
    let user = await User.findById(id);
    if (!user) {
      return res.status(500).json({
        errors: [
          {
            msg: "Server Error",
          },
        ],
      });
    }
    const userData = {
      id,
      name,
      surname,
      email,
    };
    req.user = userData;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
