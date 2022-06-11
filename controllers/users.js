const dbServices = require("../db/dbServices");

const findOwner = async (req, res) => {
  const owner_id = req.params.owner_id;
  const db = dbServices.getDbServiceInstance();
  const response = db.findOwner(owner_id);
  response
    .then((data) => {
      // console.log(data);
      res.json({ status: "request successful", data: data });
    })
    .catch((err) => console.log(err));
};
const findRenter = async (req, res) => {
  const renter_id = req.params.renter_id;
  const db = dbServices.getDbServiceInstance();
  const response = db.findRenter(renter_id);
  response
    .then((data) => {
      // console.log(data);
      res.json({ status: "request successful", data: data });
    })
    .catch((err) => console.log(err));
};
const getAllRenters = async (req, res) => {
  //const renter_id = req.params.renter_id;
  const db = dbServices.getDbServiceInstance();
  const response = db.allRenters();
  response
    .then((data) => {
      // console.log(data);
      res.json({ status: "request successful", data: data });
    })
    .catch((err) => console.log(err));
};
const removeRenter = async (req, res) => {
  const renter_id = req.params.renter_id;
  //console.log(renter_id);
  const db = dbServices.getDbServiceInstance();
  const response = db.removeRenter(renter_id);
  response
    .then((data) => {
      // console.log(data);
      res.json({ status: "request successful", data: data });
    })
    .catch((err) => console.log(err));
};

const getAllOwners = async (req, res) => {
  //const renter_id = req.params.renter_id;
  const db = dbServices.getDbServiceInstance();
  const response = db.allOwners();
  response
    .then((data) => {
      // console.log(data);
      res.json({ status: "request successful", data: data });
    })
    .catch((err) => console.log(err));
};
const removeOwner = async (req, res) => {
  const owner_id = req.params.owner_id;
  //console.log(renter_id);
  const db = dbServices.getDbServiceInstance();
  const response = db.removeOwner(owner_id);
  response
    .then((data) => {
      // console.log(data);
      res.json({ status: "request successful", data: data });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  findOwner,
  findRenter,
  getAllRenters,
  removeRenter,
  getAllOwners,
  removeOwner,
};
