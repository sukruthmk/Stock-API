const mongoose = require("mongoose");

// TODO: remove debug
mongoose.set("debug", true);

const Schema = mongoose.Schema;

let ZacksSchema = new Schema(
  {
    ticker: {
      type: String,
      unique: true,
      max: 10,
      required: true,
      dropDups: true,
    },
    rank: { type: number, required: true },
    value: { type: String, max: 10, required: true },
    growth: { type: String, max: 10, required: true },
    momentum: { type: String, max: 10, required: true },
    vgm: { type: String, max: 10, required: true },
  },
  { timestamps: true }
);

// Export the model
module.exports = mongoose.model("Zacks", ZacksSchema);
