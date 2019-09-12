module.exports = (app, db, jwtMW) => {
  app.get("/weed", jwtMW, (req, res) => {
    let options = {
      where: {}
    };

    if (req.query.pagination) {
      let perPage = req.query.perPage;
      let page = req.query.page;

      options.limit = perPage;
      options.offset = page * perPage;
    }
    if (req.query.search) {
      options.where.weedName = { like: "%" + req.query.search + "%" };
    }
    if (req.query && req.query.company) {
      options.where.company = req.query.company;
    }
    if (req.query && req.query.type) {
      options.where.strain = req.query.type;
    }
    if (req.query && (req.query.thc || req.query.cbd)) {
      let weedArr = [];
      db.weed.findAll().then(result => {
        let tempWeedArrTHC = [];
        let tempWeedArrCBD = [];
        result.forEach(weed => {
          if (weed.cbd === "<1%") {
            tempWeedArrTHC.push(weed.id);
          } else {
            let thc = weed.thc.split("-")[0];
            thc = thc.split("%")[0];
            let cbd = weed.cbd.split("-")[0];
            cbd = cbd.split("%")[0];
            if (parseInt(thc) > parseInt(cbd)) {
              tempWeedArrTHC.push(weed.id);
            } else if (parseInt(thc) < parseInt(cbd)) {
              tempWeedArrCBD.push(weed.id);
            }
          }
        });
        if (req.query.thc === "dom") {
          options.where.id = { in: tempWeedArrTHC };
        } else if (req.query.cbd === "dom") {
          options.where.id = { in: tempWeedArrCBD };
        }
        db.weed.findAll(options).then(result => res.json(result));
      });
    } else {
      db.weed.findAll(options).then(result => res.json(result));
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
