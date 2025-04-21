const jwt = require("jsonwebtoken");
const JWT_STRING = "kfkjfkjfdkjakdjferuej#$#$#2u3@#@$@kfj";
const dbServices = require("../db/dbServices");

const allBranches = async (req, res) => {
  const db = dbServices.getDbServiceInstance();
  const response = db.getAllBranches();
  response
    .then((data) => {
      console.log(data);
      res.json({ status: "request successful", data: data[0].result });
    })
    .catch((err) => console.log(err));
};

const populateDB = async (req, res) => {
  const db = dbServices.getDbServiceInstance();
  const response = db.populateDB({});
  response
    .then((data) => {
      console.log(data);
      res.json({ status: "request successful" });
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
const rentersHouse = async (req, res) => {
  const { token } = req.params;
  console.log(token);

  const renter = jwt.verify(token, JWT_STRING);
  const u_id = renter.id;
  const db = dbServices.getDbServiceInstance();
  const response = db.rentersHouse(u_id);
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
const changeHouseStatus = async (req, res) => {
  //const house_id = req.params.house_id;
  const { house_id, renter_id } = req.body;
  const db = dbServices.getDbServiceInstance();
  const response = db.changeHouseStatus(house_id, renter_id);
  response.then((data) => {
    console.log(data);
    res.json({ status: "check completed", data: data });
  });
};
const deleteHouse = async (req, res) => {
  const { id } = req.params;
  const db = dbServices.getDbServiceInstance();
  const response = db.deleteHouse(id);
  response.then((data) => {
    console.log(data);
    res.json({ status: "request successful", data: data });
  });
};
module.exports = {
  allBranches,
  populateDB,
  ownersHouse,
  oneHouse,
  checkHouse,
  changeHouseStatus,
  rentersHouse,
  deleteHouse,
};
