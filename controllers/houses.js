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
const ownersHouse = async (req, res) => {
  const { token } = req.params;
  console.log(token);

  const owner = jwt.verify(token, JWT_STRING);
  const u_id = owner.id;
  const db = dbServices.getDbServiceInstance();
  const response = db.ownersHouse(u_id);
  response
    .then((data) => {
      console.log(data);
      res.json({ status: "request successful", data: data });
    })
    .catch((err) => console.log(err));
};

const oneHouse = async (req, res) => {
  const { id } = req.params;
  const db = dbServices.getDbServiceInstance();
  const response = db.oneHouse(id);
  response.then((data) => {
    console.log(data);
    res.json({ status: "request successful", data: data });
  });
};
const checkHouse = async (req, res) => {
  const { h_id, token } = req.body;
  const renter = jwt.verify(token, JWT_STRING);
  const u_id = renter.id;
  const db = dbServices.getDbServiceInstance();
  const response = db.checkHouse(u_id, h_id);
  response.then((data) => {
    console.log(data);
    res.json({ status: "check completed", data: data });
  });
};
module.exports = { allHouses, ownersHouse, oneHouse, checkHouse };
