const dbServices = require("../db/dbServices");

// const allHouses = async (req, res) => {
//   const db = dbServices.getDbServiceInstance();
//   const response = db.getAllHouses();
//   response
//     .then((data) => {
//       // console.log(data);
//       res.json({ status: "request successful", data: data });
//     })
//     .catch((err) => console.log(err));
// };
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
module.exports = { findOwner };
