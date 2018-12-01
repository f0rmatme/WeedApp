module.exports = (app, db) => {
  app.get( "/weed", (req, res) =>
    db.post.findAll().then( (result) => res.json(result) )
  );

  app.get( "/weed/:id", (req, res) =>
    db.post.findById(req.params.id).then( (result) => res.json(result))
  );
}