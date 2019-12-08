var self = (module.exports = {
  // Asynch getFriends by userId, returns a promise
  getFriends: function(app, db, usersId) {
    return db.friend
      .findAll({
        where: {
          userId: usersId
        },
        include: {
          model: db.user,
          as: "following",
          attributes: {
            exclude: ["password"]
          }
        }
      })
      .then(foundFriends => {
        return foundFriends;
      });
  },

  // Asynch getFollowers by userId, returns a promise
  getFollowers: function(app, db, usersId) {
    return db.friend
      .findAll({
        where: {
          friendId: usersId
        },
        include: {
          model: db.user,
          as: "follower",
          attributes: {
            exclude: ["password"]
          }
        }
      })
      .then(foundFriends => {
        return foundFriends;
      });
  }
});
