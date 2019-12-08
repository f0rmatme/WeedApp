module.exports = (app, db, jwtMW) => {
  app.get("/api/user", jwtMW, (req, res) =>
    db.user.findAll().then(result => res.json(result))
  );

  app.get("/api/user/:id", jwtMW, (req, res) =>
    db.user
      .findOne({
        where: {
          id: req.params.id
        },
        attributes: {
          exclude: ["password"]
        }
      })
      .then(result => res.json(result))
  );

  app.get("/api/username/:username", jwtMW, (req, res) =>
    db.user
      .findOne({
        where: {
          username: req.params.username
        },
        attributes: {
          exclude: ["password"]
        }
      })
      .then(result => res.json(result))
  );

  app.get("/api/user/search/:search", jwtMW, (req, res) => {
    if (req.params.search === "") {
      res.send([]);
    } else {
      db.user
        .findAll({
          where: {
            username: { like: "%" + req.params.search + "%" }
          },
          attributes: {
            exclude: ["password"]
          }
        })
        .then(result => res.json(result));
    }
  });

  //Unused Route, don't have favourites as of yet
  app.get("/api/user/fav/:weedId", jwtMW, (req, res) =>
    db.user
      .findAll({
        where: {
          weedId: req.params.weedId
        },
        include: [db.weed]
      })
      .then(result => res.json(result))
  );

  app.put("/api/user", jwtMW, (req, res) => {
    let body = {};

    if (req.body.username !== "") {
      body.username = req.body.username;
    }
    if (req.body.email !== "") {
      body.email = req.body.email;
    }
    if (req.body.bio !== "") {
      body.bio = req.body.bio;
    }
    if (req.body.profilepic !== "") {
      body.profilepic = req.body.profilepic;
    }

    db.user
      .update(body, {
        where: {
          id: req.body.id
        }
      })
      .then(result => {
        delete result.dataValues["password"];
        res.json(result);
      });
  });
};
