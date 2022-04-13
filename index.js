const express = require("express");
const res = require("express/lib/response");
const app = express();

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
app.listen(3000, function () {
  console.log("Server is running on localhost3000");
});
