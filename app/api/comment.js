module.exports = (app, db) => {
  app.get( "/comment/:postId", (req, res) =>
    db.comment.findAll({
		where: {
			postId: req.params.postId
		},
		include: [db.post, db.user]
	}).then( (result) => res.json(result) )
  );
}