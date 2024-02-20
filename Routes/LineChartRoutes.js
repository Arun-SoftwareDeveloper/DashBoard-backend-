const express = require("express");
const router = express.Router();
const LineChartController = require("../Controllers/LineChartData");

router.get("/getlinechartdata", LineChartController.getLineChartData);

module.exports = router;
