module.exports = (app, db, jwtMW) => {
  app.get("/weed", jwtMW, (req, res) => {
    if (req.body.pagination) {
      let perPage = req.body.pagination.perPage;
      let page = req.body.pagination.page;

      db.weed
        .findAll({
          limit: perPage,
          offset: perPage * page
        })
        .then(result => res.json(result));
    } else {
      db.weed.findAll().then(result => res.json(result));
    }
  });

  app.get("/weed/:id", jwtMW, (req, res) =>
    db.weed.findById(req.params.id).then(result => res.json(result))
  );

  app.post("/weed", jwtMW, (req, res) => {
    console.log(req.body);
    db.weed.create(req.body).then(result => res.json(result));
  });
};
