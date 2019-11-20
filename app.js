var express = require("express");
var bodyParser = require("body-parser");
const path = require("path");
var lodash = require("lodash");
const session = require("express-session");

const db = require("./models");
const exjwt = require("express-jwt");

const cors = require("cors");

var app = express();

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
  next();
});

const jwtMW = exjwt({
  secret: "XxSmonkWeedErrday420xX"
});

const apiPost = require("./routes/api/post");
const apiWeed = require("./routes/api/weed");
const apiUser = require("./routes/api/user");
const apiLike = require("./routes/api/like");
const apiComment = require("./routes/api/comment");
const apiFriend = require("./routes/api/friend");
const authClass = require("./routes/auth/auth");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

apiPost(app, db, jwtMW);
apiWeed(app, db, jwtMW);
apiUser(app, db, jwtMW);
apiLike(app, db, jwtMW);
apiComment(app, db, jwtMW);
authClass(app, db, jwtMW);
apiFriend(app, db, jwtMW);

app.use(express.static(path.join(__dirname, 'react-client/build')));

// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'react-client/build', 'index.html'));
});

db.sequelize.sync().then(() => {
  app.listen(3000, () => console.log("App listening on port 3000!"));
});
