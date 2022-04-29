const express = require("express");
const bcrypt = require("bcrypt");
const { upload, postHouse } = require("../controllers/post_house");
const { registerRenter, registerOwner } = require("../controllers/register");
const { login } = require("../controllers/login");
const router = express.Router();

router.route("/registerRenter").post(registerRenter);
router.route("/registerOwner").post(registerOwner);
router.route("/login").post(login);
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
    ]),
    postHouse
  );

module.exports = router;
