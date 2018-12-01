var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require("body-parser"); 
var faker = require("faker");
var lodash = require("lodash");

const db = require("./models");
const apiPost = require("./app/api/post");
const apiAuthor = require("./app/api/author");

app.use(bodyParser.json());  
//app.use(express.static("app/public"));

apiPost(app, db);
apiAuthor(app, db);

app.use(express.static(__dirname + '/app/public/'));

router.use(function (req,res,next) {
    console.log("/" + req.method);
    next();
  });
  
  router.get("/",function(req,res){
    res.sendFile(path + "index.html");
  });


db.sequelize.sync().then( () => {
  app.listen(3000, () => 
    console.log("App listening on port 3000!")
  );
});