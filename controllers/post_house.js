const jwt = require("jsonwebtoken");
const JWT_STRING = "kfkjfkjfdkjakdjferuej#$#$#2u3@#@$@kfj";
const multer = require("multer");
const dbServices = require("../db/dbServices");
const path = require("path");

//initialize the destination folder for uploading
var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/images");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
var upload = multer({
  storage: storage,
});

const postHouse = async (req, res) => {
  //console.log({ ...req.body });
  //console.log(req.params);
  const { token } = req.body;
  //console.log(token);
  const user = jwt.verify(token, JWT_STRING);
  const o_id = user.id;
  console.log(o_id);
  // console.log({ ...req.files });
  if (!req.files) {
    console.log("no file upload");
  } else {
    //console.log(req.files.filename);
    console.log(req.files.image[0].filename);
  }
  //res.json({ status: "upload is successful" });
  // var imgsrc = "http://localhost:5000/api/images/" + req.files.image[0].filename;
  var image_src = `${req.files.image[0].filename}`;
  var house_detail = { ...req.body, image_src, o_id };
  //console.log(house_detail);
  const db = dbServices.getDbServiceInstance();
  const response = db.postHouseToDB(house_detail);
  response
    .then((data) => res.json({ status: "upload is successful" }))
    .catch((err) => console.log(err));
};
//-------AGREEMENT Handler
const uploadAgreement = async (req, res) => {
  //console.log({ ...req.body });
  //console.log(req.params);
  // const { token } = req.body;
  // //console.log(token);
  // const user = jwt.verify(token, JWT_STRING);
  // const o_id = user.id;
  //console.log(o_id);
  // console.log({ ...req.files });
  if (!req.files) {
    console.log("no file upload");
  } else {
    //console.log(req.files.filename);
    console.log(req.files.image[0].filename);
  }
  //res.json({ status: "upload is successful" });
  // var imgsrc = "http://localhost:5000/api/images/" + req.files.image[0].filename;
  let req_id = req.params.req_id;
  var agree_doc = `${req.files.image[0].filename}`;
  let agree_date = new Date();
  console.log(req_id, agree_doc, agree_date);
  let data = { req_id, agree_doc, agree_date };
  const db = dbServices.getDbServiceInstance();
  const response = db.uploadAgreement(data);
  response
    .then((data) => res.json({ status: "upload is successful" }))
    .catch((err) => console.log(err));
};
module.exports = { postHouse, upload, uploadAgreement };
