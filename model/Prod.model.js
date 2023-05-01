const mongoose = require("mongoose");

const prodSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    aithorID: { type: String, required: true },
    school: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const prodModel = mongoose.model("prod", prodSchema);

module.exports = { prodModel };
