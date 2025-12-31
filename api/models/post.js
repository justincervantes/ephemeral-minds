const mongoose = require("mongoose");
const moment = require("moment");

const postSchema = new mongoose.Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
    default: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
  },
  content: {
    type: String,
    required: true,
    minlength: 3,
  },
  date: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  score: { type: Number, required: true },
  magnitude: { type: Number, required: true },
});

const Post = mongoose.model("Post", postSchema);

function validatePost(post) {
  const schema = Joi.object({
    uid: Joi.string().min(2).max(100).required(),
    title: Joi.string().min(3).max(255).required().email(),
    content: Joi.string().min(3).required(),
    date: Joi.date().required(),
    score: Joi.number().required(),
    magnitude: Joi.number().required(),
  });

  const options = {
    errors: {
      wrap: {
        label: "",
      },
    },
  };

  return schema.validate(post, options);
}

exports.Post = Post;
exports.validate = validatePost;
