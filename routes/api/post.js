module.exports = (app, db, jwtMW) => {
  const Op = db.sequelize.Op;
  const friendModule = require("../../modules/friends/friend");

  app.get("/api/posts", jwtMW, (req, res) =>
    db.post
      .findAll({
        include: [db.user, db.weed, db.like, db.comment],
        order: [["id", "DESC"]]
      })
      .then(result => res.json(result))
  );

  app.get("/api/post/:id", jwtMW, (req, res) =>
    db.post
      .findOne({
        where: {
          id: req.params.id
        },
        include: [db.user, db.weed]
      })
      .then(result => res.json(result))
  );

  app.post("/api/posts", jwtMW, (req, res) => {
    db.post.create(req.body).then(result => res.json(result));
  });

  app.delete("/api/posts/:id", (req, res) =>
    db.post
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(result => res.json(result))
  );

  app.get("/api/posts/allFriends/:userId", (req, res) => {
    let userId = req.params.userId;
    // Get the users friends, store the ids in a list, and then get a list of posts using those ids
    friendModule.getFriends(app, db, userId).then(friends => {
      if (!friends) {
        res.json([]);
        return;
      }

      var friendIds = friends.map(function(friend) {
        return friend.user.id;
      });

      db.post
        .findAll({
          where: {
            userId: {
              [Op.or]: [friendIds, userId]
            }
          },
          include: [db.user, db.weed, db.like, db.comment],
          order: [["id", "DESC"]]
        })
        .then(result => res.json(result));
    });
  });

  app.get("/api/posts/relatedWeed/:weedId", jwtMW, (req, res) => {
    db.post.findAll({
      where: {
        weedId: req.params.weedId
      },
      include: [db.user, db.weed, db.like, db.comment],
      order: [["id", "DESC"]]
    }).then((result) => res.json(result));
  });
};
