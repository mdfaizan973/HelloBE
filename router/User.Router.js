const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../model/User.model");

userRouter.post("/register", async (req, res) => {
  const { email, pass, name } = req.body;
  bcrypt.hash(pass, 5, async (err, hash) => {
    const user = new userModel({ email, pass: hash, name });
    await user.save();
    res.send("New User Added");
  });
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await userModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(pass, user[0].hash, (err, result) => {
        if (!result) {
          const token = jwt.sign({ aithorID: user[0]._id }, "rcbvslsg");
          res.send({ msg: "Login successful", token: token });
        } else {
          res.send({ mas: "User Not Found" });
        }
      });
    } else {
      console.log({ mas: "User Not Found" });
      res.send({ mas: "User Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

userRouter.get("/", (req, res) => {
  res.send("Hello");
});

module.exports = { userRouter };
