const express = require("express");
const {CreateUser}  = require("../controller/CreateUserController")
const router = express.Router();


router.route("/").post(CreateUser)

module.exports = router;
