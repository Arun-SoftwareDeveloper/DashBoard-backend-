const express = require("express");
const router = express.Router();
const BarChartData = require("../Controllers/BarChartData");

router.get("/getbarChartData", BarChartData.getbarChartData);

module.exports = router;
