var express = require("express");
var exphbs = require("express-handlebars");
var router = express.Router();
var bodyParser = require("body-parser");
var faker = require("faker");
var lodash = require("lodash");
const session = require("express-session");

const db = require("./models");
const apiPost = require("./routes/api/post");
const apiWeed = require("./routes/api/weed");
const apiUser = require("./routes/api/user");
const apiComment = require("./routes/api/comment");
const userClass = require("./modules/users/user");
const authClass = require("./routes/auth/auth");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

apiPost(app, db, jwtMW);
apiWeed(app, db, jwtMW);
apiUser(app, db, jwtMW);
apiComment(app, db, jwtMW);
authClass(app, db, jwtMW);

db.sequelize.sync().then(() => {
  app.listen(3000, () => console.log("App listening on port 3000!"));
});
