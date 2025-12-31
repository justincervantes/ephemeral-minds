const users = require("../routes/users");
const posts = require("../routes/posts");
const auth = require("../routes/auth");
const weights = require("../routes/weights");
const food = require("../routes/food");
const featureRequests = require("../routes/featureRequests")

module.exports = function (app) {
  app.use("/api/users", users);
  app.use("/api/weights", weights);
  app.use("/api/posts", posts);
  app.use("/api/auth", auth);
  app.use("/api/food", food);
  app.use("/api/featureRequests", featureRequests);

};
