const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decoded = jwt.verify(token.split(" ")[1], "rcbvslsg");
      if (decoded) {
        req.body.aithorID = decoded.aithorID;
        next();
      } else {
        res.send({ msg: "Please Login" });
      }
    } catch (err) {
      res.send({ msg: err.message });
    }
  } else {
    res.send({ msg: "Please Login" });
  }
};

module.exports = { auth };
