const express = require("express");
const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");
const jwt = require("json-web-token");
const router = express.Router();

const { registerRenter } = require("../controllers/register");

router.route("/registerRenter").post(registerRenter);

module.exports = router;
