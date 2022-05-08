const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

app.use(express.json());

mongoose.connect("mongodb://localhost:8080/myFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const con = mongoose.connection;

con.on("open", function () {
  console.log("connected...");
});

app.use(bodyParser.json());

app.use(morgan("common"));

app.get("/", (req, res) => {
  res.send("welcome to myFlix");
});

app.post("/users", (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

app.listen(8080, function () {
  console.log("Server is running on localhost8080");
});
