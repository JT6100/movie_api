const express = require("express");
const res = require("express/lib/response");
const app = express();
(bodyParser = require("body-parser")), (uuid = require("uuid"));

app.use(bodyParser.json());

let movies = [
  {
    id: 1,
    name: "Batman",
    genre: "Action/Adventure",
    director: "Matt Reeves",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJApnr9b8RCQjrOr0YpzqMTY1xXWNrfWHgq0VvNxVNUaG9XyrV",
  },
  {
    id: 2,
    name: "CURS>R",
    genre: "Horror/Drama",
    director: "Toby Meakins",
    image:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRZZyA-5FM_Tbc9UExZK3MBra8jygT9QkL0Hhxo8B56YSAJfUnN",
  },
  {
    id: 3,
    name: "Metal Lords",
    genre: "Drama/Music",
    director: "greg Shapiro",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGZonQICPRipO5BqXiWFaJygFnqqJvGDMNbpfecYHnmN1lw35w",
  },
  {
    id: 4,
    name: "All the Old Knives",
    genre: "Thriller/Drama",
    director: "Janus Metz Pedersen",
    image:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSMap3-bIeCbSS0we9_tiUBoSmiOUKSupdE8P3IQ3vcDgXXFdB9",
  },
  {
    id: 5,
    name: "Umma",
    genre: "Horror/Supernatural",
    director: "Iris Shim",
    image:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSFnili_hd3zuxHrmcBvKjWeVnSDs4FVInftKvJ5IUD4VhqCTUs",
  },
  {
    id: 6,
    name: "The Shawshank Redemption",
    genre: "Drama/Crime",
    director: "Frank Darabont",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKEVEEwyYlEKJbnneJYQ2moCBaammhvILoI7_ayPgU2TN9pLPV",
  },
  {
    id: 7,
    name: "The Simpsons Movie",
    genre: "Comedy/Animation",
    director: "David Silverman",
    image:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRZRxyoqCYf9Y-iM7wslBXesSQR3O_6uhtlPcqITGSU9z-0tTWU",
  },
  {
    id: 8,
    name: "Red Dragon",
    genre: "Thriller/Crime",
    director: "Brett Ratner",
    image:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRf0HimVFPqj24mkthtT_hY36oh_8M-GjznEMbB9g6u96tLbABC",
  },
  {
    id: 9,
    name: "Mad Max: Fury Road",
    genre: "Action/Adventure",
    director: "George Miller",
    image:
      "https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg",
  },
  {
    id: 10,
    name: "Interview With The Vampier",
    genre: "Horror/Fantasy",
    director: "Neil Jordan",
    image:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQtJKoLMO27KSQ3e7QX9UYpkjqQPXLZmEa5mFixtuWBtJ6dECxY",
  },
];

//gets list of data about moives
app.get("/movies", (req, res) => {
  res.json(movies);
});

app.get("/movies", (req, res) => {
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
