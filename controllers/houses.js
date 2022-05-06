const jwt = require("jsonwebtoken");
const JWT_STRING = "kfkjfkjfdkjakdjferuej#$#$#2u3@#@$@kfj";
const dbServices = require("../db/dbServices");

const allHouses = async (req, res) => {
  const db = dbServices.getDbServiceInstance();
  const response = db.getAllHouses();
  response
    .then((data) => {
      // console.log(data);
      res.json({ status: "request successful", data: data });
    })
    .catch((err) => console.log(err));
};
module.exports = { allHouses };
