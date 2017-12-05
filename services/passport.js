const passport = require('passport'); // requiring passport
const GoogleStrategy = require('passport-google-oauth20').Strategy; // only requiring the strategy from the oauth
const mongoose = require('mongoose');
const keys = require('../config/keys'); // importing the id and secrect so they are safe in the keys which is in the gitignore as well

const User = mongoose.model('users'); // pulling the schema out on mongoose, can do it with just a single argument one argument is fetching something two arguments means we're loading something into it

passport.serializeUser((user, done) => { // serialize is pre existing in passport. User is what we've just pulled from the database
// done is the callback
console.log('serializeUser error');
    done(null, user.id); // user id realtes to the id thats assigned to it by Mongo
});
// passport.serializeUser takes the user model and puts some identifying piece of info into a cookie


passport.deserializeUser((id, done) => { // getting the id from deserializeUser
  User.findById(id).then(user => { //
      done(null, user);
    }); ;
});
// the above function gets information from the cookie sent by

passport.use
    (new GoogleStrategy(//telling passport the 'use' (a function) a new GoogleStrategy
  {

    clientID: keys.googleClientID, // getting the client ID from the keys.js file
  clientSecret: keys.googleClientSecret, // getting the client secret for the same file
  callbackURL: '/auth/google/callback' // the route the user is sent after permission is granted
},
(accessToken, refreshToken, profile, done) => {
   User.findOne({ googleId: profile.id }).then((existingUser) => { // checking if the user is already in the database PROMISE
          if (existingUser) {
            //we already have a records with the given profile ID
            done(null, existingUser); //null says it's chill no error here existingUser send it back.
          } else {
            //we don't have a user record with this ID, make a new record
   new User({ gooleId: profile.id, name: profile.name}).save() //I'm creating a new model instance of a user, the .save takes a model Instance takes it to Mongo world and saves it
              .then(user => done(null, user)); // this is the second instance
        }
      });
    }
  )
);

// console.log('access token', accessToken); // logging it out but doesn't do anything currently
// console.log('refresh token', refreshToken); // logging out the refresh token
// console.log('profile:', profile); // logging out the profile
