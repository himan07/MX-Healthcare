const express = require("express");
const {createProfessionalDetails}  = require("../controller/ProfessionalDetailsController")
const router = express.Router();


router.route("/").post(createProfessionalDetails)

module.exports = router;
