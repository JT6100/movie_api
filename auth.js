const jwtSecret = 'your_jwt_secret'; // this has to be th esame key used in the JWTStratagey
const jwt= require('jsonwebtoken'),
    passport = require('passport');
require('./passport'); // your local passport file

let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.Username, // this is the username you're encoding in the jwt
        expiresIn: '7d', // this specifies that the token will expire in 7 days
        algorithem: 'HS256' // this is the algorithm used to " sign" or encode the values of the jwt

    });
}
