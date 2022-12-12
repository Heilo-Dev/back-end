const express = require('express');
const router = express.Router()
const userController = require("../../controller/student.controller");
const verifyToken = require('../../middleware/verifyToken');


router.get("/ondemand", userController.ondemand)
router.patch("/update", verifyToken, userController.updateStudentProfile)
router.post("/top-up", verifyToken, userController.topUp_ReqControler)

module.exports = router;