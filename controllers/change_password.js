const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_STRING = "kfkjfkjfdkjakdjferuej#$#$#2u3@#@$@kfj";
const dbServices = require("../db/dbServices");

const changePassword = async (req, res) => {
  const { token, password } = req.body;
  const user = jwt.verify(token, JWT_STRING);
  const newPassword = await bcrypt.hash(password, 5);
  const id = user.id;
  const db = dbServices.getDbServiceInstance();
  const response = db.changePassword(id, newPassword);
  response
    .then((data) => {
      console.log(data);
      res.json({ status: "password changed successfully", data: data });
    })
    .catch((err) => console.log(err));
};
module.exports = { changePassword };
