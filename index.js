const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require ('./services/passport');

mongoose.connect(keys.mongoURI); // connecting to MLabs but keeping our key secures in the config file which is added to the .gitignore file

const app = express();

require('./routes/authRoutes')(app); // require returns a function - the second set of parathesis immedity requires thats in them, in this case app

const PORT = process.env.PORT || 5000;
app.listen(PORT);
