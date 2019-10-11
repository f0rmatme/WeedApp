module.exports = (app, db, jwtMW) => {
  app.get("/user", jwtMW, (req, res) =>
    db.user.findAll().then(result => res.json(result))
  );

  app.get("/user/:id", jwtMW, (req, res) =>
    db.user
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(result => res.json(result))
  );

  app.get("/username/:username", jwtMW, (req, res) =>
    db.user
      .findOne({
        where: {
          username: req.params.username
        }
      })
      .then(result => res.json(result))
  );

  app.get("/api/user/find/", (req, res) => {
    if (req.query.search === "") {
      res.send([]);
    } else {
      db.user
        .findAll({
          where: {
            username: { like: "%" + req.query.search + "%" }
          }
        })
        .then(result => {
          res.json(result);
        });
    }
  });

  //Unused Route, don't have favourites as of yet
  app.get("/user/fav/:weedId", jwtMW, (req, res) =>
    db.user
      .findAll({
        where: {
          weedId: req.params.weedId
        },
        include: [db.weed]
      })
      .then(result => res.json(result))
  );

  app.post("/user/create", jwtMW, (req, res) =>
    db.user
      .create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        createdAt: "2012-04-23T18:25:43.511Z",
        updatedAt: "2012-04-23T18:25:43.511Z",
        weedId: req.body.weedId,
        bio: req.body.bio,
        profilepic: req.body.profilepic
      })
      .then(result => res.json(result))
  );

  app.put("/api/user", jwtMW, (req, res) => {
    db.user
      .update(
        {
          username: req.body.username,
          email: req.body.email,
          bio: req.body.bio
        },
        {
          where: {
            id: req.body.id
          }
        }
      )
      .then(result => {
        res.json(result);
      });
  });
};
