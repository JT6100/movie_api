const express = require("express");
const res = require("express/lib/response");
const app = express();
(bodyParser = require("body-parser")), (uuid = require("uuid"));

app.get("/movies", (req, res) => {
  res.json(topmovies);
});

app.get("/", (req, res) => {
  res.send("welcome to myFlix");
});

app.get("/test", function (req, res) {
  response.send("test this is a test");
});

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.listen(8080, function () {
  console.log("Server is running on localhost8080");
});
