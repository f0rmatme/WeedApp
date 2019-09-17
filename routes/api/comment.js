module.exports = (app, db, jwtMW) => {
  app.get("/comment/:postId", jwtMW, (req, res) =>
    db.comment
      .findAll({
        where: {
          postId: req.params.postId
        },
        include: [db.post, db.user]
      })
      .then(result => res.json(result))
  );

  app.post("/comment", jwtMW, (req, res) =>
    db.comment.create(req.body).then(result => res.json(result))
  );
};
