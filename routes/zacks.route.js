const express = require("express");
const router = express.Router();

const zacksController = require("../controllers/zacks.controller");

router.get("/", zacksController.read);

router.get("/rank", zacksController.rank);
module.exports = router;
