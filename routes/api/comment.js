module.exports = (app, db, jwtMW) => {
  app.get("/api/comment/:postId", jwtMW, (req, res) =>
    db.comment
      .findAll({
        where: {
          postId: req.params.postId
        },
        include: [
          db.post,
          {
            model: db.user,
            attributes: {
              exclude: ["password"]
            }
          }
        ]
      })
      .then(result => res.json(result))
  );

  app.post("/api/comment", jwtMW, (req, res) =>
    db.comment.create(req.body).then(result => res.json(result))
  );
};
