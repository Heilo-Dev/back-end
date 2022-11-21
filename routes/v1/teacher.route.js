const express = require("express");
const router = express.Router();
const teacher = require("../../controller/techer.controller");
const verifyToken = require("../../middleware/verifyToken");


router.route("/update")
    .patch(verifyToken,teacher.updateATeacherController)



module.exports = router;