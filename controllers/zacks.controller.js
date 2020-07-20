const Zacks = require("../models/zacks.model");
const Parser = require("../zacks/parser.js");
const Utils = require("../utils/date.js");

exports.read = async (req, res) => {
  let result = {};
  try {
    const { t: ticker } = req.query;
    let zacksData = await Zacks.findOne({ ticker }).exec();
    if (zacksData === null) {
      zacksData = await sync(ticker);
    } else {
      const lastUpdatedDate = zacksData.updatedAt;
      if (!Utils.isToday(lastUpdatedDate)) {
        zacksData = await sync(ticker, zacksData);
      }
    }
    console.log(zacksData);
    const { rank, value, growth, momentum, vgm } = zacksData;
    result = { ticker, rank, value, growth, momentum, vgm };
  } catch (e) {
    console.error(e);
    res.status(500);
  }
  res.send(result);
};

const sync = async (ticker, model = null) => {
  zacksData = await Parser.getZacksData(ticker);
  if (zacksData != null) {
    if (model != null) {
      return await update(model, zacksData);
    } else {
      return await create(zacksData);
    }
  }
};

const create = async (zacksData) => {
  newZacks = new Zacks(zacksData);
  return await newZacks.save();
};

const update = async (model, zacksData) => {
  const { rank, value, growth, momentum, vgm } = zacksData;
  model.rank = rank;
  model.value = value;
  model.growth = growth;
  model.momentum = momentum;
  model.vgm = vgm;
  return await model.save();
};
