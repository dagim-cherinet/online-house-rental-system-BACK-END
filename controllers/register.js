const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const dbServices = require("./DB/dbServices");
const dbServices = require("../db/dbServices");

const registerRenter = async (req, res) => {
  //console.log("register (renter) controller is working");
  //res.send("<h2>welcome to the register renter page wow!!!!<h2>");
  console.log({ reqBody: req.body });
  const { username, password: plainPassword } = req.body;
  const date = new Date();
  const password = await bcrypt.hash(plainPassword, 5);
  const data = { name: "dagim", username, password, date };
  const db = dbServices.getDbServiceInstance();
  const result = db.registerRenter(data);

  result
    .then((data) => res.json({ status: "ok" }))
    .catch((err) => console.log(err));
};

module.exports = { registerRenter };
