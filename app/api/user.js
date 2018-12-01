//user api
module.exports = (app, db) => {
  app.get("/user", (req, res) => 
  	db.user.findAll({
  		include: [db.weed]
  	}).then( (result) => res.json(result) )
  );
}