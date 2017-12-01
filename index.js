const express = require('express');
const passport = require('passport'); // requiring passport
const GoogleStrategy = require('passport-google-oauth20').Strategy; // only requiring the strategy from the oauth
const keys = require('./config/keys') // importing the id and secrect so they are safe in the keys which is in the gitignore as well
const app = express();

passport.use
    (new GoogleStrategy(//telling passport the 'use' (a function) a new GoogleStrategy
  {
    clientID: keys.googleClientID, // getting the client ID from the keys.js file
  clientSecret: keys.googleClientSecret, // getting the client secret for the same file
  callbackURL: '/auth/google/callback' // the route the user is sent after permission is granted
},
(accessToken, refreshToken, profile, done) => {
    console.log('access token', accessToken); // logging it out but doesn't do anything currently
    console.log('refresh token', refreshToken); // logging out the refresh token
    console.log('profile:', profile); // logging out the profile
    }
  )
);

app.get(
  '/auth/google', //when a user clicks/uses this route we send them into the below flow
   passport.authenticate('google', { //we're authenticating - although we never set up google as an identifier - GoogleStrategy has an undercover/internal or something?! link to 'google'
    scope:['profile', 'email'] //asking for access to their profile info and their e-mail  (google has an internal list we could also ask for all drive content or pictures etc etc)
  })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google') // same rule with the string 'google' this line gives access to the code that is given when google returns. it then returns it and asks for a user profile
)

const PORT = process.env.PORT || 5000;
app.listen(PORT);
