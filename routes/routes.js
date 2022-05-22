const express = require("express");
const bcrypt = require("bcrypt");
const { upload, postHouse } = require("../controllers/post_house");
const { registerRenter, registerOwner } = require("../controllers/register");
const { login } = require("../controllers/login");
const { allHouses, ownersHouse, oneHouse } = require("../controllers/houses");
const { search } = require("../controllers/search");
const { changePassword } = require("../controllers/change_password");
const { sendRequest, deleteRequest } = require("../controllers/request");
const router = express.Router();

router.route("/registerRenter").post(registerRenter);
router.route("/registerOwner").post(registerOwner);
router.route("/login").post(login);
router.route("/allHouses").get(allHouses);
router.route("/ownersHouse/:token").get(ownersHouse);
router.route("/house/:id").get(oneHouse);
router.route("/search").post(search);
router.route("/change-password").post(changePassword);
router.route("/sendRequest").post(sendRequest);
router.route("/deleteRequest/:id").delete(deleteRequest);
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

module.exports = router;
