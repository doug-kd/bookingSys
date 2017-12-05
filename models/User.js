const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const { Schema } = mongoose; // restructured from above
// the above says the mongoose object has a property called Schema. Take it and assign it to a new Var called Schema
const userSchema = new Schema({
  googleId: String,
   // have a string for the googleID
});

mongoose.model('users', userSchema); //I'm loading the schema into mongoose that I'm creating a new collection called users
