const db = require("../models");
const csv = require("csv");
const truncateWeed = require("./truncate");

let obj = csv();

const parseDelta9 = () => {
  db.weed.destroy({ truncate: true, cascade: false });
  obj.from.path("./seeds/delta9.csv").to.array(function(data) {
    for (var index = 1; index < data.length; index++) {
      //Image For Weed
      let imgTag = data[index][0];
      let srcUrl = imgTag.split(" ")[8];
      let imgUrl = srcUrl.toString().split('"')[1];

      //Info For weed
      let infoArr = data[index][1].split(" ");
      let info = [];
      infoArr.forEach(i => {
        if (i !== "" && i !== "\n") {
          info.push(i);
        }
      });

      //Vendor Name For weed
      let ven = data[index][2];

      //Name of Weed
      let name = data[index][3].split(" - ")[1];

      db.weed.create({
        pictureUrl: imgUrl,
        weedName: name,
        thc: info[1].split("\n")[0],
        cbd: info[3].split("\n")[0],
        strain: info[4],
        company: ven
      });
    }
  });
};

const parseWikileaf = () => {
  obj.from.path("./seeds/wikileaf.csv").to.array(function(data) {
    for (var index = 1; index < data.length; index++) {
      //Start getting data
      db.weed.create({
        pictureUrl: data[index][2],
        weedName: data[index][0],
        thc: data[index][3].split(" / ")[0].split(" ")[1],
        cbd:
          data[index][3].split(" / ")[1] === undefined
            ? "<1%"
            : data[index][3].split(" / ")[1].split(" ")[1],
        strain: data[index][1],
        company: "No Vendor Listed"
      });
    }
  });
};

parseWikileaf();
