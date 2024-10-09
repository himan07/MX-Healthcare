const express = require("express");
const {createPersonalDetails}  = require("../controller/PersonalDetails")
const router = express.Router();


router.route("/").post(createPersonalDetails)

module.exports = router;
