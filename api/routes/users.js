const express = require("express");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const router = express.Router();
const { User, validate } = require("../models/user");
const _ = require("lodash");

router.get("/", async (req, res) => {
  console.log("Getting /users");
  let users = await User.find({});
  console.log(users);
  res.send(users);
});

router.post("/", async (req, res) => {
  console.log("Posting /users");
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) res.status(400).send("This email has already been registered");

  user = new User(_.pick(req.body, ["name", "email", "password", "imageUrl"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "name", "email"]));
});

// TODO: Implement changing the user name
// TODO: Implement changing the user email
// TODO: Implement changing the user password
router.patch("/", auth, async (req, res) => {
console.log("Patching /users")
  if (!req.body.imageUrl) res.status(400).send("ImageUrl required!");

  let result = await User.updateOne(
    { _id: req.user._id },
    { $set : { imageUrl: req.body.imageUrl } },
  );

  if(result.n !== 1) {
    res.status(400).send('Error: the server failed to find the user profile.');
  }

  user = await User.findById(req.user._id);
  
  res.status(200).send(_.pick(user, ["_id", "name", "email", "imageUrl"]));
});

router.get("/imageUrl", auth, async (req, res) => {
  try {
    const { imageUrl } = await User.findById(req.user._id);
    res.send(imageUrl);
  } catch (ex) {
    res.status(400).send("Something went wrong.");
  }
});

module.exports = router;
