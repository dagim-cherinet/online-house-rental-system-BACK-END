const jwt = require("jsonwebtoken");
const JWT_STRING = "kfkjfkjfdkjakdjferuej#$#$#2u3@#@$@kfj";
const dbServices = require("../db/dbServices");
const uploadAgreement = async (req, res) => {
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
module.exports = { uploadAgreement };
