const dbServices = require("../db/dbServices");
const confirmAgreement = async (req, res) => {
  const agree_id = req.params.agree_id;
  const db = dbServices.getDbServiceInstance();
  const response = db.confirmAgreement(agree_id);
  response.then((data) => {
    console.log(data);
    res.json({ status: "Agreement completed successfully", data: data });
  });
};
const getAgreement = async (req, res) => {
  const req_id = req.params.req_id;
  console.log(req_id);
  const db = dbServices.getDbServiceInstance();
  const response = db.getAgreement(req_id);
  response.then((data) => {
    console.log(data);
    res.json({ status: "agreement sent successfully", data: data });
  });
};
const renterAgreement = async (req, res) => {
  const renter_id = req.params.renter_id;
  console.log(renter_id);
  const db = dbServices.getDbServiceInstance();
  const response = db.renterAgreement(renter_id);
  response.then((data) => {
    console.log(data);
    res.json({ status: "agreement sent successfully", data: data });
  });
};
const ownerAgreement = async (req, res) => {
  const owner_id = req.params.owner_id;
  // console.log(owner_id);
  const db = dbServices.getDbServiceInstance();
  const response = db.ownerAgreement(owner_id);
  response.then((data) => {
    console.log(data);
    res.json({ status: "agreement sent successfully", data: data });
  });
};
module.exports = {
  confirmAgreement,
  getAgreement,
  renterAgreement,
  ownerAgreement,
};
