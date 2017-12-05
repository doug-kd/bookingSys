const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); // makes express care about cookies
const passport = require('passport');
const keys = require('./config/keys');
require ('./models/User');
require ('./services/passport');

mongoose.connect(keys.mongoURI); // connecting to MLabs but keeping our key secures in the config file which is added to the .gitignore file

const app = express();

app.use(
  cookieSession({ //configuration object
    maxAge: 30 * 24 * 60 * 60 * 1000, // cookie lasts for 30 days - age has to entered in miliseconds
    keys: [keys.cookieKey] // brings in the the cookieKey from the Keys folder
  })
)

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app); // require returns a function - the second set of parathesis immedity requires thats in them, in this case app

const PORT = process.env.PORT || 5000;
app.listen(PORT);
