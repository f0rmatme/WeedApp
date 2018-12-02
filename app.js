var express = require("express");
var exphbs = require("express-handlebars");
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
  if(userDataFromCookie) {
	userClass.getUser(app, db, userDataFromCookie.emails[0].value).then((foundUser) => {
		if(foundUser) { 
			done(null, foundUser);
		} else {
			userClass.createUser(app, db, userDataFromCookie).then((createdUser) => {
				done(null, createdUser);
			});
		}
	});
  } else {
	  done(null, null);
  }
});

// Checks if a user is logged in
const accessProtectionMiddleware = (req, res, next) => {  
  if (req.isAuthenticated()) {
    next();
  } else {
	req.session.error = 'Please sign in!';
	res.redirect('/');
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
	res.redirect('/');
  }
);

app.get('/logout', function (req, res) {
    delete app.locals.user;
    req.session.destroy();
    res.redirect('/');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

apiPost(app, db);
apiWeed(app, db);
apiUser(app, db);
apiComment(app, db);


// Configure express to use handlebars templates
var hbs = exphbs.create({
    defaultLayout: 'main', //we will be creating this layout shortly
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

app.use(express.static(__dirname + '/views'));
//app.use('/app/protected/', accessProtectionMiddleware);
//app.use('/app/protected/', express.static(__dirname + '/app/protected/'));

//===============ROUTES=================
//displays our homepage
app.get('/', function(req, res){
  res.render('home', {user: req.user});
});

//displays our homepage
app.get('/submit', function(req, res){
  res.render('submit', {user: req.user});
});

//displays our signup page
app.get('/signin', function(req, res){
  res.render('signin');
});

//sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
app.post('/login', passport.authenticate('local-signin', {
  successRedirect: '/',
  failureRedirect: '/signin'
  })
);

//logs user out of site, deleting them from the session, and returns to homepage
app.get('/logout', function(req, res){
  var name = req.user.username;
  console.log("LOGGIN OUT " + req.user.username)
  req.logout();
  res.redirect('/');
  req.session.notice = "You have successfully been logged out " + name + "!";
});

db.sequelize.sync().then( () => {
  app.listen(3000, () => 
    console.log("App listening on port 3000!")
  );
});