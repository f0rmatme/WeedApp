module.exports = (app, db) => {
  app.get( "/comment/:postId", (req, res) =>
    db.comment.findAll({
		where: {
			postId: req.params.postId
		},
		include: [db.post, db.user]
	}).then( (result) => res.json(result) )
  );
  app.post("/comment/:postId", (req, res) => 
    db.comment.create({
      postId: req.body.postId,
      userId: req.body.userId,
	  comment: req.body.comment,
	  createdAt: req.body.createdAt,
	  updatedAt: req.body.updatedAt,
    }).then( (result) => res.json(result) )
  );
}