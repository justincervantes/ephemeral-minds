const express = require("express");
const app = express();
const config = require("config");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

require("./startup/middleware")(app);
require("./startup/cors")(app);
require("./startup/db")();
require("./startup/routes")(app);

app.get("/", (req, res) => {
  res.send("API");
});

const port = process.env.PORT || config.get("port");

app.listen(port, console.log(`Listening on port ${port}`));
