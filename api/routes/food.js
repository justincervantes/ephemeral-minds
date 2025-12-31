const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const description = req.body.description;
  const category = req.body.category;
  const date = req.body.date;
  const image = req.body.image;
  const uid = req.user._id;
  const response = [description, category, date, image, uid];

  console.log(
    `Description: ${description}, Category: ${category}, Date: ${date}, Img: ${image}, UID: ${uid}`
  );
  res.send(response);
});

module.exports = router;
