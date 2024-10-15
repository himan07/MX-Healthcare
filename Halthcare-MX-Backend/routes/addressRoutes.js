const express = require("express");
const {addressController} = require("../controller/addressController")
const router = express.Router();


router.route("/").post(addressController)

module.exports = router;
