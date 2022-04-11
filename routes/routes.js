const express = require("express");
const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");
//const jwt = require("json-web-token");
const router = express.Router();

const { registerRenter } = require("../controllers/register");
const { login } = require("../controllers/login");

router.route("/registerRenter").post(registerRenter);
router.route("/login").post(login);

module.exports = router;
