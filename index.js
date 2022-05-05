const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const Models = require("./models.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const movies = Models.movies;
const users = Models.users;

mongoose.connect("mongodb://localhost:27017/myFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.send("welcome to myFlix");
});

//gets list of data about moives
app.get("/movies", (req, res) => {
  movies
    .find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// get all users

app.get("/users", (req, res) => {
  users
    .find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});
/* app.get("/movies", (req, res) => {
  res.send("Successfull Get Request Returning data on all Movies");
});

//gets data about a single movie by name
app.get("/movies/:name", (req, res) => {
  res.json(
    movies.find((movies) => {
      return movies.name === req.params.name;
    })
  );
});
//gets genre data
app.get("/movies/genre/:name", (req, res) => {
  let movies = movies.find((movies) => {
    return Models.movies.name === req.params.name;
  });
  if (movies) {
    res.status(200).send(`${req.params.name} is a ${movies.genre}`);
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
  let movies = movies.find((movies) => {
    return movies.id === req.params.id;
  });
  if (Models.movies) {
    movies = movies.fildter((obj) => {
      return obj.id !== req.params.id;
    });
    res.status(201).send("movie: " + req.params.id + " was deleted.");
  }
});

// create new user
app.post("/users", (req, res) => {
  users
    .findOne({ UserName: req.body.UserName })
    .then((users) => {
      if (users) {
        return res.status(400).send(req.body.UserName + "already exists");
      } else {
        users
          .create({
            UserName: req.body.UserName,
            Password: req.body.Password,
            Email: req.body.email,
            Birthday: req.body.Birthday,
          })
          .then((users) => {
            res.status(201).json(users);
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



// Get a user by username
app.get("/users/:UserName", (req, res) => {
  Users.findOne({ UserName: req.params.UserName })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// udate users info by username

app.put("/users/:UserName", (req, res) => {
  users.findOneAndUpdate(
    { UserName: req.params.UserName },
    {
      $set: {
        UserName: req.body.UserName,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      },
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

// Add a movie to a user's favorites
app.post("/users/:Username/movies/:MovieID", (req, res) => {
  users.findOneAndUpdate(
    { UseName: req.params.UserName },
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
  users
    .findOneAndRemove({ UserName: req.params.UserName })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.UserName + " was not found");
      } else {
        res.status(200).send(req.params.UserName + " was deleted.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});



app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});*/
app.listen(8080, function () {
  console.log("Server is running on localhost8080");
});
