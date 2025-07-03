const JWT = require("jsonwebtoken");
const log = require("../services/Logger");
const secret = process.env.JSON_SECRET;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(400).json({ message: ["No token found"] });
  JWT.verify(token, secret, (err, decoded) => {
    if (err) {
      log(`verifyToken: ${err}`);
      return res.status(403).json({ message: ["Invalid token"] });
    } else {
      req.user = decoded;
    }
    next();
  });
};

module.exports = verifyToken;
