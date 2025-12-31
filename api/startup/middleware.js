var path = require("path");
var express = require("express");
var dir = path.join(__dirname, "/../public");

module.exports = function (app) {
  console.log(dir);
  app.use(express.static(dir));
};
