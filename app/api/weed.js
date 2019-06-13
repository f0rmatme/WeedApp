module.exports = (app, db) => {
  app.get("/weed", (req, res) =>
    db.weed.findAll().then((result) => res.json(result))
  );

  app.get("/weed/:id", (req, res) =>
    db.weed.findById(req.params.id).then((result) => res.json(result))
  );

}
