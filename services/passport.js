const passport = require('passport'); // requiring passport
const GoogleStrategy = require('passport-google-oauth20').Strategy; // only requiring the strategy from the oauth
const mongoose = require('mongoose');
const keys = require('../config/keys'); // importing the id and secrect so they are safe in the keys which is in the gitignore as well

const User = mongoose.model('users'); // pulling the schema out on mongoose, can do it with just a single argument one argument is fetching something two arguments means we're loading something into it

passport.use
    (new GoogleStrategy(//telling passport the 'use' (a function) a new GoogleStrategy
  {
    clientID: keys.googleClientID, // getting the client ID from the keys.js file
  clientSecret: keys.googleClientSecret, // getting the client secret for the same file
  callbackURL: '/auth/google/callback' // the route the user is sent after permission is granted
},
(accessToken, refreshToken, profile, done) => {
    new User({googleId: profile.id}).save //I'm creating a new model instance of a user, the .save takes a model Instance takes it to Mongo world and saves it
    }
  )
);

// console.log('access token', accessToken); // logging it out but doesn't do anything currently
// console.log('refresh token', refreshToken); // logging out the refresh token
// console.log('profile:', profile); // logging out the profile
