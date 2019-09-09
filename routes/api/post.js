module.exports = (app, db, jwtMW) => {
  app.get("/posts", jwtMW, (req, res) =>
    db.post
      .findAll({
        include: [db.user, db.weed],
        order: [["id", "DESC"]]
      })
      .then(result => res.json(result))
  );

  app.get("/post/:id", jwtMW, (req, res) =>
    db.post
      .findOne({
        where: {
          id: req.params.id
        },
        include: [db.user, db.weed]
      })
      .then(result => res.json(result))
  );

  app.post("/posts", jwtMW, (req, res) => {
    db.post.create(req.body).then(result => res.json(result));
  });

  app.delete("/posts/:id", (req, res) =>
    db.post
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(result => res.json(result))
  );
};
