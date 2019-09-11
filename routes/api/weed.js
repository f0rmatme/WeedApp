module.exports = (app, db, jwtMW) => {
  app.get("/weed", jwtMW, (req, res) => {
    let options = {
      where: {},
      limit: 0,
      offset: 0
    };

    if (req.body.pagination) {
      let perPage = req.body.pagination.perPage;
      let page = req.body.pagination.page;

      options.limit = perPage;
      options.offset = page;
    }
    if (req.body.filter.company) {
      options.where.company = req.body.filter.company;
    }
    if (req.body.filter.type) {
      options.where.strain = req.body.filter.type;
    }

    db.weed.findAll(options).then(result => res.json(result));
  });

  app.get("/weed/:id", jwtMW, (req, res) =>
    db.weed.findById(req.params.id).then(result => res.json(result))
  );

  app.post("/weed", jwtMW, (req, res) => {
    console.log(req.body);
    db.weed.create(req.body).then(result => res.json(result));
  });
};
