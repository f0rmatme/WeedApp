module.exports = (app, db) => {
  app.get("/posts", (req, res) =>
    db.post.findAll({
      include: [db.user]
    }).then((result) => res.json(result))
  );

  app.get("/post/:id", (req, res) =>
    db.post.findOne({
      where: {
        id: req.params.id
      },
      include: [db.user, db.weed]
    }).then((result) => res.json(result))
  );

  app.post("/posts", (req, res) => {
      db.post.create(req.body).then((result) => res.json(result));
  });


app.delete("/posts/:id", (req, res) =>
  db.post.destroy({
    where: {
      id: req.params.id
    }
  }).then((result) => res.json(result))
);
}
