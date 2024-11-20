const express = require("express");
const {uploadImage} = require("../controller/ImageController")
const router = express.Router();


router.route("/").post(uploadImage)

module.exports = router;
