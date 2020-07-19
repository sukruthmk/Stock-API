const ZacksModel = require("../models/zacks.model");

exports.read = function (req, res) {};

exports.rank = function (req, res) {
  const { t:ticker } = req.body;
  const zacksData = await ZacksModel.findOne({ ticker }).exec();
  if(zacksData) {
      res.send(zacksData.rank);
  } else {
      
  }
};
