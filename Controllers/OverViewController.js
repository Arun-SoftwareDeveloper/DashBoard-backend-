const overView = require("../Models/OverViewModel");

const createOverView = async (req, res) => {
  try {
    const { view, visits, newUsers, activateUsers } = req.body;

    const newOverView = new overView({
      view,
      visits,
      newUsers,
      activateUsers,
    });
    await newOverView.save();
    return res.status(200).send({ message: "overview Created Successffully" });
  } catch (error) {
    return res.status(400).send({ message: `internal Server error` });
  }
};

const getOverView = async (req, res) => {
  try {
    const getOverViewData = await overView.find();
    return res.status(201).send(getOverViewData);
  } catch (error) {
    return res.status(400).send({ message: `internal Server error` });
  }
};

module.exports = { createOverView, getOverView };
