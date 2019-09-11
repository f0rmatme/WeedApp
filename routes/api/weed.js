module.exports = (app, db, jwtMW) => {
  app.get("/weed", jwtMW, (req, res) => {
    let options = {
      where: {}
    };

    if (req.body.pagination) {
      let perPage = req.body.pagination.perPage;
      let page = req.body.pagination.page;

      options.limit = perPage;
      options.offset = page;
    }
    if (req.body.filter && req.body.filter.company) {
      options.where.company = req.body.filter.company;
    }
    if (req.body.filter && req.body.filter.type) {
      options.where.strain = req.body.filter.type;
    }
    if (req.body.filter && (req.body.filter.thc || req.body.filter.cbd)) {
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
        if (req.body.filter.thc === "dom") {
          options.where.id = { in: tempWeedArrTHC };
        } else if (req.body.filter.cbd === "dom") {
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
