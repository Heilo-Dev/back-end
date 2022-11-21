const express = require('express');
const router = express.Router()
const userController = require("../../controller/student.controller");
const verifyToken = require('../../middleware/verifyToken');


router.get("/ondemand", userController.ondemand)

module.exports = router;