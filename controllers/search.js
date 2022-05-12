const dbServices = require("../db/dbServices");
const search = async (req, res) => {
  const { parameter, value } = req.body;
  const db = dbServices.getDbServiceInstance();
  const response = db.searchHouse(parameter, value);
  response.then((data) => {
    console.log(data);
    res.json({ status: "request successful", data: data });
  });
};
module.exports = { search };
