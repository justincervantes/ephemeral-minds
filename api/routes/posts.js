const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Post } = require("../models/post");
const { getSentiment } = require("../services/SentimentAnalysisService");

router.post("/", auth, async (req, res) => {
  try  {
    let post = new Post({
      uid: req.body.uid,
      title: req.body.title,
      content: req.body.content,
    });

    const { score, magnitude } = await getSentiment(req.body.content);
    post.score = score;
    post.magnitude = magnitude;
    post = await post.save();
    console.log(post);
    res.send(post);
  } catch (ex) {
    res
      
      .status(500)
      
      .send("An error probably occured with one of GCP libraries.");;
  }
});

router.patch("/individual/:_id", auth, async (req, res) => {
  try  {
    let post = await Post.findById(req.params);
    post.title = req.body.title;
    post.content = req.body.content;
    post.updatedDate = new Date();
    const { score, magnitude } = await getSentiment(req.body.content);
    post.score = score;
    post.magnitude = magnitude;
    post = await post.save();
    console.log(post);
    res.send(post);
  } catch (ex) {
    res.status(500).send("An error occured while patching.");;
  }
});

router.get("/:uid", auth, async (req, res) => {
  const posts = await Post.find({ uid: req.user._id });
  res.send(posts);
});

router.get("/individual/:_id", auth, async (req, res) => {
  const posts = await Post.findOne({ uid: req.user._id, _id: req.params._id });
  if (!posts) {
    res
      .status(403)
      .send(
        "Either the access token is not correct for the post you are trying to view, or the post has already been deleted."
      );
  }
  res.send(posts);
});

router.post("/delete", auth, async (req, res) => {
  const posts = await Post.deleteOne({
    uid: req.user._id,
    _id: req.body._id,
  });

  if (posts.deletedCount === 0) {
    res
      .status(403)
      .send(
        "Either the access token is not correct for the post you are trying to delete, or the post has already been deleted."
      );
  }
  res.send(posts);
});

module.exports = router;
