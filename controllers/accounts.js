const Accounts = require("../models/acounts");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.logIn = async (req, res, next) => {
  try {
    const user = await Accounts.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: "Email address not correct" });
    }
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Password not correct" });
    }
    res.status(200).json({
      userId: user._id,
      role: user.role,
      token: jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_KEY,
        {
          expiresIn: "24h",
        }
      ),
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
