const mongoose = require("mongoose");

const overViewModelSchema = new mongoose.Schema({
  view: {
    type: Number,
  },
  visits: {
    type: Number,
  },
  newUsers: {
    type: Number,
  },
  activateUsers: {
    type: Number,
  },
});

const overView = mongoose.model("overView", overViewModelSchema);

module.exports = overView;
