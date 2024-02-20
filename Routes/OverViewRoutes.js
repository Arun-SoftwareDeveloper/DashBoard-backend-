const express = require("express");
const router = express.Router();
const overViewController = require("../Controllers/OverViewController");

router.post("/createOverview", overViewController.createOverView);
router.get("/getAllOverview", overViewController.getOverView);

module.exports = router;
