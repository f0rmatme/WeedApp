module.exports = (app, db) => {
  app.get( "/posts", (req, res) =>
    db.post.findAll({
		include: [db.author, db.weed]
	}).then( (result) => res.json(result) )
  );

  app.get( "/post/:id", (req, res) =>
    db.post.findOne({
		where: {
			id: req.params.id
		},
		include: [db.author, db.weed]
	}).then( (result) => res.json(result))
  );

  app.post("/post", (req, res) => 
    db.post.create({
      title: req.body.title,
      content: req.body.content
    }).then( (result) => res.json(result) )
  );

  app.put( "/post/:id", (req, res) =>
    db.post.update({
      title: req.body.title,
      content: req.body.content
    },
    {
      where: {
        id: req.params.id
      }
    }).then( (result) => res.json(result) )
  );

  app.delete( "/post/:id", (req, res) =>
    db.post.destroy({
      where: {
        id: req.params.id
      }
    }).then( (result) => res.json(result) )
  );
}