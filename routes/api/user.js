module.exports = (app, db, jwtMW) => {

  app.get("/api/user", jwtMW, (req, res) =>
    db.user.findAll().then(result => res.json(result))
  );

  app.get("/api/user/:id", jwtMW, (req, res) =>
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

  app.get("/api/username/:username", jwtMW, (req, res) =>
    db.user
      .findOne({
        where: {
          username: req.params.username
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

  app.get("/api/user/search/:search", jwtMW, (req, res) => {
    if (req.params.search === "") {
      res.send([]);
    } else {
      db.user
        .findAll({
          where: {
            username: { like: "%" + req.params.search + "%" }
          }
        })
        .then(result => {
          res.json(result);
        });
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

  app.post("/api/user/create", jwtMW, (req, res) =>
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

    db.user
      .update(body, {
        where: {
          id: req.body.id
        }
      })
      .then(result => {
        res.json(result);
      });
  });
};
