const passport = require('passport'); // requiring passport npm module

module.exports = app => {

app.get(
      '/auth/google', //when a user clicks/uses this route I send them into the below flow
       passport.authenticate('google', { //I'm authenticating - although I never set up google as an identifier - GoogleStrategy has an undercover/internal or something?! link to 'google'
        scope:['profile', 'email'] //asking for access to their profile info and their e-mail  (google has an internal list I could also ask for all drive content or pictures etc etc)
      })
    );

app.get( '/auth/google/callback', passport.authenticate('google') // same rule with the string 'google' this line gives access to the code that is given when google returns. it then returns it and asks for a user profile
);

app.get('/api/logout', (req, res) => { //passport automatically attaches req.logout it kills the cookie
  req.logout();
  res.send(req.user);
})

app.get('/api/current_user',(req,res) => {
  res.send(req.user);
  });
};
