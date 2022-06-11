const express = require("express");
const bcrypt = require("bcrypt");
const {
  confirmAgreement,
  getAgreement,
  renterAgreement,
} = require("../controllers/agreement");
const {
  upload,
  postHouse,
  uploadAgreement,
} = require("../controllers/post_house");
const {
  registerRenter,
  registerOwner,
  registerAdmin,
} = require("../controllers/register");
const { login } = require("../controllers/login");
const {
  allHouses,
  ownersHouse,
  rentersHouse,
  oneHouse,
  checkHouse,
  changeHouseStatus,
  deleteHouse,
} = require("../controllers/houses");
const { search } = require("../controllers/search");
const { changePassword } = require("../controllers/change_password");
const {
  sendRequest,
  deleteRequest,
  ownerRequests,
  accept_reject,
  renterRequests,
  allRequests,
} = require("../controllers/request");
const {
  findOwner,
  findRenter,
  getAllRenters,
  removeRenter,
  getAllOwners,
  removeOwner,
} = require("../controllers/users");

const router = express.Router();

router.route("/registerRenter").post(registerRenter);
router.route("/registerOwner").post(registerOwner);
router.route("/registerAdmin").post(registerAdmin);
router.route("/login").post(login);
router.route("/allHouses").get(allHouses);
router.route("/ownersHouse/:token").get(ownersHouse);
router.route("/rentersHouse/:token").get(rentersHouse);
router.route("/house/:id").get(oneHouse);
router.route("/search").post(search);
router.route("/change-password").post(changePassword);
router.route("/sendRequest").post(sendRequest);
router.route("/deleteRequest/:id").delete(deleteRequest);
router.route("/checkHouse").post(checkHouse);
router.route("/ownerRequests").post(ownerRequests);
router.route("/accept_rejectReq").post(accept_reject);
router.route("/owner/:owner_id").get(findOwner);
router.route("/renter/:renter_id").get(findRenter);
router.route("/renterRequests").post(renterRequests);
router.route("/agreement/:req_id").get(getAgreement);
router.route("/confirmAgreement/:agree_id").get(confirmAgreement);
router.route("/renterAgreement/:renter_id").get(renterAgreement);
router.route("/changeHouseStatus").post(changeHouseStatus);
router.route("/allRenters").get(getAllRenters);
//
router.route("/deleteRenter/:renter_id").get(removeRenter);
router.route("/deleteOwner/:owner_id").get(removeOwner);
router.route("/allOwners").get(getAllOwners);
router.route("/allRequests").get(allRequests);
//
router.route("/deleteHouse/:id").get(deleteHouse);
//router.route("/postHouse").post(upload.single("image"), postHouse);

router
  .route("/postHouse/:token")
  .post(
    upload.fields([
      { name: "h_type" },
      { name: "kebele" },
      { name: "city" },
      { name: "rent_fee" },
      { name: "number_of_rooms" },
      { name: "image" },
      { name: "catagory" },
      { name: "area" },
      { name: "sub_city" },
      { name: "area_name" },
      { name: "furniture" },
    ]),
    postHouse
  );
router
  .route("/uploadAgreement/:req_id")
  .post(upload.fields([{ name: "image" }]), uploadAgreement);

module.exports = router;
