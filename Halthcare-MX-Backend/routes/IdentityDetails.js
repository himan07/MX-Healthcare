const express = require("express");
const {uploadIdentity} = require("../controller/IdentityController")
const router = express.Router();


router.route("/").post(uploadIdentity)

module.exports = router;
