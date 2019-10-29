module.exports = (app, db, jwtMW) => {
  const friendModule = require("../../modules/friends/friend");

  app.get("/api/friend/:id", jwtMW, (req, res) => {
    friendModule
      .getFriends(app, db, req.params.id)
      .then(result => res.json(result));
  });

  app.get("/api/friends/count/:id", jwtMW, (req, res) => {
    let following = 0;

    friendModule.getFriends(app, db, req.params.id).then(result => {
      following = result.length;
      friendModule.getFollowers(app, db, req.params.id).then(result => {
        res.send({ following: following, followers: result.length });
      });
    });
  });

  app.post("/api/friend/create", jwtMW, (req, res) => {
    if (!req.body.userId || !req.body.friendId) {
      return res.status(400).json({ message: "Missing userId or friendId" });
    }
    db.friend
      .create({
        userId: req.body.userId,
        friendId: req.body.friendId
      })
      .then(result => res.json(result));
  });

  app.delete("/api/friend", jwtMW, (req, res) => {
    if (!req.body.userId || !req.body.friendId) {
      return res.status(400).json({ message: "Missing userId or friendId" });
    }
    db.friend
      .destroy({
        where: {
          userId: req.body.userId,
          friendId: req.body.friendId
        }
      })
      .then(result => res.json(result));
  });
};
