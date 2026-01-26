const jwt = require("jsonwebtoken");
const { error, success } = require("../constants/messages");
const response = require("../constants/responses");
const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json(response.errorRes(401, error.TOKEN_MISSING));
  }

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json(response.errorRes(error.INVALID_TOKEN));
  }
};

module.exports = authMiddleware;
