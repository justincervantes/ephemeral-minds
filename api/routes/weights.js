const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Weight } = require("../models/weight");

router.post("/", auth, async (req, res) => {
  let weight = new Weight({
    uid: req.user._id,
    date: req.body.date,
    weight: req.body.weight,
  });

  weight = await weight.save();
  console.log("Status of adding a weight: ", weight);
  res.send(weight);
});

router.get("/", auth, async (req, res) => {
  const weight = await Weight.find({ uid: req.user._id });
  res.send(weight);
});

module.exports = router;
