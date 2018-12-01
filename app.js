var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require("body-parser"); 
var faker = require("faker");
var lodash = require("lodash");

const db = require("./models");
const apiPost = require("./app/api/post");
const apiAuthor = require("./app/api/author");
const apiWeed = require("./app/api/weed");
const apiUser = require("./app/api/user");

app.use(bodyParser.json());  
app.use(express.static(__dirname + "/app/public"));

apiPost(app, db);
apiAuthor(app, db);
apiWeed(app, db);
apiUser(app, db);


db.sequelize.sync().then( () => {
  app.listen(3000, () => 
    console.log("App listening on port 3000!")
  );
});