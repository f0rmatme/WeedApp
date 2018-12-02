var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require("body-parser"); 
var faker = require("faker");
var lodash = require("lodash");
var google = require(__dirname + '/config/google.json')['api'];
const passport = require('passport');  
const GoogleStrategy = require('passport-google-oauth20').Strategy;  
const session = require('express-session');

const db = require("./models");
const apiPost = require("./app/api/post");
const apiWeed = require("./app/api/weed");
const apiUser = require("./app/api/user");
const apiComment = require("./app/api/comment");
const userClass = require("./modules/users/user");

// Add session support
app.use(session({  
  secret: google.sessionSecret,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());  
app.use(passport.session());

passport.serializeUser((user, done) => {  
  done(null, user);
});

passport.deserializeUser((userDataFromCookie, done) => {  
  done(null, userDataFromCookie);
});

// Checks if a user is logged in
const accessProtectionMiddleware = (req, res, next) => {  
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({
      message: 'must be logged in to continue',
    });
  }
};

// Set up passport strategy
passport.use(new GoogleStrategy(  
  {
    clientID: google.clientID,
    clientSecret: google.clientSecret,
    callbackURL: google.callbackURL,
    scope: [google.scope],
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log('Our user authenticated with Google, and Google sent us back this profile info identifying the authenticated user:', profile.displayName);
    return cb(null, profile);
  },
));

// Create API endpoints

// This is where users point their browsers in order to get logged in
// This is also where Google sends back information to our app once a user authenticates with Google
app.get('/auth/google/callback',  
  passport.authenticate('google', { failureRedirect: '/', session: true }),
  (req, res) => {
	userClass.checkUser(app, db, req.user);
    res.redirect('/');
  }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

apiPost(app, db);
apiWeed(app, db);
apiUser(app, db);
apiComment(app, db);


app.use(express.static(__dirname + '/app/public/'));
app.use('/app/protected/', accessProtectionMiddleware);
app.use('/app/protected/', express.static(__dirname + '/app/protected/'));

db.sequelize.sync().then( () => {
  app.listen(3000, () => 
    console.log("App listening on port 3000!")
  );
});