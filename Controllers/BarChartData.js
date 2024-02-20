const BarChartData = require("../Models/BarChartData");

const getbarChartData = async (req, res) => {
  try {
    // console.log(BarChartData);
    res.json(BarChartData);
  } catch (error) {
    return res.status(409).send({ message: "Internal server error" });
  }
};

module.exports = { getbarChartData };
