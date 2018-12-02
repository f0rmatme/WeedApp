module.exports = (app, db) => {
  app.get("/user", (req, res) => 
  	db.user.findAll({
  		include: [db.weed]
  	}).then( (result) => res.json(result) )
  );

  app.get("/user/:id", (req, res) => 
  	db.user.findOne({
  		where: {
  			id: req.params.id
  		},
  		include: [db.weed]
  	}).then( (result) => res.json(result) )
  );

  app.get("/user/fav/:weedId", (req, res) => 
  	db.user.findAll({
  		where: {
  			weedId: req.params.weedId
  		},
  		include: [db.weed]
  	}).then( (result) => res.json(result) )
  );

  app.post("/user/create", (req, res) =>
    db.user.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      createdAt: 0000-00-00 00:00:00,
      updatedAt: 0000-00-00 00:00:00,
      weedId: req.body.weedId,
      bio: req.body.bio,
      profilepic: req.body.profilepic
    }).then( (result) => res.json(result) )
  );

  app.put("/user/username/:id", (req, res) => 
    db.user.update({
    	username: req.body.username
  	},
  	{
  		where: {
  			id: req.params.id
  		}
    }).then( (result) => res.json(result) )
  );

  app.put("/user/password/:id", (req, res) => 
    db.user.update({
    	password: req.body.password
  	},
  	{
  		where: {
  			id: req.params.id
  		}
    }).then( (result) => res.json(result) )
  );

  app.put("/user/email/:id", (req, res) => 
    db.user.update({
    	email: req.body.email
  	},
  	{
  		where: {
  			id: req.params.id
  		}
    }).then( (result) => res.json(result) )
  );
}