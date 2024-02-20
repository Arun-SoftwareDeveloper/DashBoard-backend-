const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const DBURL = process.env.DBURL;

const mongooseConnection = async () => {
  try {
    const response = await mongoose.connect(DBURL);
    console.log(`MongoDB connected Sucessfully`);
  } catch (error) {
    console.log(`Error in connnecting MongoDB ${error}`);
  }
};

mongooseConnection();

module.exports = mongooseConnection;
