var self = (module.exports = {
  // Asynch getFriends by userId, returns a promise
  getFriends: function(app, db, usersId) {
    return db.friend
      .findAll({
        where: {
          userId: usersId
        },
        include: [db.user]
      })
      .then(foundFriends => {
        console.log(foundFriends.user);
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
        include: [db.user]
      })
      .then(foundFriends => {
        console.log(foundFriends.user);
        return foundFriends;
      });
  }
});
