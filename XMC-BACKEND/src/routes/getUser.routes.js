const express = require("express");
const {getUserByEmail} =  require("../controller/getUser.contorller")
const router = express.Router();


router.route("/").get(getUserByEmail)

module.exports = router;
