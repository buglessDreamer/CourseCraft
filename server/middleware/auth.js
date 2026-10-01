const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;

function authMiddleware(req, res, next) {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({
      msg: `Token missing`,
    });
  }
  try {
    const decoded_info = jwt.verify(token, JWT_SECRET);
    req.userId = decoded_info.id;
    next();
  } catch (error) {
    return res.status(403).json({
      msg: `Invalid or Expired token`,
    });
  }
}

function adminMiddleware(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({
      msg: "Token missing. Please log in as an Admin.",
    });
  }
  try {
    const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);
    if (decoded) {
      req.userId = decoded.id;
      next();
    } else {
      res.status(403).json({
        msg: "You are not authorized to access admin routes",
      });
    }
  } catch (error) {
    return res.status(403).json({
      msg: "Invalid or expired Admin token",
    });
  }
}

module.exports = { authMiddleware, adminMiddleware };
