// prodModel
const express = require("express");
const prodRouter = express.Router();
const { prodModel } = require("../model/Prod.model");

prodRouter.post("/add", async (req, res) => {
  const data = req.body;
  const prod = new prodModel(data);
  await prod.save();
  res.send({ msg: " Successfully data added!!" });
});

prodRouter.get("/", async (req, res) => {
  try {
    const data = await prodModel.find({ aithorID: req.body.aithorID });
    res.send(data);
  } catch (err) {
    console.log({ err: err.message });
  }
});

prodRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prodModel.findByIdAndUpdate({ _id: id }, req.body);
    res.json({ msg: `the prod with id ${id} was updated` });
  } catch (err) {
    console.log(err);
  }
});

prodRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prodModel.findByIdAndDelete({ _id: id });
    res.json({ msg: `the prod with id ${id} was deleted` });
  } catch (err) {
    console.log(err);
  }
});

module.exports = { prodRouter };
