const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const Models = require("./models.js");

const Movie = Models.Movie;
const User = Models.User;
const Genre = Models.Genre;
const Directors = Models.Director;

mongoose.connect("mongodb://localhost:27017/myFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//gets list of data about moives
app.get("/movie", (req, res) => {
  res.json(movie);
});

app.get("/movie", (req, res) => {
  res.send("Successfull Get Request Returning data on all Movies");
});

//gets data about a single movie by name
app.get("/movies/:name", (req, res) => {
  res.json(
    movies.find((movie) => {
      return movie.name === req.params.name;
    })
  );
});
//gets genre data
app.get("/movies/genre/:name", (req, res) => {
  let movie = movies.find((movie) => {
    return movie.name === req.params.name;
  });
  if (movie) {
    res.status(200).send(`${req.params.name} is a ${movie.genre}`);
  } else {
    res.status(400).send("Movie not Found");
  }
});

//get director name
app.get("/movies/director/:name", (req, res) => {
  let movie = movies.find((movie) => {
    return movie.name === req.params.name;
  });
  if (movie) {
    res.status(200).send(`${req.params.name} is directed by ${movie.director}`);
  } else {
    res.status(400).send("Movie not Found");
  }
});

// adds movies
app.post("/movies", (req, res) => {
  let newMovie = req.body;

  if (!newMovie.name) {
    const message = "Missing Name in Request body";
    res.status(400).send(message);
  } else {
    newMovie.id = uuid.v4();
    movies.push(newMovie);
    res.status(201).send(newMovie);
  }
});
// movie deleted
app.delete("/movies/:id", (req, res) => {
  let movie = movies.find((movie) => {
    return movies.id === req.params.id;
  });
  if (movie) {
    movies = movies.fildter((obj) => {
      return obj.id !== req.params.id;
    });
    res.status(201).send("movie: " + req.params.id + " was deleted.");
  }
});

// create new user
app.post("/users", (req, res) => {
  Users.findOne({ UserName: req.body.UserName })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.UserName + "already exists");
      } else {
        Users.create({
          UserName: req.body.UserName,
          Password: req.body.Password,
          Email: req.body.email,
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

// get all users

app.get("/users", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Get a user by username
app.get("/users/:Username", (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// udate users info by username

app.put("/users/:Username", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      },
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// Add a movie to a user's favorites
app.post("/users/:Username/movies/:MovieID", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $push: { FavoriteMovies: req.params.MovieID },
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// Delete a user by username
app.delete("/users/:Username", (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found");
      } else {
        res.status(200).send(req.params.Username + " was deleted.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.get("/", (req, res) => {
  res.send("welcome to myFlix");
});

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.listen(8080, function () {
  console.log("Server is running on localhost8080");
});
