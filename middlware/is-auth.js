const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("Authorization");
  try {
    const decodedToken = jwt.verify(token, "supersecret");
    if (!decodedToken) {
      const error = new Error("Not authenticated!");
      error.statusCode = 401;
      throw error;
    }
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
};
