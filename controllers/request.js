const jwt = require("jsonwebtoken");
const JWT_STRING = "kfkjfkjfdkjakdjferuej#$#$#2u3@#@$@kfj";
const dbServices = require("../db/dbServices");
const sendRequest = async (req, res) => {
  const { token, h_id, o_id } = req.body;
  const u_id = jwt.verify(token, JWT_STRING).id;
  const req_date = new Date();
  const data = { u_id, o_id, h_id, req_date, req_status: "sent" };
  //console.log(data);
  //res.json({ status: "request sent successfully", data: data });
  const db = dbServices.getDbServiceInstance();
  const response = db.sendRequest(data);
  response
    .then((data) => {
      console.log(data);
      res.json({ status: "request successfully sent" });
    })
    .catch((err) => console.log(err));
};
const deleteRequest = async (req, res) => {
  const { id: house_id } = req.params;
  console.log(house_id);
  //res.json({ status: "request sent successfully", data: data });
  const db = dbServices.getDbServiceInstance();
  const response = db.deleteRequest(house_id);
  response
    .then((data) => {
      // console.log(data);
      res.json({ status: "request deleted successfully" });
    })
    .catch((err) => console.log(err));
};
const ownerRequests = async (req, res) => {
  const { token } = req.body;
  const u_id = jwt.verify(token, JWT_STRING).id;
  //res.json({ status: "request sent successfully", data: data });
  const db = dbServices.getDbServiceInstance();
  const response = db.ownerRequests(u_id);
  response
    .then((data) => {
      // console.log(data);
      res.json({ status: "request successfully", data: data });
    })
    .catch((err) => console.log(err));
};
const renterRequests = async (req, res) => {
  const { token } = req.body;
  const u_id = jwt.verify(token, JWT_STRING).id;
  //res.json({ status: "request sent successfully", data: data });
  const db = dbServices.getDbServiceInstance();
  const response = db.renterRequests(u_id);
  response
    .then((data) => {
      // console.log(data);
      res.json({ status: "request successfully", data: data });
    })
    .catch((err) => console.log(err));
};
const accept_reject = async (req, res) => {
  const { req_id, status } = req.body;
  console.log(req_id, status);
  //res.json({ status: "request sent successfully", data: data });
  const db = dbServices.getDbServiceInstance();
  const response = db.accept_rejectRequests(req_id, status);
  response
    .then((data) => {
      // console.log(data);
      res.json({ status: `request is ${status}`, data: data });
    })
    .catch((err) => console.log(err));
};
const allRequests = async (req, res) => {
  const db = dbServices.getDbServiceInstance();
  const response = db.allRequests();
  response
    .then((data) => {
      // console.log(data);
      res.json({ status: "request successfully", data: data });
    })
    .catch((err) => console.log(err));
};
module.exports = {
  sendRequest,
  deleteRequest,
  ownerRequests,
  renterRequests,
  accept_reject,
  allRequests,
};
