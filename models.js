const mongoose = require("mongoose");

let moviesSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String,
  },
  Director: {
    Name: String,
    Bio: String,
  },
});

let usersSchema = mongoose.Schema({
  UserName: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "movies" }],
});

let movies = mongoose.model("movies", moviesSchema);
let users = mongoose.model("users", usersSchema);

module.exports.movies = movies;
module.exports.users = users;
