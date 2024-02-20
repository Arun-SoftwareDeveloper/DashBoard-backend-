const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const configDB = require("./DataBase/ConfigDB");
const overViewRoutes = require("./Routes/OverViewRoutes");
const LineChartRoutes = require("./Routes/LineChartRoutes");
const BarChartRoutes = require("./Routes/BarChartRoutes");
const UserRoutes = require("./Routes/UserRoutes");
dotenv.config();
app.use(bodyparser.json());
app.use(cors());

app.use("/", overViewRoutes);
app.use("/", LineChartRoutes);
app.use("/", BarChartRoutes);
app.use("/", UserRoutes);

configDB;
app.get("/", (req, res) => {
  res.send("We developed the backend Server");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`The server is running on the port ${PORT}`);
});
