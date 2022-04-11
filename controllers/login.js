const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_STRING = "kfkjfkjfdkjakdjferuej#$#$#2u3@#@$@kfj";
const dbServices = require("../db/dbServices");

const login = async (req, res) => {
  const { user_name, pass_word } = req.body;
  console.log(req.body);
  const db = dbServices.getDbServiceInstance();
  const result = db.findUser(user_name);
  result
    .then(async (user) => {
      console.log(user);
      if (user.length == 0) {
        return res.json({
          status: "error",
          error: "no user with this username",
        });
      }
      if (await bcrypt.compare(pass_word, user[0].pass_word)) {
        const token = jwt.sign(
          {
            id: user[0].id,
            user_name,
            user_role: user[0].user_role,
          },
          JWT_STRING
        );
        return res.json({
          status: "ok",
          user_role: user[0].user_role,
          data: token,
        });
      }
      res.json({ status: "error", error: "invalid username/password" });
    })
    .catch((err) => console.log(err));
};

module.exports = { login };
