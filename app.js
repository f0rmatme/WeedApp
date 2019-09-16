var express = require("express");
var bodyParser = require("body-parser");
const path = require("path");
var lodash = require("lodash");
const session = require("express-session");

const db = require("./models");
const apiPost = require("./routes/api/post");
const apiWeed = require("./routes/api/weed");
const apiUser = require("./routes/api/user");
const apiLike = require("./routes/api/like");
const apiComment = require("./routes/api/comment");
const authClass = require("./routes/auth/auth");
var bcrypt = require("bcrypt");
const exjwt = require("express-jwt");

const cors = require("cors");

var app = express();

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
  next();
});

app.use(express.static(path.join(__dirname, "build")));

const jwtMW = exjwt({
  secret: "XxSmonkWeedErrday420xX"
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

apiPost(app, db, jwtMW);
apiWeed(app, db, jwtMW);
apiUser(app, db, jwtMW);
apiLike(app, db, jwtMW);
apiComment(app, db, jwtMW);
authClass(app, db, jwtMW);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

db.sequelize.sync().then(() => {
  app.listen(3000, () => console.log("App listening on port 3000!"));
});
