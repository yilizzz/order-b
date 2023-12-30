/**
 * verify the boss user's token
 * */
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.role = decoded.role;
    if (req.role !== "boss") throw new Error("You are not boss");
    next();
  } catch (error) {
    res.status(401).json({ message: "Please authenticate as boss." });
  }
};
