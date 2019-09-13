module.exports = (app, db, jwtMW) => {
  app.get("/like/:id", jwtMW, (req, res) =>
    db.like
      .findAll({
        where: { postId: req.params.id }
      })
      .then(result => res.json(result))
  );

  app.post("/like", jwtMW, (req, res) => {
    db.like.create(req.body).then(result => res.json(result));
  });

  app.delete("/like/:id", jwtMW, (req, res) =>
    db.like
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(result => res.json(result))
  );
};
