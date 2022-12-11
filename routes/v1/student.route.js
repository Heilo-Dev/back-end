const express = require('express');
const router = express.Router()
const userController = require("../../controller/student.controller");
const verifyToken = require('../../middleware/verifyToken');


router.get("/ondemand", userController.ondemand)
router.patch("/update",verifyToken, userController.updaterStudentProfile)
router.patch("/update",verifyToken, userController.updaterStudentProfile)

module.exports = router;