const lineChartData = require("../Models/LineChartData");

const getLineChartData = (req, res) => {
  try {
    res.json(lineChartData);
  } catch (error) {
    console.error("Error fetching line chart data:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { getLineChartData };
