var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = (app, db, jwtMW) => {
  app.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.user
      .findOne({
        where: { username: username }
      })
      .then(user => {
        if (user === null) {
          res.json(false);
        }
        bcrypt.compare(password, user.password, function(err, result) {
          if (result === true) {
            let token = jwt.sign(
              { username: user.username },
              process.env.JWT_SECRET,
              { expiresIn: 18000 }
            ); // Signing the token
            delete user.dataValues["password"];
            res.json({
              sucess: true,
              err: null,
              token,
              user: user
            });
          } else {
            console.log("Entered Password and Hash do not match!");
            res.status(401).json({
              sucess: false,
              token: null,
              err: "Entered Password and Hash do not match!"
            });
          }
        });
      });
  });

  app.post("/signup", (req, res) => {
    const { username, password, email } = req.body;
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function(err, hash) {
      db.user
        .findOrCreate({
          where: { username: username },
          defaults: {
            password: hash,
            email: email
          }
        })
        .then(result => {
          if (result[1]) {
            console.log("User created: ", result);
            res.json("user created!");
          } else {
            res.json({ error: "Username taken" });
          }
        });
    });
  });

  app.post("/verify", (req, res) => {
    jwt.verify(req.body.token, process.env.JWT_SECRET, (err, decoded) => {
      if(err) {
        res.json({
          error: "Token Expired"
        });
      } else {
        res.json(decoded);
      }
    });
  });

  app.get("/me/:id", jwtMW, (req, res) =>
    db.user
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(result =>
        res.json({
          id: result.id,
          username: result.username,
          email: result.email,
          bio: result.bio,
          profilepic: result.profilepic
        })
      )
  );
};
