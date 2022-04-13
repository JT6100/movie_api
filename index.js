const express = require("express");
const res = require("express/lib/response");
const app = express();
}:

app.get('/movies', (req, res) => {
    res.status(200).json(topmovies);
});

app.get('/', (req, res) => {
    res.send('welcome to myFlix');

});