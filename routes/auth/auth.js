var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (app, db, jwtMW) => {
  app.post("/login", (req, res) => {
    const { username, password } = req.body;
    console.log("User submitted: ", username, password);

    db.user
      .findOne({
        where: { username: username }
      })
      .then(user => {
        console.log("User Found: ", user);
        if (user === null) {
          res.json(false);
        }
        bcrypt.compare(password, user.password, function(err, result) {
          if (result === true) {
            console.log("Valid!");
            let token = jwt.sign(
              { username: user.username },
              "XxSmonkWeedErrday420xX",
              { expiresIn: 129600 }
            ); // Signing the token
            console.log(user);
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
        .create({
          username: username,
          password: hash,
          email: email
        })
        .then(result => {
          console.log("User created: ", result);
          res.json("user created!");
        });
    });
  });

  app.get("/me/:id", jwtMW, (req, res) =>
    db.user
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(result => res.json(result))
  );
};
